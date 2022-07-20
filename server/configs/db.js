require('dotenv').config();
const fs = require('fs');

module.exports = {
  'development': {
    'host': process.env.DB_HOST,
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'dialect': process.env.DB_DIALECT,
    'logging': false
  },
  'production': {
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'dialect': process.env.DB_DIALECT,
    'logging': false,
    // 'dialectOptions': {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/db.crt')
    //   }
    // }
  }
};