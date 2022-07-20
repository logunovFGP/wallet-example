const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Using HTTPS
const web3 = createAlchemyWeb3(process.env.BINANCE_PROVIDER_URL);

module.exports = web3;
