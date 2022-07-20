const ApplicationError = require('../../../utils/application-error');
const {User} = require('../../../dao/models');


module.exports = async (req, res) => {
  const user = await User.scope('auth').findOne({where: {refreshToken: req.body.refreshToken}});
  if (!user) {
    throw ApplicationError.NotFound();
  }
  const token = await user.authenticateByRefresh();

  return res.status(200).json(token);
};
