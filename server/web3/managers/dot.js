const ApplicationError = require('../../utils/application-error');
const {ApiPromise, WsProvider} = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const { mnemonicGenerate } = require('@polkadot/util-crypto');
const {User, Event} = require('../../dao/models');
const BigNumber = require('bignumber.js');
const cryptoEncrypt = require('../../utils/crypto-encrypt');
const cryptoDecrypt = require('../../utils/crypto-decrypt');


class DotManager {
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
    const mnemonic = mnemonicGenerate();
    const keyring = new Keyring({ type: 'sr25519', ss58Format: process.env.POLKADOT_SS58_ADDRESS_FORMAT });
    const pair = keyring.addFromUri(mnemonic, {}, 'ed25519');

    const encryptedPrivate = cryptoEncrypt(mnemonic, password);
    const encryptedPrivate2 = cryptoEncrypt(mnemonic, process.env.ENCRYPT_SECRET);

    const privateJson = {"private": encryptedPrivate, "private2": encryptedPrivate2};
    return {address: pair.address, private: privateJson};
  }

  async getBalance() {
    try {
      const provider = new WsProvider(process.env.POLCADOT_SERVER);
      const api = await ApiPromise.create({provider});

      const response = await api.query.system.account(this.address);
      return new BigNumber(response.data.free.toString());
    } catch (e) {
      console.log(e);
      return new BigNumber(0);
    }
  }

  async sendTransaction(to, value, password, privateObject, user, mnemonic) {
    await this.__checkPassword(password, user);
    const estimated = await this.estimateTransaction(to, value, mnemonic, privateObject, user);

    try {
      const provider = new WsProvider(process.env.POLCADOT_SERVER);
      const api = await ApiPromise.create({ provider });

      const decrypted = cryptoDecrypt(privateObject.private, mnemonic);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: process.env.POLKADOT_SS58_ADDRESS_FORMAT });
      const key = keyring.addFromUri(decrypted, {}, 'ed25519');
      const transfer = api.tx.balances.transfer(to, value.toString());
      const transaction = await transfer.signAsync(key);
      const event = Event.build({
        fee: estimated.fee,
        value: estimated.value,
        total: estimated.total,
        from: this.address,
        to: to,
        eventTypeId: 1,
        userId: user.id,
        submittedAt: new Date(),
        feeCurrencyId: this.currency.id,
        currencyId: this.currency.id,
        txHash: transaction.hash.toHex(),
        detailsLink: `${process.env.DOT_EXPLORER_PREFIX}${transaction.hash.toHex()}`
      });
      await event.save();
      transaction.send(({ status, dispatchError }) => {
        if (status.isFinalized) {
          if (dispatchError) {
            event.failedAt = new Date();
          } else {
            event.confirmedAt = new Date();
          }
          event.save();
        }
      });
      return event;
      // console.log('Transfer sent with hash', hash.toHex());
    } catch (e) {
      console.log(e)
    }
  }

  async estimateTransaction(to, value, password, privateObject, user) {
    const provider = new WsProvider(process.env.POLCADOT_SERVER);
    const api = await ApiPromise.create({ provider });
    const decrypted = cryptoDecrypt(privateObject.private, password);
    const keyring = new Keyring({ type: 'sr25519', ss58Format: process.env.POLKADOT_SS58_ADDRESS_FORMAT });
    const key = keyring.addFromUri(decrypted, {}, 'ed25519');
    let transfer;
    try {
      transfer = api.tx.balances.transfer(to, value.toString());
    }
    catch(e) {
      console.log(e)
      const error = e.message.includes('Invalid decoded address') ? 'Invalid decoded address' : '';
      throw ApplicationError.CryptowalletError(error);
    }
    const info = await transfer.paymentInfo(key);
    const fees = new BigNumber(info.partialFee.toString());
    const currentBalance = await this.getBalance();
    if (currentBalance.lt(value.plus(fees))) {
      throw ApplicationError.CryptowalletError(`${value.plus(fees).toString()} is higher than available ${currentBalance.toString()}`)
    }
    return {
      value: value,
      fee: fees,
      total: value.plus(fees)
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

module.exports = DotManager;

