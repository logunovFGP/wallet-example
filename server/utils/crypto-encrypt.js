const crypto = require('crypto');


module.exports = (toEncrypt, password) => {
  const cipherPrivate = crypto.createCipher('aes256', password);
  return cipherPrivate.update(toEncrypt, 'utf8', 'hex') + cipherPrivate.final('hex');
}
