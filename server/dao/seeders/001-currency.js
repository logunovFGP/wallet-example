module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query("ALTER SEQUENCE \"Currency_id_seq\" RESTART WITH 8")

    return queryInterface.bulkInsert('Currency', [
      {
        id: 1,
        name: 'Ethereum',
        symbol: 'ETH',
        changenowSymbol: 'eth', decimals: 18,
        icon: 'https://rinkeby.etherscan.io/images/main/empty-token.png',
        contractAddress: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Binance Coin',
        symbol: 'BNB',
        changenowSymbol: 'bnbbsc', decimals: 18,
        icon: 'https://etherscan.io/token/images/bnb_28_2.png',
        contractAddress: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Binance USD',
        symbol: 'BUSD',
        changenowSymbol: 'busdbsc', decimals: 18,
        icon: 'https://etherscan.io/token/images/binanceusd_32.png',
        contractAddress: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Tether USD',
        symbol: 'USDT',
        changenowSymbol: 'usdterc20', decimals: 8,
        icon: 'https://etherscan.io/token/images/tether_32.png',
        contractAddress: '0xc6fDe3FD2Cc2b173aEC24cc3f267cb3Cd78a26B7',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 5,
        name: 'USD Coin',
        symbol: 'USDC',
        changenowSymbol: 'usdc', decimals: 6,
        icon: 'https://etherscan.io/token/images/centre-usdc_28.png',
        contractAddress: '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Bitcoin',
        symbol: 'BTC',
        changenowSymbol: 'btc', decimals: 8,
        icon: 'https://pngimg.com/uploads/bitcoin/bitcoin_PNG47.png',
        contractAddress: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Litecoin',
        symbol: 'LTC',
        changenowSymbol: 'ltc', decimals: 8,
        icon: 'https://img.favpng.com/25/3/8/litecoin-cryptocurrency-bitcoin-logo-png-favpng-4kyBSfxyMqZ1TrWcGwSdjwWtu.jpg',
        contractAddress: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Ripple',
        symbol: 'XRP',
        changenowSymbol: 'xrp', decimals: 6,
        icon: 'https://cdn.iconscout.com/icon/free/png-512/ripple-5-645853.png',
        contractAddress: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Polkadot',
        symbol: 'DOT',
        changenowSymbol: 'dot', decimals: 12,
        icon: 'https://static-00.iconduck.com/assets.00/polkadot-cryptocurrency-icon-512x512-ik5ji7r8.png',
        contractAddress: '',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 10,
        name: 'Cardano',
        symbol: 'ADA',
        changenowSymbol: 'ada', decimals: 6,
        icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
        contractAddress: '',
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Currency', null, {});
  }
};
