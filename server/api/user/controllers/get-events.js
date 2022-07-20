const {Event, Sequelize, Currency, EventType} = require('../../../dao/models');
const makeFilterOptions = require('../../../utils/make-filter-options');
const moment = require('moment');


module.exports = async (req, res) => {
  const options = await makeFilterOptions(req.query.skip, req.query.limit);

  const currencyWhere = req.query.currencyId ? {'currencyId': req.query.currencyId} : {};
  const now = moment();
  const weekAgo = now.clone().subtract(7, 'days').startOf('day');

  const query = {
    where: Object.assign({
      createdAt: {
        [Sequelize.Op.between]: [weekAgo, now],
      },
      userId: req.user.id
    }, currencyWhere),
    include: [{model: Currency, as: 'Currency'}, {model: Currency, as: 'FeeCurrency'}, EventType],
    order: [['createdAt', 'desc']]
  };
  const [items, count] = await Promise.all([
    Event.findAll(Object.assign(query, options)),
    Event.count(query)
  ]);

  return res.status(200).json({items, count});
};
