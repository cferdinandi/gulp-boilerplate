/**
 * gulp-boilerplate v0.0.5
 * My Gulp.js boilerplate for creating new web projects, by Chris Ferdinandi.
 * http://github.com/cferdinandi/Plugin
 * 
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 */

(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {
    define('MyPlugin', factory(root));
  } else if ( typeof exports === 'object' ) {
    module.exports = factory(root);
  } else {
    root.MyPlugin = factory(root);
  }
})(this, function (root) {

  'use strict';

  //
  // Variables
  //

  var exports = {}; // Object for public APIs
  var supports = !!document.querySelector && !!root.addEventListener; // Feature test

  // Default settings
  var defaults = {
    someVar: 123,
    callbackBefore: function () {},
    callbackAfter: function () {}
  };


  //
  // Methods
  //

  /**
   * Merge defaults with user options
   * @private
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   * @returns {Object} Merged values of defaults and options
   */
  var extend = function ( defaults, options ) {
    for ( var key in options ) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        defaults[key] = options[key];
      }
    }
    return defaults;
  };

  /**
   * A simple forEach() implementation for Arrays, Objects and NodeLists
   * @private
   * @param {Array|Object|NodeList} collection Collection of items to iterate
   * @param {Function} callback Callback function for each iteration
   * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
   */
  var forEach = function (collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === '[object Object]') {
      for (var prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection);
        }
      }
    } else {
      for (var i = 0, len = collection.length; i < len; i++) {
        callback.call(scope, collection[i], i, collection);
      }
    }
  };

  /**
   * Remove whitespace from a string
   * @private
   * @param {String} string
   * @returns {String}
   */
  var trim = function ( string ) {
    return string.replace(/^\s+|\s+$/g, '');
  };

  /**
   * Convert data-options attribute into an object of key/value pairs
   * @private
   * @param {String} options Link-specific options as a data attribute string
   * @returns {Object}
   */
  var getDataOptions = function ( options ) {
    var settings = {};
    // Create a key/value pair for each setting
    if ( options ) {
      options = options.split(';');
      options.forEach( function(option) {
        option = trim(option);
        if ( option !== '' ) {
          option = option.split(':');
          settings[option[0]] = trim(option[1]);
        }
      });
    }
    return settings;
  };

  // @todo Do something...

  /**
   * Initialize Plugin
   * @public
   * @param {Object} options User settings
   */
  exports.init = function ( options ) {

    // feature test
    if ( !supports ) return;

    // @todo Do something...

  };


  //
  // Public APIs
  //

  return exports;

});