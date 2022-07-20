const ApplicationError = require('../utils/application-error');


module.exports = async (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header || !header.includes(' ')) {
    throw ApplicationError.NoAuthHeader();
  }

  req.accessToken = header.split(' ')[1];
  next();
};