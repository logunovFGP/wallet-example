const axios = require('axios');
const Promise = require('bluebird');
const BigNumber = require('bignumber.js');


module.exports = async (currency, balance) => {
  const currencyResponse = currency.symbol.toUpperCase() === 'USDT' ? {data:{price: 1}} : await axios.get(`${process.env.BINANCE_API_URL}${currency.symbol.toUpperCase()}USDT`);
  const currencyPrice = new BigNumber(currencyResponse.data.price);
  const powedDecimalsCurrency = new BigNumber(10).pow(currency.decimals);
  const usdBalance = balance.dividedBy(powedDecimalsCurrency).multipliedBy(currencyPrice);

  const currencyResponseBnb = currency.symbol.toUpperCase() === 'BNB' ? {data:{price: 1}} : await axios.get(`${process.env.BINANCE_API_URL}BNBUSDT`);
  const currencyPriceBnb = new BigNumber(currencyResponseBnb.data.price);
  const bnbBalance = currency.symbol.toUpperCase() === 'BNB' ? balance.dividedBy(powedDecimalsCurrency) : usdBalance.dividedBy(currencyPriceBnb);

  return [usdBalance, bnbBalance];
}
