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
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _regExInsideParentheses = /[(][^)]*[)]/;
	var _regExParenthesesAndSpaces = /[()\s]/g;

	var Injector = exports.Injector = function () {
		function Injector() {
			_classCallCheck(this, Injector);

			this._dependencies = [];
			return this;
		}

		_createClass(Injector, [{
			key: "register",
			value: function register(key, object) {
				this._dependencies[key] = object;
				return this;
			}
		}, {
			key: "inject",
			value: function inject() {
				var _this = this;

				var functCode = arguments[0].toString();
				var toInject = {};
				this.getArgumentNames(functCode).forEach(function (argumentName) {
					toInject[argumentName] = _this._dependencies[argumentName];
				});
				return toInject;
			}
		}, {
			key: "getArgumentNames",
			value: function getArgumentNames(funct) {
				return _regExInsideParentheses.exec(funct)[0].replace(_regExParenthesesAndSpaces, "").split(',');
			}
		}]);

		return Injector;
	}();

/***/ }
/******/ ]);