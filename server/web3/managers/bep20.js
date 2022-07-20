const web3 = require('../../configs/bep20-web3');
const abi = require('../../configs/bep20-abi');
const ApplicationError = require('../../utils/application-error');
const {User, Event} = require('../../dao/models');
const BigNumber = require('bignumber.js');
const cryptoEncrypt = require('../../utils/crypto-encrypt');


class Bep20Manager {
  constructor(address, currency) {
    return new Promise(async (resolve, reject) => {
      try {
        this.address = address;
        this.currency = currency;
        this.contract = new web3.eth.Contract(abi, this.currency.contractAddress);
        this.one = new BigNumber(Math.pow(10, this.currency.decimals));
      } catch (ex) {
        return reject(ex);
      }
      resolve(this);
    });
  }

  static async createAccount(password, username) {
    const account = web3.eth.accounts.create();
    const privateJson = web3.eth.accounts.encrypt(account.privateKey, password);
    privateJson.encryptedPrivate2 = cryptoEncrypt(account.privateKey, process.env.ENCRYPT_SECRET);

    return {address: account.address, private: privateJson};
  }

  async getBalance() {
    const balance = await this.contract.methods.balanceOf(this.address).call();
    return new BigNumber(balance);
  }

  async sendTransaction(to, value, password, privateObject, user, mnemonic) {
    await this.__checkPassword(password, user);
    const estimated = await this.estimateTransaction(to, value);

    const data = this.contract.methods.transfer(to, value.toString()).encodeABI();

    const privateJson = await web3.eth.accounts.decrypt(privateObject, mnemonic);

    const transaction = {
      to: this.currency.contractAddress,
      from: this.address,
      data
    };
    transaction.gas = await web3.eth.estimateGas(transaction);
    const signed = await web3.eth.accounts.signTransaction(transaction, privateJson.privateKey);
    const event = Event.build({
      fee: estimated.fee,
      value: estimated.value,
      total: estimated.value,
      from: this.address,
      to: to,
      eventTypeId: 1,
      userId: user.id,
      feeCurrencyId: 2,
      currencyId: this.currency.id
    });
    await event.save();
    web3.eth.sendSignedTransaction(signed.rawTransaction)
      .on('transactionHash', hash => {
        event.txHash = hash;
        event.submittedAt = new Date();
        event.detailsLink = `${process.env.BNB_EXPLORER_PREFIX}${hash}`;
        event.save();
      })
      .on('receipt', receipt => {
        event.confirmedAt = new Date();
        event.save();
      })
      .on('error', error => {
        event.failedAt = new Date();
        event.save();
      });
    return event;
  }

  async estimateTransaction(to, value, password, privateObject, user) {
    let data;
    try {
      data = this.contract.methods.transfer(to, value.toString()).encodeABI();
    } catch (e) {
      throw ApplicationError.CryptowalletError(e)
    }
    const transaction = {
      to: this.currency.contractAddress,
      from: this.address,
      data
    };
    try {
      transaction.gas = await web3.eth.estimateGas(transaction);
    } catch (e) {
      throw ApplicationError.CryptowalletError(e)
    }
    const gasNumber = new BigNumber(transaction.gas);
    const gasPrice = await web3.eth.getGasPrice();
    return {
      value: value,
      fee: gasNumber.multipliedBy(gasPrice),
      total: value.plus(gasNumber.multipliedBy(gasPrice))
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

module.exports = Bep20Manager;
