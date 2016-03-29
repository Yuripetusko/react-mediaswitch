var kvPairsAreEqual,
  __hasProp = {}.hasOwnProperty;

kvPairsAreEqual = function(a, b) {
  var k, v;
  for (k in a) {
    if (!__hasProp.call(a, k)) continue;
    v = a[k];
    if (b[k] !== v) {
      return false;
    }
  }
  return true;
};

module.exports = function(a, b) {
  return kvPairsAreEqual(a, b) && kvPairsAreEqual(b, a);
};
