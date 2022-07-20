module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query("ALTER SEQUENCE \"User_id_seq\" RESTART WITH 3")

    return queryInterface.bulkInsert('User', [
      {
        id: 1,
        username: 'sane5ek',
        passwordHashed: 'bc53aa03f0b2624eaffd3a03f03f7611624629d6a23a8ac90c599a713f2453b58c352c12389899371fe7d1e56cbf3790335c8d736f75cba13692cf5fc3f59fb3',
        salt: 'db42630da55637e948fc714299629226',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzMTc3NzAxLCJleHAiOjE2MzM3ODI1MDF9.mZDefA6BXqUJt8buWrKePxG2MbKJK7k9ovYVMFG36pc',
        createdAt: new Date(), updatedAt: new Date(),
        restoreMnemonic: 'bdb5b364d188974d7d7b5a355b72f00039a87689f47252dde900e17a450b587529fbb40ba1655cc9ca2cee86963bbb2a9f583f8be01bd3f9d7e4fe2aab7b67d10b78d417d071b13b9c7638876885cf16',
        passwordHashed2: 'ec7307dbfd69d807c0b0d91864bc318a',
      },
      {
        id: 2,
        username: 'skyover',
        passwordHashed: '456e1bdc79bd2e297ceb689c7605985d656303831c87325dd290174cd6de286b92b5a42af65e8c6f095793f9e4b0885a757920aafe4ac812e0ff9316fe82a320',
        salt: 'd671ac3b79a954b7eb64354c30fd02c7',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMzMTgzNzYyLCJleHAiOjE2MzM3ODg1NjJ9.xabs1EJLfnHM6rl2Lt4aOhocDNrL2sLukd07pdFAasU',
        createdAt: new Date(), updatedAt: new Date(),
        restoreMnemonic: '34e5d50416fd370ad913266af3fae6adfb70ab04bdefaac92c85ba2f4a30ea9dbf2ee64b9d3d56d2e809a1cfbe845cb936b67c02c409e71b2d99710aa4c466c290cb4718d51b5172b6eb23152c62228e',
        passwordHashed2: 'ec7307dbfd69d807c0b0d91864bc318a',
      },

    ], {}, {private: { type: new Sequelize.JSON() }});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
