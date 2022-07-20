const ApplicationError = require('../utils/application-error');


module.exports = async (currency) => {
  switch (currency.symbol.toLowerCase()) {
    case 'eth':
      return require(`./managers/eth.js`);
    case 'btc':
      return require(`./managers/btc.js`);
    case 'xrp':
      return require(`./managers/xrp.js`);
    case 'dot':
      return require(`./managers/dot.js`);
    case 'ada':
      return require(`./managers/ada.js`);
    case 'ltc':
      return require(`./managers/ltc.js`);
    case 'usdt':
    case 'usdc':
      return require(`./managers/erc20.js`);
    case 'bnb':
      return require(`./managers/bnb.js`);
    case 'busd':
      return require(`./managers/bep20.js`);
    default:
      throw ApplicationError.ManagerNotFound();
  }
}
