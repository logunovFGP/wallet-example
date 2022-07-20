const fs = require("fs");

module.exports = async (req, res) => {
  fs.writeFileSync(`${process.env.FILES_DIR}/${req.query.filename}`, req.file.buffer);
  return res.status(200).json({isSuccess: true, data: {url: `${process.env.DOMAIN_NAME}/${req.query.filename}`}});
};
