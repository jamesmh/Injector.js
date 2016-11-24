/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _injector = __webpack_require__(1);

	window["$injector"] = new _injector.Injector();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Injector = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _regExInsideParentheses = /[(][^)]*[)]/;
	var _regExParenthesesAndSpaces = /[()\s]/g;

	var _getArgumentNames = function _getArgumentNames(functionString) {
		return _regExInsideParentheses.exec(functionString)[0].replace(_regExParenthesesAndSpaces, "").split(',');
	};

	/**
	 * Class that provides dependency injection for vanilla js.
	 */

	var Injector = exports.Injector = function () {

		/**
	  * Create a new instance of the Injector.
	  * @return {object} The new instance, to be chained if needed.
	  */
		function Injector() {
			_classCallCheck(this, Injector);

			this._dependencies = [];
			return this;
		}

		_createClass(Injector, [{
			key: 'register',


			/**
	   * Register a new dependency for injection.
	   * @param  {string} key    Key of the dependency.
	   * @param  {object} object The dependency object.
	   * @return {object}        The Injector instance.
	   */
			value: function register(key, object) {
				return this._register(key, object, false);
			}
		}, {
			key: 'registerSingleton',
			value: function registerSingleton(key, object) {
				return this._register(key, object, true);
			}
		}, {
			key: '_register',
			value: function _register(key, object) {
				var isSingleton = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

				var key = arguments[0],
				    object = arguments[1],
				    configObj = arguments[0],
				    injector = this;

				// Called as one registration with key and object.
				if (typeof key === "string") {
					injector._dependencies[key] = { dependency: object, singleton: isSingleton };
				}
				// Called with multiple objects to register.
				else {
						(0, _utils.forEachProperty)(configObj, function (key, property) {
							injector._dependencies[key] = { dependency: property, singleton: isSingleton };
						});
					}

				return injector;
			}

			/**
	   * Returns the dependencies for the supplied function.
	   * Details: The function is converted to it's string (code), parsed with regex to find
	   * 	the argument names, and then those names are used to fetch the respective objects
	   * 	that were registered with the Injector.
	   * @param  {function} funct Function to get dependencies for.
	   * @return {object}       Object holding the dependencies.
	   */

		}, {
			key: 'inject',
			value: function inject(funct) {
				var _this = this;

				var dependenciesToInject = {},
				    injector = this;

				_getArgumentNames(funct.toString()).forEach(function (functArgName) {
					var registered = _this._dependencies[functArgName];
					dependenciesToInject[functArgName] = registered.singleton ? registered.dependency : new registered.dependency();
				});

				return dependenciesToInject;
			}
		}]);

		return Injector;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Loop through an objects own properties and execute and action.
	 * Action function will be provided the current key and the property assign to that key.
	 * @param  {object} obj    Object to loop through.
	 * @param  {function} action Action to perform on each property.
	 */
	var forEachProperty = function forEachProperty(obj, action) {
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      action(key, obj[key]);
	    }
	  }
	};

	exports.forEachProperty = forEachProperty;

/***/ }
/******/ ]);