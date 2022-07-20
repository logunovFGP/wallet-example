const {UserCurrency, Currency} = require('../../../dao/models');


module.exports = async (req, res) => {
  const user = req.user.toJSON();
  user.currencies = await UserCurrency.findAll({where: {userId: req.user.id}, include: [Currency]});

  return res.status(200).json({user});
};
