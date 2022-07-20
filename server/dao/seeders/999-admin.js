module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admin', [
      {
        email: 'admin@admin.com',
        passwordHashed: '9b2c6a8f4e467917fc5068993e98a943098c7231483b0bfc45a143aabd196ff582d98e23065dde0cdb09833308656cab36e623790938a577fdb60f31eb137983',
        salt: '9bdfa3726c9a889bfb3eed605902cd32',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admin', null, {});
  }
};
