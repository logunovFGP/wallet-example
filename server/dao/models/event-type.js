module.exports = (sequelize, Sequelize) => {
  const EventType = sequelize.define('EventType', {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  EventType.associate = (models) => {
    models.EventType.hasMany(models.Event, {
      foreignKey: {name: 'eventTypeId', allowNull: false},
      onDelete: 'RESTRICT'
    });
  };

  return EventType;
};
