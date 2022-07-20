const crypto = require('crypto');


module.exports = (toDecrypt, password) => {
  const decipher = crypto.createDecipher('aes256', password);
  return decipher.update(toDecrypt, 'hex', 'utf8') + decipher.final('utf8');
}
