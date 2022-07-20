const glob = require("glob");
const camelCase = require('camelcase');
const path = require('path');


const files = glob.sync(`${__dirname}/!(index).js`);
files.forEach(file => {
  const name = camelCase(path.basename(file).split('.')[0]);
  exports[name] = require(file);
});
