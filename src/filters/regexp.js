const field = require("../field");

module.exports = {
  detect: function (query) {
    if (!query) return false;
    if ("object" !== typeof query) return false;
    return !!query.regexpr || !!query.regex;
  },
  compile: function (query, excludeImplicitKeys) {
    const regex = new RegExp(query.term);
    return function (data) {
      return field(query.field, data, excludeImplicitKeys, function (value) {
        return regex.test(value);
      })
        ? query.boost
        : 0;
    };
  },
};
