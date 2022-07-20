const ApplicationError = require('../../utils/application-error');
const crypto = require('crypto');
const RippleAPI = require('ripple-lib').RippleAPI;
const {User, Event} = require('../../dao/models');
const BigNumber = require('bignumber.js');
const cryptoEncrypt = require('../../utils/crypto-encrypt');
const cryptoDecrypt = require('../../utils/crypto-decrypt');


class XrpManager {
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
    const api = new RippleAPI({ server: process.env.RIPPLE_SERVER });
    const address = api.generateAddress();

    const encryptedPrivate = cryptoEncrypt(address.secret, password);
    const encryptedPrivate2 = cryptoEncrypt(address.secret, process.env.ENCRYPT_SECRET);

    const privateJson = {"private": encryptedPrivate, "private2": encryptedPrivate2};

    return {address: address.classicAddress, private: privateJson};
  }

  async getBalance() {
    try {
      const api = new RippleAPI({ server: process.env.RIPPLE_SERVER });
      await api.connect();
      const info = await api.getAccountInfo(this.address);
      await api.disconnect();
      return new BigNumber(info.xrpBalance).multipliedBy(Math.pow(10, this.currency.decimals));
    } catch (e) {
      console.log(e);
      return new BigNumber(0);
    }
  }

  async sendTransaction(to, value, password, privateObject, user, mnemonic) {
    await this.__checkPassword(password, user);
    const estimated = await this.estimateTransaction(to, value);
    const api = new RippleAPI({ server: process.env.RIPPLE_SERVER });

    try {
      await api.connect();
      const instructions = {maxLedgerVersionOffset: 5}
      const payment = {
        source: {
          address: this.address,
          maxAmount: {
            value: value.dividedBy(this.one).toString(),
            currency: 'XRP'
          }
        },
        destination: {
          address: to,
          amount: {
            value: value.dividedBy(this.one).toString(),
            currency: 'XRP'
          }
        }
      }
      const prepared = await api.preparePayment(this.address, payment, instructions);
      const decrypted = cryptoDecrypt(privateObject.private, mnemonic);
      const {signedTransaction, id} = api.sign(prepared.txJSON, decrypted)
      const result = await api.submit(signedTransaction);

      const event = Event.build({
        fee: estimated.fee,
        value: estimated.value,
        total: estimated.total,
        from: this.address,
        to: to,
        eventTypeId: 1,
        userId: user.id,
        feeCurrencyId: this.currency.id,
        currencyId: this.currency.id,
        submittedAt: new Date(),
        txHash: result.tx_json.hash,
        detailsLink: `${process.env.XRP_EXPLORER_PREFIX}${result.tx_json.hash}`,
      });
      await event.save();

      const pollInterval = setInterval(async () => {
        api.getTransaction(result.tx_json.hash)
          .then(tx => {
            if (tx.outcome.result.includes('tes')) {
              event.confirmedAt = tx.outcome.timestamp;
            } else {
              event.failedAt = tx.outcome.timestamp;
            }

            event.save();
            clearInterval(pollInterval);
            api.disconnect();
          }).catch(console.error);
      }, 5000);
      return event;
    } catch (e) {
      throw ApplicationError.CryptowalletError(`${e.data.resultMessage}`)
    }
  }

  async estimateTransaction(to, value, password, privateObject, user) {
    const api = new RippleAPI({server: process.env.RIPPLE_SERVER});
    await api.connect();

    if (!api.isValidAddress(to)) {
      throw ApplicationError.CryptowalletError(`${to} is not a valid address`);
    }
    try {
      await api.getAccountInfo(to);
    } catch (e) {
      console.log(e);
      if (e.data.error === 'actNotFound' && value.lt(this.one.multipliedBy(20))) {
        throw ApplicationError.CryptowalletError(`Account ${to} not found. To create it, you must pass at least 20 XRP.`);
      }
    }

    const fee = await api.getFee();
    const bnFee = this.one.multipliedBy(fee);
    const currentBalance = await this.getBalance();
    if (currentBalance.lt(value.plus(bnFee))) {
      throw ApplicationError.CryptowalletError(`${value.plus(bnFee).toString()} is higher than available ${currentBalance.toString()}`)
    }

    await api.disconnect();
    return {
      value: value,
      fee: bnFee,
      total: value.plus(bnFee)
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

module.exports = XrpManager;

