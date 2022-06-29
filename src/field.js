const field = (module.exports = function (field, data, test) {
  if ("<implicit>" === field)
    return require("./implicit")(data, excludeImplicitKeys, test);
  return test(data[field]);
});
