const ApplicationError = require("../../../utils/application-error");
const {User, UserCurrency, Currency, Sequelize} = require('../../../dao/models');
const Promise = require('bluebird');
const getCurrencyManager = require('../../../web3/get-currency-manager');
const { mnemonicGenerate } = require('@polkadot/util-crypto');
const cryptoEncrypt = require('../../../utils/crypto-encrypt');


module.exports = async (req, res) => {
  const oldUser = await User.scope('auth').findOne({where: {username: req.body.username}});
  if (oldUser) {
    throw ApplicationError.NotUnique();
  }
  if (!/^[a-zA-Z0-9]{8,35}$/.test(req.body.username)) {
    throw ApplicationError.UsernameError();
  }
  const mnemonic = mnemonicGenerate();
  const encryptedMnemonic = cryptoEncrypt(mnemonic, process.env.ENCRYPT_SECRET);
  const user = await User.create({
    username: req.body.username,
    passwordHashed: req.body.password,
    restoreMnemonic: encryptedMnemonic,
    passwordHashed2: cryptoEncrypt(req.body.password, process.env.ENCRYPT_SECRET)
  });

  if (!user) {
    throw ApplicationError.NotCreated();
  }

  try {
    const currencies = await Currency.findAll({order: [['id', 'asc']]});
    const managers = await Promise.all(currencies.map(currency => getCurrencyManager(currency)));
    const accounts = await Promise.all(managers.map(manager => manager.createAccount(mnemonic, req.body.username)));
    const userCurrencies = await Promise.all(accounts.map((account, index) => {
      const userCurrency = UserCurrency.build({
        balance: "0",
        userId: user.id,
        private: account.private,
        address: account.address,
        currencyId: index + 1
      });
      return userCurrency.save();
    }));

    for (let i = 3; i < 5; i++) {
      userCurrencies[i].private = userCurrencies[0].private;
      userCurrencies[i].address = userCurrencies[0].address;
      await userCurrencies[i].save();
    }
    userCurrencies[2].private = userCurrencies[1].private;
    userCurrencies[2].address = userCurrencies[1].address;
    await userCurrencies[2].save();
  } catch (e) {
    await UserCurrency.destroy({where: {userId: user.id}});
    await User.destroy({where: {id: user.id}});
    throw (e);
  }


  const token = await user.authenticateByPassword(req.body.password);

  token.mnemonic = mnemonic;
  return res.status(200).json(token);
};
