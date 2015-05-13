(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.myPlugin = factory(root);
	}
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var myPlugin = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings, eventTimeout;

	// Default settings
	var defaults = {
		someVar: 123,
		initClass: 'js-myplugin',
		callbackBefore: function () {},
		callbackAfter: function () {}
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

	/**
	 * Get the closest matching element up the DOM tree
	 * @param {Element} elem Starting element
	 * @param {String} selector Selector to match against (class, ID, or data attribute)
	 * @return {Boolean|Element} Returns false if not match found
	 */
	var getClosest = function (elem, selector) {
		var firstChar = selector.charAt(0);
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( firstChar === '.' ) {
				if ( elem.classList.contains( selector.substr(1) ) ) {
					return elem;
				}
			} else if ( firstChar === '#' ) {
				if ( elem.id === selector.substr(1) ) {
					return elem;
				}
			} else if ( firstChar === '[' ) {
				if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
					return elem;
				}
			}
		}
		return false;
	};

	// @todo Do something...

	/**
	 * Handle events
	 * @private
	 */
	var eventHandler = function (event) {
		var toggle = event.target;
		var closest = getClosest(toggle, '[data-some-selector]');
		if ( closest ) {
			// run methods
		}
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	myPlugin.destroy = function () {

		// If plugin isn't already initialized, stop
		if ( !settings ) return;

		// Remove init class for conditional CSS
		document.documentElement.classList.remove( settings.initClass );

		// @todo Undo any other init functions...

		// Remove event listeners
		document.removeEventListener('click', eventHandler, false);

		// Reset variables
		settings = null;
		eventTimeout = null;

	};

	/**
	 * On window scroll and resize, only run events at a rate of 15fps for better performance
	 * @private
	 * @param  {Function} eventTimeout Timeout function
	 * @param  {Object} settings
	 */
	var eventThrottler = function () {
		if ( !eventTimeout ) {
			eventTimeout = setTimeout(function() {
				eventTimeout = null;
				actualMethod( settings );
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

		// Merge user options with defaults
		settings = extend( defaults, options || {} );

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// @todo Do something...

		// Listen for events
		document.addEventListener('click', eventHandler, false);

	};


	//
	// Public APIs
	//

	return myPlugin;

});