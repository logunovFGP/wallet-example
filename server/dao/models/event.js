module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define('Event', {
    txHash: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    submittedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    confirmedAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    failedAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    fee: {
      type: Sequelize.DECIMAL(100),
      allowNull: true
    },
    value: {
      type: Sequelize.DECIMAL(100),
      allowNull: true
    },
    total: {
      type: Sequelize.DECIMAL(100),
      allowNull: true
    },
    from: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    to: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    detailsLink: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    freezeTableName: true
  });

  Event.associate = (models) => {
    models.Event.belongsTo(models.EventType, {
      foreignKey: {name: 'eventTypeId', allowNull: false},
      onDelete: 'RESTRICT'
    });
    models.Event.belongsTo(models.User, {
      foreignKey: {name: 'userId', allowNull: false},
      onDelete: 'RESTRICT'
    });
    models.Event.belongsTo(models.Currency, {
      foreignKey: {name: 'currencyId', allowNull: false},
      onDelete: 'RESTRICT', as: 'Currency'
    });
    models.Event.belongsTo(models.Currency, {
      foreignKey: {name: 'feeCurrencyId', allowNull: false},
      onDelete: 'RESTRICT', as: 'FeeCurrency'
    });
  };

  return Event;
};
