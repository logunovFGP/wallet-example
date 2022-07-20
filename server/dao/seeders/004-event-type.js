module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query("ALTER SEQUENCE \"EventType_id_seq\" RESTART WITH 3")

    return queryInterface.bulkInsert('EventType', [
      {
        id: 1,
        name: 'Send',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Receive',
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {}, {private: { type: new Sequelize.JSON() }});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventType', null, {});
  }
};
