const express = require('express');

const jsonValidator = require('../../middlewares/json-validation');

const catchWrap = require('../../utils/exception-catch-wrapper');
const controller = require('./controllers');
const schema = require('./json-schemas');


const router = express.Router();
router
  .route('/login')
  .post(catchWrap(controller.userLogin));
router
  .route('/admin/login')
  .post(catchWrap(controller.adminLogin));
// router
//   .route('/refresh')
//   .post(catchWrap(controller.userRefresh));
router
  .route('/register')
  .post(catchWrap(controller.userRegister));
router
  .route('/check-mnemonic')
  .post(catchWrap(controller.checkMnemonic));
router
  .route('/restore-by-mnemonic')
  .post(catchWrap(controller.restoreByMnemonic));

module.exports = router;
