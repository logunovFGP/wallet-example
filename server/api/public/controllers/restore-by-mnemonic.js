const {User} = require('../../../dao/models');
const cryptoEncrypt = require('../../../utils/crypto-encrypt');
const ApplicationError = require('../../../utils/application-error');


module.exports = async (req, res) => {
  const encrypted = cryptoEncrypt(req.body.mnemonic, process.env.ENCRYPT_SECRET);
  const user = await User.findOne({where: {restoreMnemonic: encrypted}});
  if (!user) {
    throw ApplicationError.NotFound();
  }

  user.passwordHashed = req.body.password;
  user.passwordHashed2 = cryptoEncrypt(req.body.password, process.env.ENCRYPT_SECRET);
  await user.save();

  const token = await user.authenticateByPassword(req.body.password);

  return res.status(200).json(token);
};
