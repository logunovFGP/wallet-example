const {User} = require('../../../dao/models');
const cryptoDecrypt = require('../../../utils/crypto-decrypt');


module.exports = async (req, res) => {
  const user = await User.scope('auth').findByPk(req.user.id);
  const mnemonic = cryptoDecrypt(user.restoreMnemonic, process.env.ENCRYPT_SECRET);
  const token = await user.authenticateByPassword(req.body.password);

  token.mnemonic = mnemonic;
  return res.status(200).json(token);
};
