const crypto = require('crypto');
const ApplicationError = require("../../utils/application-error");
const jwt = require('jsonwebtoken');

module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define('Admin', {
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      },
      unique: true,
      allowNull: false,
      set(val) {
        this.setDataValue('email', val.toString().toLowerCase());
      }
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
    salt: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    refreshToken: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
    }
  }, {
    freezeTableName: true,
    defaultScope: {
      attributes: { exclude: ['salt', 'passwordHashed', 'refreshToken'] }
    },
    scopes: { auth: {} }
  });

  Admin.prototype.hashPassword = function (password) {
    if (!this.salt || !password) {
      throw ApplicationError.RequiredAttributes();
    }

    let hash = crypto.createHmac('sha512', this.salt);
    hash.update(password);
    return hash.digest('hex');
  };

  Admin.prototype.authenticateByPassword = async function (password) {
    if (!password || this.passwordHashed !== this.hashPassword(password)) {
      throw ApplicationError.InvalidCredentials();
    }
    return this.getTokens();
  };

  Admin.prototype.authenticateByRefresh = async function () {
    try {
      jwt.verify(this.refreshToken, process.env.ADMIN_JWT_REFRESH_SECRET);
    } catch(err) {
      throw ApplicationError.BadUserToken();
    }
    return this.getTokens();
  }

  Admin.prototype.getTokens = async function () {
    const ttlAccess = Number.parseInt(process.env.ADMIN_JWT_ACCESS_EXPIRE);
    const ttlRefresh = Number.parseInt(process.env.ADMIN_JWT_REFRESH_EXPIRE);

    const accessExpireDate = Date.now() + ttlAccess;
    const payload = {id: this.id}

    this.refreshToken = jwt.sign(payload, process.env.ADMIN_JWT_REFRESH_SECRET, {expiresIn: ttlRefresh});
    await this.save();

    return {
      expire: accessExpireDate,
      token: jwt.sign(payload, process.env.ADMIN_JWT_ACCESS_SECRET, {expiresIn: ttlAccess}),
      refresh: this.refreshToken,
    }
  }

  Admin.associate = (models) => {
  };

  return Admin;
};