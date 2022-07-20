const ApplicationError = require('../utils/application-error');


module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const message = error.details.map(i => i.message).join(',');
      throw ApplicationError.JsonValidation(message);
  }
}};