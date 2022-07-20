const express = require('express');
const upload = require('multer')();

const unpackAccessToken = require('../../middlewares/unpack-access-token');
const verifyAdminToken = require('../../middlewares/verify-admin-token');

const catchWrap = require('../../utils/exception-catch-wrapper');
const controller = require('./controllers');

const router = express.Router();

router
  .use(catchWrap(unpackAccessToken))
  .use(catchWrap(verifyAdminToken));

router
  .route('/users')
  .get(catchWrap(controller.getUsers));
router
  .route('/currencies')
  .get(catchWrap(controller.getCurrencies));
router
  .route('/files')
  .post(upload.single('file'), catchWrap(controller.uploadFile))

module.exports = router;
