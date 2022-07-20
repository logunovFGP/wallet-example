const ApplicationError = require('../../../utils/application-error');
const {User, Sequelize} = require('../../../dao/models');
const getManager = require('../../../web3/get-currency-manager');
const {UserCurrency, Currency} = require('../../../dao/models');
const Promise = require('bluebird');
const getCurrencyManager = require('../../../web3/get-currency-manager');
const convertBalance = require('../../../utils/convert-balance');


module.exports = async (req, res) => {
  const user = await User.scope('auth').findOne({where: {username: req.body.username}});
  if (!user) {
    throw ApplicationError.NotFound();
  }
  const token = await user.authenticateByPassword(req.body.password);

  const userCurrencies = await UserCurrency.scope('auth').findAll({where: {userId: user.id, currencyId: {[Sequelize.Op.ne]: 9}}, include: [Currency], order: [['currencyId', 'asc']]});

  const currencies = await Currency.findAll({order: [['id', 'asc']], where: {id: {[Sequelize.Op.ne]: 9}}});
  const managers = await Promise.all(currencies.map(currency => getCurrencyManager(currency)));
  const managersObj = await Promise.all(managers.map((manager, index) => new manager(userCurrencies[index].address, userCurrencies[index].Currency, user.id)))
  const balances = await Promise.all(managersObj.map((manager, index) => manager.getBalance(userCurrencies[index].private)));
  const additionalBalances = await Promise.all(balances.map((balance, index) => convertBalance(userCurrencies[index].Currency, balance)));
  await Promise.all(balances.map((balance, index) => {
    userCurrencies[index].balance = balance.toString();
    userCurrencies[index].usdBalance = additionalBalances[index][0].toString();
    userCurrencies[index].bnbBalance = additionalBalances[index][1].toString();
    return userCurrencies[index].save();
  }));
  // TODO: fix polkadot currency speed
  const currency = await Currency.findOne({where: {id: 9}});
  const userCurrency = await UserCurrency.findOne({where: {currencyId: 9, userId: user.id}, include: [Currency]});
  const manager = await getCurrencyManager(currency);
  const managerObj = await new manager(userCurrency.address, userCurrency.Currency, user.id)
  managerObj.getBalance(userCurrency.private)
    .then(balance => {
      convertBalance(currency, balance)
        .then(result => {
          userCurrency.balance = balance.toString();
          userCurrency.usdBalance = result[0];
          userCurrency.bnbBalance = result[1];
          userCurrency.save();
        });
    });

  return res.status(200).json(token);
};
