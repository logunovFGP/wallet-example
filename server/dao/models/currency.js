module.exports = (sequelize, Sequelize) => {
  const Currency = sequelize.define('Currency', {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    symbol: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    changenowSymbol: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    icon: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    iconBlack: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    contractAddress: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    decimals: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  }, {
    freezeTableName: true
  });

  Currency.associate = (models) => {
    models.Currency.belongsToMany(models.User, {
      through: models.UserCurrency,
      foreignKey: {name: 'currencyId', allowNull: false},
      as: {singular: 'currencyUser', plural: 'currencyUsers'},
      onDelete: 'CASCADE'
    });
    models.Currency.hasMany(models.Event, {
      foreignKey: {name: 'currencyId', allowNull: false},
      onDelete: 'RESTRICT', as: 'Currency'
    });
    models.Currency.hasMany(models.Event, {
      foreignKey: {name: 'feeCurrencyId', allowNull: false},
      onDelete: 'RESTRICT', as: 'FeeCurrency'
    });
  };

  return Currency;
};
