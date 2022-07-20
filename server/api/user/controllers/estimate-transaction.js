const getManager = require('../../../web3/get-currency-manager');
const {Currency, UserCurrency, User} = require('../../../dao/models');
const ApplicationError = require('../../../utils/application-error');
const BigNumber = require('bignumber.js');
const axios = require('axios');
const Promise = require('bluebird');
const cryptoDecrypt = require('../../../utils/crypto-decrypt');


module.exports = async (req, res) => {
  const currency = await Currency.findByPk(req.params.id);
  if (!currency || !req.body.to || !req.body.value) {
    throw ApplicationError.NotFound();
  }
  const bnValue = new BigNumber(req.body.value);
  // if (currency.id === 9 && !req.body.password) {
  //   throw ApplicationError.DotRestrictionError();
  // }
  if (currency.id === 10 && bnValue.lt(new BigNumber(Math.pow(10, currency.decimals)))) {
    throw ApplicationError.AdaRestrictionError();
  }
  const userCurrency = await UserCurrency.scope('auth').findOne({where: {userId: req.user.id, currencyId: currency.id}});

  const Manager = await getManager(currency);
  const manager = await new Manager(userCurrency.address, currency, req.user.id);

  const user = await User.scope('auth').findByPk(req.user.id);
  const mnemonic = cryptoDecrypt(user.restoreMnemonic, process.env.ENCRYPT_SECRET);
  const estimated = await manager.estimateTransaction(req.body.to, bnValue, mnemonic, userCurrency.private, req.user);
  const result = {
    success: true,
    reason: ''
  }

  let [currencyResponse, ethResponse, bnbResponse] = await Promise.all([
    currency.symbol.toUpperCase() === 'USDT' ? {data:{price: 1}} : axios.get(`${process.env.BINANCE_API_URL}${currency.symbol.toUpperCase()}USDT`),
    axios.get(`${process.env.BINANCE_API_URL}ETHUSDT`),
    axios.get(`${process.env.BINANCE_API_URL}BNBUSDT`)
  ]);

  const [currencyPrice, ethPrice, bnbPrice] = [
    new BigNumber(currencyResponse.data.price),
    new BigNumber(ethResponse.data.price),
    new BigNumber(bnbResponse.data.price),
  ];

  const powedDecimalsCurrency = new BigNumber(10).pow(currency.decimals);
  const powedDecimalsEthereum = new BigNumber(10).pow(18);

  const payments = [];
  switch(currency.id) {
    case 3:
      const bnbValueUsd = estimated.value.dividedBy(powedDecimalsCurrency).multipliedBy(currencyPrice);
      const bnbFeeUsd = estimated.fee.dividedBy(powedDecimalsEthereum).multipliedBy(bnbPrice);

      payments.push({
        Currency: currency,
        fee: "0",
        value: estimated.value.toString(10),
        total: estimated.value.toString(10),

        feeUsd: "0",
        valueUsd: bnbValueUsd.toString(10),
        totalUsd: bnbValueUsd.toString(10)
      });
      payments.push({
        Currency: await Currency.findByPk(2),
        fee: estimated.fee.toString(10),
        value: "0",
        total: estimated.fee.toString(10),

        feeUsd: bnbFeeUsd.toString(10),
        valueUsd: "0",
        totalUsd: bnbFeeUsd.toString(10)
      });
      const bnbBalance = await UserCurrency.scope('auth').findOne({where: {userId: req.user.id, currencyId: 2}});
      const bnBnbBalance = new BigNumber(bnbBalance.balance);
      if (bnBnbBalance.lt(estimated.fee)) {
        result.success = false;
        result.reason = 'Not enough BNB to pay gas.';
      }
      break;
    case 4:
    case 5:
      const ethValueUsd = estimated.value.dividedBy(powedDecimalsCurrency).multipliedBy(currencyPrice);
      const ethFeeUsd = estimated.fee.dividedBy(powedDecimalsEthereum).multipliedBy(ethPrice);

      payments.push({
        Currency: currency,
        fee: "0",
        value: estimated.value.toString(10),
        total: estimated.value.toString(10),

        feeUsd: "0",
        valueUsd: ethValueUsd.toString(10),
        totalUsd: ethValueUsd.toString(10)
      });
      payments.push({
        Currency: await Currency.findByPk(1),
        fee: estimated.fee.toString(10),
        value: "0",
        total: estimated.fee.toString(10),

        feeUsd: ethFeeUsd.toString(10),
        valueUsd: "0",
        totalUsd: ethFeeUsd.toString(10)
      });
      const ethBalance = await UserCurrency.scope('auth').findOne({where: {userId: req.user.id, currencyId: 1}});
      const bnEthBalance = new BigNumber(ethBalance.balance);
      if (bnEthBalance.lt(estimated.fee)) {
        result.success = false;
        result.reason = 'Not enough ETH to pay gas.';
      }
      break;
    default:
      payments.push({
        Currency: currency,
        fee: estimated.fee.toString(10),
        value: estimated.value.toString(10),
        total: estimated.total.toString(10),

        feeUsd: estimated.fee.dividedBy(powedDecimalsCurrency).multipliedBy(currencyPrice).toString(10),
        valueUsd: estimated.value.dividedBy(powedDecimalsCurrency).multipliedBy(currencyPrice).toString(10),
        totalUsd: estimated.total.dividedBy(powedDecimalsCurrency).multipliedBy(currencyPrice).toString(10)
      });
      const balance = await manager.getBalance(userCurrency.private);
      if (balance.lt(estimated.total)) {
        result.success = false;
        result.reason = 'Not enough balance to pay gas.';
      }
  }

  return res.status(result.success ? 200 : 409).json({result, payments});
};
