const ApplicationError = require('../../utils/application-error');
const axios = require('axios');
const bitcoin = require("bitcoinjs-lib");
const {User, Event} = require('../../dao/models');
const BigNumber = require('bignumber.js');
const cryptoEncrypt = require('../../utils/crypto-encrypt');
const cryptoDecrypt = require('../../utils/crypto-decrypt');


class BtcManager {
  constructor(address, currency) {
    return new Promise(async (resolve, reject) => {
      try {
        this.address = address;
        this.currency = currency;
        this.one = new BigNumber(Math.pow(10, this.currency.decimals));
      } catch (ex) {
        return reject(ex);
      }
      resolve(this);
    });
  }

  static async createAccount(password, username) {
    const result = (await axios.post(`${process.env.BLOCKCYPHER_BITCOIN_API_URL}/addrs?token=${process.env.BLOCKCYPHER_API_TOKEN}`)).data;

    const encryptedPrivate = cryptoEncrypt(result.private, password);
    const encryptedPublic = cryptoEncrypt(result.public, password);
    const encryptedWif = cryptoEncrypt(result.wif, password);

    const encryptedPrivate2 = cryptoEncrypt(result.private, process.env.ENCRYPT_SECRET);
    const encryptedPublic2 = cryptoEncrypt(result.public, process.env.ENCRYPT_SECRET);
    const encryptedWif2 = cryptoEncrypt(result.wif, process.env.ENCRYPT_SECRET);

    const privateJson = {
      "private": encryptedPrivate, "public": encryptedPublic, "wif": encryptedWif,
      "private2": encryptedPrivate2, "public2": encryptedPublic2, "wif2": encryptedWif2,
    };

    return {address: result.address, private: privateJson};
  }

  async getBalance() {
    const result = (await axios.get(`${process.env.BLOCKCYPHER_BITCOIN_API_URL}/addrs/${this.address}/balance?token=${process.env.BLOCKCYPHER_API_TOKEN}`)).data;
    return new BigNumber(result.balance);
  }

  async sendTransaction(to, value, password, privateObject, user, mnemonic) {
    await this.__checkPassword(password, user);
    const estimated = await this.estimateTransaction(to, value);

    const body = {
      inputs: [{addresses: [this.address]}],
      outputs: [{addresses: [to], value: value.toNumber()}]
    }
    let tmptx;
    try {
      tmptx = (await axios.post(`${process.env.BLOCKCYPHER_BITCOIN_API_URL}/txs/new?token=${process.env.BLOCKCYPHER_API_TOKEN}`, body)).data;
    } catch (e) {
      throw ApplicationError.TransactionError(JSON.stringify(e.response.data.errors));
    }

    const decrypted = cryptoDecrypt(privateObject.private, mnemonic);
    const keyBuffer = Buffer.from(decrypted, 'hex')
    const keys = bitcoin.ECPair.fromPrivateKey(keyBuffer)
    tmptx.pubkeys = [];
    tmptx.signatures = tmptx.tosign.map(function (tosign, n) {
      tmptx.pubkeys.push(keys.publicKey.toString('hex'));
      return bitcoin.script.signature.encode(
        keys.sign(Buffer.from(tosign, "hex")),
        0x01,
      ).toString("hex").slice(0, -2);
    });
    const result = (await axios.post(`${process.env.BLOCKCYPHER_BITCOIN_API_URL}/txs/send?token=${process.env.BLOCKCYPHER_API_TOKEN}`, tmptx)).data;
    const event = Event.build({
      fee: estimated.fee.toString(),
      value: estimated.value.toString(),
      total: estimated.total.toString(),
      from: this.address,
      to: to,
      eventTypeId: 1,
      userId: user.id,
      feeCurrencyId: this.currency.id,
      currencyId: this.currency.id,
      submittedAt: result.tx.received,
      txHash: result.tx.hash,
      detailsLink: `${process.env.BTC_EXPLORER_PREFIX}${result.tx.hash}`,
    });
    await event.save();

    const pollInterval = setInterval(async () => {
      axios.get(`${process.env.BLOCKCYPHER_BITCOIN_API_URL}/txs/${result.tx.hash}?token=${process.env.BLOCKCYPHER_API_TOKEN}`)
        .then(response => {
          if (response.data.confirmed) {
            event.confirmedAt = response.data.confirmed;
            event.save();
            clearInterval(pollInterval);
          }
        });
    }, 5000);
    return event;
  }

  async estimateTransaction(to, value, password, privateObject, user) {
    const body = {
      inputs: [{addresses: [this.address]}],
      outputs: [{addresses: [to], value: value.toNumber()}]
    }
    let tmptx;
    try {
      tmptx = (await axios.post(`${process.env.BLOCKCYPHER_BITCOIN_API_URL}/txs/new?token=${process.env.BLOCKCYPHER_API_TOKEN}`, body)).data;
    } catch (e) {
      let error = '';
      e.response.data.errors.forEach(err => {
        error += err.error + ' ';
      })
      throw ApplicationError.CryptowalletError(error);
    }
    const gasNumber = new BigNumber(tmptx.tx.fees);
    return {
      value: value,
      fee: gasNumber,
      total: value.plus(gasNumber)
    }
  }

  async __checkPassword(password, user) {
    try {
      const signedUser = await User.scope('auth').findByPk(user.id);
      await signedUser.authenticateByPassword(password);
    } catch (e) {
      throw ApplicationError.WrongPassword();
    }
  }
}

module.exports = BtcManager;

