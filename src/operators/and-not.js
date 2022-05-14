module.exports = function (operators) {
  return (l, r) => (data) => {
    return operators["AND"](l, function (...args) {
      value = r(...args);
      return value == 0 ? 1 : 0;
    })(data);
  };
};
