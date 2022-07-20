const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const hookify = require('./../hooks');

const dbConfig = require('../../configs/db.js');

const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV]);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
Object.keys(db).forEach(modelName => {
  hookify(db[modelName]);
});


module.exports = db;