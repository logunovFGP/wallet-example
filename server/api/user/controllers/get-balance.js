const getManager = require('../../../web3/get-currency-manager');
const {Currency, UserCurrency} = require('../../../dao/models');
const ApplicationError = require('../../../utils/application-error');
const convertBalance = require('../../../utils/convert-balance');

module.exports = async (req, res) => {
  const currency = await Currency.findByPk(req.params.id);
  if (!currency) {
    throw ApplicationError.NotFound();
  }
  const userCurrency = await UserCurrency.scope('auth').findOne({where: {userId: req.user.id, currencyId: currency.id}});

  const Manager = await getManager(currency);
  const manager = await new Manager(userCurrency.address, currency, req.user.id);
  const balance = await manager.getBalance(userCurrency.private);

  userCurrency.balance = balance.toString();

  const [usdBalance, bnbBalance] = await convertBalance(currency, balance);

  userCurrency.usdBalance = usdBalance.toString();
  userCurrency.bnbBalance = bnbBalance.toString();
  await userCurrency.save();

  return res.status(200).json({balance: balance.toString(), usdBalance, bnbBalance});
};
