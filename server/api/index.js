const publicRouter = require('./public');
const userRouter = require('./user');
const adminRouter = require('./admin');

const exceptionHandler = require('../middlewares/exception-handler');

const prefix = '/api/v1/';

exports.prefix = prefix;
exports.routify = (app) => {
  app.use(prefix + 'public', publicRouter);
  app.use(prefix + 'user', userRouter);
  app.use(prefix + 'admin', adminRouter);
  app.use(exceptionHandler);
};
