const field = (module.exports = function (
  field,
  data,
  excludeImplicitKeys,
  test
) {
  if ("<implicit>" === field)
    return require("./implicit")(data, excludeImplicitKeys, test);
  return test(data[field]);
});
