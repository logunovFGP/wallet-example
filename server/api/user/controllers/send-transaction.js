const getManager = require('../../../web3/get-currency-manager');
const {Currency, UserCurrency, User} = require('../../../dao/models');
const ApplicationError = require('../../../utils/application-error');
const BigNumber = require('bignumber.js');
const cryptoDecrypt = require('../../../utils/crypto-decrypt');


module.exports = async (req, res) => {
  const currency = await Currency.findByPk(req.params.id);
  if (!currency || !req.body.password || !req.body.to || !req.body.value) {
    throw ApplicationError.NotFound();
  }
  const bnValue = new BigNumber(req.body.value);
  const userCurrency = await UserCurrency.scope('auth').findOne({where: {userId: req.user.id, currencyId: currency.id}});
  const Manager = await getManager(currency);
  const manager = await new Manager(userCurrency.address, currency, req.user.id);

  const user = await User.scope('auth').findByPk(req.user.id);
  const mnemonic = cryptoDecrypt(user.restoreMnemonic, process.env.ENCRYPT_SECRET);
  const result = await manager.sendTransaction(req.body.to, bnValue, req.body.password, userCurrency.private, req.user, mnemonic);
  return res.status(200).json(result);
};
