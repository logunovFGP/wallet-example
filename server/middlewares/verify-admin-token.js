const { Admin } = require('../dao/models');
const ApplicationError = require('../utils/application-error');
const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {
  let adminJwt;
  try {
    adminJwt = jwt.verify(req.accessToken, process.env.ADMIN_JWT_ACCESS_SECRET);
  } catch(err) {
    throw ApplicationError.BadUserToken();
  }
  req.admin = await Admin.findOne({ where: { id: adminJwt.id }, attributes: { exclude: ['salt', 'passwordHashed'] }});
  if (!req.admin) {
    throw ApplicationError.AdminTokenNotFound();
  }

  next();
};