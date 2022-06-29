const field = require("../../field");

module.exports = {
  detect: function (query) {
    if (!query) return false;
    if ("object" !== typeof query) return false;
    if ("string" !== typeof query.field) return false;
    return "string" === typeof query.term;
  },
  compile: function (query, excludeImplicitKeys) {
    return function (data) {
      return field(query.field, data, excludeImplicitKeys, function (value) {
        if ("string" !== typeof value) return false;
        return value.toLowerCase().indexOf(query.term.toLowerCase()) >= 0;
      })
        ? query.boost
        : 0;
    };
  },
};
