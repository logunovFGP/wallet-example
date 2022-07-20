const {Currency} = require('../../../dao/models');


module.exports = async (req, res) => {
  const currencies = await Currency.findAll();
  return res.status(200).json({items: currencies});
};
