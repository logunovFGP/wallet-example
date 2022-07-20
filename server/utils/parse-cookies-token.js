const crypto = require('crypto');


module.exports = async (cookie) => {
  const encryptedStrings = JSON.parse(cookie);
  const strings = [];
  for (let i = 0; i < encryptedStrings.length; i++) {
    const decipher = crypto.createDecipher('aes256', process.env.COOKIE_SECRET);
    const decrypted = decipher.update(encryptedStrings[i], 'hex', 'utf8') + decipher.final('utf8');
    strings.push(decrypted);
  }

  return {
    token: strings[0],
    expire: Number.parseInt(strings[1]),
    refresh: strings[2]
  };
}
