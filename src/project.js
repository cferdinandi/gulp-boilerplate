(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.MYPROJECT = factory();
  }
})(this, function () {

  'use strict';

  var exports = {};

  exports.init = function () {};

  return exports;

});
