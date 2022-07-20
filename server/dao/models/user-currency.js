module.exports = (sequelize, Sequelize) => {
  const UserCurrency = sequelize.define('UserCurrency', {
    balance: {
      type: Sequelize.DECIMAL(100),
      allowNull: false,
      defaultValue: "0"
    },
    usdBalance: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "0"
    },
    bnbBalance: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "0"
    },
    private: {
      type: Sequelize.JSONB,
      allowNull: false
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    defaultScope: {
      attributes: { exclude: ['private'] }
    },
    scopes: {auth: {}}
  });
  UserCurrency.associate = (models) => {
    models.UserCurrency.belongsTo(models.User, {
      foreignKey: {name: 'userId', allowNull: false},
      onDelete: 'CASCADE'
    });
    models.UserCurrency.belongsTo(models.Currency, {
      foreignKey: {name: 'currencyId', allowNull: false},
      onDelete: 'CASCADE'
    });
  };
  return UserCurrency;
};
