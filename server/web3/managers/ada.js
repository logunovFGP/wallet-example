const ApplicationError = require('../../utils/application-error');
const { Seed, WalletServer, AddressWallet } = require('cardano-wallet-js');
const {User, Event} = require('../../dao/models');
const BigNumber = require('bignumber.js');
const cryptoEncrypt = require('../../utils/crypto-encrypt');


class AdaManager {
  constructor(address, currency, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        this.address = address;
        this.currency = currency;
        this.one = new BigNumber(Math.pow(10, this.currency.decimals));
        this.userId = userId;
      } catch (ex) {
        return reject(ex);
      }
      resolve(this);
    });
  }

  static async createAccount(password, username) {
    const walletServer = WalletServer.init(process.env.CARDANO_SERVER);
    const recoveryPhrase = Seed.generateRecoveryPhrase();
    const mnemonic_sentence = Seed.toMnemonicList(recoveryPhrase);
    const passphrase = password.length < 10 ? password.repeat(2) : password;
    const wallet = await walletServer.createOrRestoreShelleyWallet(username, mnemonic_sentence, passphrase);
    const address = await wallet.getAddressAt(0);
    const encryptedPrivate = cryptoEncrypt(recoveryPhrase, password);
    const encryptedPrivate2 = cryptoEncrypt(recoveryPhrase, process.env.ENCRYPT_SECRET);
    const privateJson = {"private": encryptedPrivate, 'walletId': wallet.id, "private2": encryptedPrivate2};
    return {address: address.id, private: privateJson};
  }

  async getBalance(privateObject) {
    try {
      const walletServer = WalletServer.init(process.env.CARDANO_SERVER);
      const wallet = await walletServer.getShelleyWallet(privateObject.walletId);
      const balance = await wallet.getAvailableBalance();
      return new BigNumber(balance);
    } catch (e) {
      console.log(e);
      return new BigNumber(0);
    }
  }

  async sendTransaction(to, value, password, privateObject, user, mnemonic) {
    await this.__checkPassword(password, user);
    const estimated = await this.estimateTransaction(to, value, mnemonic, privateObject);

    try {
      const walletServer = WalletServer.init(process.env.CARDANO_SERVER);
      const wallet = await walletServer.getShelleyWallet(privateObject.walletId);
      const passphrase = mnemonic.length < 10 ? mnemonic.repeat(2) : mnemonic;
      const addresses = [new AddressWallet(to)];
      const amounts = [value.toNumber()];
      const transaction = await wallet.sendPayment(passphrase, addresses, amounts);

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
        txHash: transaction.id,
        detailsLink: `${process.env.ADA_EXPLORER_PREFIX}${transaction.id}`,
      });
      await event.save();

      const pollInterval = setInterval(async () => {
        wallet.getTransaction(transaction.id)
          .then(tx => {
            if (tx.status !== 'pending') {
              if (tx.status === 'in_ledger') {
                event.confirmedAt = new Date();
              } else {
                event.failedAt = new Date();
              }
              event.save();
              clearInterval(pollInterval)
            }
          });
      }, 5000);
      return event;
    } catch (e) {
      console.log(e)
      throw e;
    }
  }

  async estimateTransaction(to, value, password, privateObject, user) {
    const walletServer = WalletServer.init(process.env.CARDANO_SERVER);
    const wallet = await walletServer.getShelleyWallet(privateObject.walletId);
    const addresses = [new AddressWallet(to)];
    const amounts = [value.toNumber()];
    let estimatedFees;
    try {
      estimatedFees  = await wallet.estimateFee(addresses, amounts);
    } catch (e) {
      throw ApplicationError.CryptowalletError(e.response.data.message)
    }
    const fees = new BigNumber(estimatedFees.estimated_max.quantity);
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

module.exports = AdaManager;

