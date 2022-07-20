const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ApplicationError = require("../../utils/application-error");
const cryptoEncrypt = require('../../utils/crypto-decrypt');


module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHashed: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
      set(val) {
        this.setDataValue('salt', crypto.randomBytes(16).toString('hex'));
        this.setDataValue('passwordHashed', this.hashPassword(val));
      }
    },
    passwordHashed2: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    salt: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    refreshToken: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
    },
    restoreMnemonic: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    freezeTableName: true,
    defaultScope: {
      attributes: { exclude: ['salt', 'passwordHashed', 'refreshToken', 'private', 'restoreMnemonic'] }
    },
    scopes: {auth: {}}
  });

  User.prototype.hashPassword = function (password) {
    if (!this.salt || !password) {
      throw ApplicationError.RequiredAttributes();
    }

    let hash = crypto.createHmac('sha512', this.salt);
    hash.update(password);
    return hash.digest('hex');
  };

  User.prototype.authenticateByPassword = async function (password) {
    if (!password || this.passwordHashed !== this.hashPassword(password)) {
      throw ApplicationError.InvalidCredentials();
    }
    return this.getTokens();
  };

  User.prototype.authenticateByRefresh = async function () {
    try {
      jwt.verify(this.refreshToken, process.env.USER_JWT_REFRESH_SECRET);
    } catch(err) {
      throw ApplicationError.BadUserToken();
    }
    return this.getTokens();
  }

  User.prototype.getTokens = async function () {
    const ttlAccess = Number.parseInt(process.env.USER_JWT_ACCESS_EXPIRE);
    const ttlRefresh = Number.parseInt(process.env.USER_JWT_REFRESH_EXPIRE);

    const accessExpireDate = Date.now() + (ttlAccess * 1000);
    const payload = {id: this.id}

    this.refreshToken = jwt.sign(payload, process.env.USER_JWT_REFRESH_SECRET, {expiresIn: ttlRefresh});
    await this.save();

    return {
      expire: accessExpireDate,
      token: jwt.sign(payload, process.env.USER_JWT_ACCESS_SECRET, {expiresIn: ttlAccess}),
      refresh: this.refreshToken,
    }
  }

  User.associate = (models) => {
    models.User.belongsToMany(models.Currency, {
      through: models.UserCurrency,
      foreignKey: {name: 'userId', allowNull: false},
      as: {singular: 'userCurrency', plural: 'userCurrencies'},
      onDelete: 'CASCADE'
    });
    models.User.hasMany(models.Event, {
      foreignKey: {name: 'userId', allowNull: false},
      onDelete: 'RESTRICT'
    });
  };

  return User;
};
