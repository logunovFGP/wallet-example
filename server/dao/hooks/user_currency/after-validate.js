module.exports = async (instance, options) => {
  const fields = instance.changed();
  for (let i = 0; i < fields.length; i++) {
    if (options.fields.indexOf(fields[i]) === -1) {
      options.fields.push(fields[i]);
    }
    if (options.defaultFields.indexOf(fields[i]) === -1) {
      options.defaultFields.push(fields[i]);
    }
    const skipIndex = options.skip.indexOf(fields[i]);
    if (skipIndex !== -1) {
      options.skip.splice(skipIndex, 1);
    }
  }
};