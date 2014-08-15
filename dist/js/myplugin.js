/**
 * gulp-boilerplate v0.4.0
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

	var myPlugin = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var eventListeners = []; //Listeners array
	var settings, ELEMENTS, eventTimeout;

	// Default settings
	var defaults = {
		someVar: 123,
		callbacks: {
			before: function () {},
			after: function () {}
		}
	};


	//
	// Methods
	//

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
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function ( defaults, options ) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};

	/**
	 * Convert data-options attribute into an object of key/value pairs
	 * @private
	 * @param {String} options Link-specific options as a data attribute string
	 * @returns {Object}
	 */
	var getDataOptions = function ( options ) {
		return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse( options );
	};

	// @todo Do something...

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	myPlugin.destroy = function () {

		if ( !settings ) return;

		// @todo Undo init functions...

		// Remove event listeners
		if ( ELEMENTS ) {
			forEach( ELEMENTS, function ( elem, index ) {
				elem.removeEventListener( 'click', eventListeners[index], false );
			});
			eventListeners = [];
		}

		// Reset variables
		settings = null;
		ELEMENTS = null;
		eventTimeout = null;

	};

	/**
	 * On window scroll and resize, only run events at a rate of 15fps for better performance
	 * @private
	 * @param  {Function} eventTimeout Timeout function
	 * @param  {TBD} ELEMENTS Some element, nodelist, or other variable to pass in
	 * @param  {Object} settings
	 */
	var eventThrottler = function ( eventTimeout, ELEMENTS, settings ) {
		if ( !eventTimeout ) {
			eventTimeout = setTimeout(function() {
				eventTimeout = null;
				setWrapHeight( wrap, footer, settings );
			}, 66);
		}
	};

	/**
	 * Initialize Plugin
	 * @public
	 * @param {Object} options User settings
	 */
	myPlugin.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		myPlugin.destroy();

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		ELEMENTS = document.querySelectorAll('[data-ELEM]'); // Set your variable here

		// @todo Do something...

		// Assigns event listeners to an array so they can be programatically destroyed
		forEach(ELEMENTS, function (elem, index) {
			eventListeners[index] = myPlugin.METHOD.bind( null, elem, ELEMENTSS, settings );
			elem.addEventListener('click', eventListeners[index], false);
		});

	};


	//
	// Public APIs
	//

	return myPlugin;

});