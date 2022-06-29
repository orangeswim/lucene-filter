const implicit = (module.exports = function (data, excludeImplicitKeys, test) {
  if (!test) {
    test = excludeImplicitKeys;
  }
  if (!excludeImplicitKeys) {
    excludeImplicitKeys = [];
  }
  return Object.keys(data)
    .filter((k) => !excludeImplicitKeys.includes(k))
    .reduce((r, key) => {
      return r || require("./field")(key, data, excludeImplicitKeys, test);
    }, false);
});
