module.exports = async (skip, limit) => {
  const options = {offset: Number(skip), limit: Number(limit)};
  Object.keys(options).forEach(key => !(options[key]) && delete options[key]);
  return options;
};