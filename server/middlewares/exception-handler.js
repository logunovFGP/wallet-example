const {TokenExpiredError} = require('jsonwebtoken');
const ApplicationError = require('../utils/application-error');
const {DatabaseError, ValidationError} = require("sequelize");


module.exports = async (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    console.log(err);
    return res.status(err.httpStatusCode).json({ message: err.message, code: err.code })
  }

  if (err instanceof TokenExpiredError) {
    return res.status(403).json({ message: 'Token Expired Error', code: 200 })
  }
  if (err instanceof ValidationError) {
    console.log(err);
    return res.status(422).json({ message: `${err.message}`, code: 102 })
  }
  if (err instanceof DatabaseError) {
    console.log(err);
    return res.status(500).json({ message: `Database Error: ${err.message}`, code: 100 })
  }

  console.log(err);
  return res.status(500).json({ message: err.message, code: -1 });
};