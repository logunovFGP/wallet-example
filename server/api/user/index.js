const express = require('express');

const verifyToken = require('../../middlewares/verify-token');
const jsonValidator = require('../../middlewares/json-validation');

const catchWrap = require('../../utils/exception-catch-wrapper');
const schema = require('./json-schemas');
const controller = require('./controllers');


const router = express.Router();

router
  .use(catchWrap(verifyToken))


router
  .route('/whoami')
  .get(catchWrap(controller.getProfile));
router
  .route('/currencies/:id/balance')
  .get(catchWrap(controller.getBalance));
router
  .route('/currencies')
  .get(catchWrap(controller.getCurrencies));
router
  .route('/events')
  .get(catchWrap(controller.getEvents));
router
  .route('/mnemonic')
  .post(catchWrap(controller.getMnemonic));
router
  .route('/events/subscribe')
  .get(catchWrap(controller.subscribeEvents));
router
  .route('/currencies/:id/transaction')
  .post(catchWrap(controller.sendTransaction));
router
  .route('/currencies/:id/estimate')
  .post(catchWrap(controller.estimateTransaction));

module.exports = router;
