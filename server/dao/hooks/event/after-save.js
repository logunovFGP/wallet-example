const clients = require('../../../configs/sse');
const getManager = require('../../../web3/get-currency-manager');


module.exports = async (instance, options) => {
  const toMessageClients = clients.filter(client => client.userId === instance.userId);
  // console.log(toMessageClients.map(client => client.id))
  const jsonInstance = instance.toJSON();

  jsonInstance.Currency = await instance.sequelize.models.Currency.findByPk(instance.currencyId);
  jsonInstance.FeeCurrency = await instance.sequelize.models.Currency.findByPk(instance.feeCurrencyId);
  jsonInstance.EventType = await instance.sequelize.models.EventType.findByPk(instance.eventTypeId);

  toMessageClients.forEach(client => client.res.write(`data: ${JSON.stringify(jsonInstance)}\n\n`))
  // console.log(`data: ${JSON.stringify(jsonInstance)}\n\n`, toMessageClients)
  // console.log(`data: ${JSON.stringify(jsonInstance)}\n\n`)

  if (jsonInstance.confirmedAt && jsonInstance.eventTypeId === 1) {
    const ourUserCurrency = await instance.sequelize.models.UserCurrency.findOne({where: {
      currencyId: jsonInstance.currencyId,
      address: {[instance.sequelize.Sequelize.Op.iLike]: jsonInstance.to}
    }});
    console.log(jsonInstance.currencyId, jsonInstance.to, ourUserCurrency)
    if (ourUserCurrency) {
      const Manager = await getManager(jsonInstance.Currency);
      const manager = await new Manager(ourUserCurrency.address, jsonInstance.Currency, jsonInstance.userId);
      const balance = await manager.getBalance(ourUserCurrency.private);

      ourUserCurrency.balance = balance.toString();
      await ourUserCurrency.save();
      console.log(ourUserCurrency.balance);
    }
  }
};
