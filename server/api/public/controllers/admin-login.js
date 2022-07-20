const {Admin} = require('../../../dao/models');
const ApplicationError = require('../../../utils/application-error');


module.exports = async (req, res) => {
  const admin = await Admin.scope('auth').findOne({where: {email: req.body.email}});
  if (!admin) {
    throw ApplicationError.NotFound();
  }
  const token = await admin.authenticateByPassword(req.body.password);
  return res.status(200).json(token);
};
