const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Using HTTPS
const erc20Web3 = createAlchemyWeb3(`${process.env.ALCHEMY_PROVIDER_URL}${process.env.ALCHEMY_PROVIDER_KEY}`);

module.exports = erc20Web3;
