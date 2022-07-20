const ApplicationError = require('../utils/application-error');
const parseCookiesToken = require('../utils/parse-cookies-token');
const jwt = require('jsonwebtoken');
const { User } = require('../dao/models');


module.exports = async (req, res, next) => {
  let token;
  try {
    token = await parseCookiesToken(req.cookies.token);
  } catch (err) {
    throw ApplicationError.BadUserToken();
  }

  let userJwt;
  try {
    userJwt = jwt.verify(token.token, process.env.USER_JWT_ACCESS_SECRET);
  } catch(err) {
    console.log(err);
  }
  if (!userJwt) {
    try {
      const user = await User.scope('auth').findOne({where: {refreshToken: token.refresh}});
      if (!user) {
        throw ApplicationError.NotFound();
      }
      await user.authenticateByRefresh();
      userJwt = { id: user.id };
    } catch (err) {
      console.log(err);
    }
  }
  if (!userJwt) {
    throw ApplicationError.BadUserToken();
  }
  req.user = await User.findOne({ where: { id: userJwt.id }});
  if (!req.user) {
    throw ApplicationError.BadUserToken();
  }
  next();
};
