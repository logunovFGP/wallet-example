const decamelize = require('decamelize');
const camelCase = require('camelcase');
const glob = require("glob");
const path = require('path');


module.exports = (Model) => {
  if (!Model.name) {
    return;
  }
  const hooksDirectory = decamelize(Model.name, '-');

  const files = glob.sync(`${__dirname}/${hooksDirectory}/*.js`);
  files.forEach(file => {
    const hookName = camelCase(path.basename(file).split('.')[0]);
    const hookFunc = require(file);
    Model.addHook(hookName, hookFunc);
  });
};
