const ApplicationError = require('../../../utils/application-error');
const BigNumber = require('bignumber.js');


module.exports = async (instance, options) => {

  const bnPrevBalance = new BigNumber(instance._previousDataValues.balance);
  const bnBalance = new BigNumber(instance.balance);
  if (bnPrevBalance.lt(bnBalance)) {
    const value = bnBalance.minus(bnPrevBalance);
    const event = instance.sequelize.models.Event.build({
      to: instance.address,
      eventTypeId: 2,
      userId: instance.userId,
      value: value.toString(),
      total: value.toString(),
      currencyId: instance.currencyId,
      feeCurrencyId: instance.currencyId,
    });
    await event.save();
  }
};
