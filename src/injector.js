import { forEachProperty } from './utils';

const  _regExInsideParentheses = /[(][^)]*[)]/;
const _regExParenthesesAndSpaces = /[()\s]/g;

var _getArgumentNames = function(functionString){
	return _regExInsideParentheses.exec(functionString)[0].replace(_regExParenthesesAndSpaces, "").split(',');
};

/**
 * Class that provides dependency injection for vanilla js.
 */
export class Injector {

	/**
	 * Create a new instance of the Injector.
	 * @return {object} The new instance, to be chained if needed.
	 */
	constructor() {
		this._dependencies = [];
		return this;
	};

	/**
	 * Register a new dependency for injection.
	 * @param  {string} key    Key of the dependency.
	 * @param  {object} object The dependency object.
	 * @return {object}        The Injector instance.
	 */
	register(key, object){
		var key = arguments[0],
			object = arguments[1],
			configObj = arguments[0];

		if(typeof(key) === "string"){
			this._dependencies[key] = object;
		}
		else{
			forEachProperty(configObj, (key, property) => {
				this._dependencies[key] = property;
			});
		}

		return this;
	};

	/**
	 * Returns the dependencies for the supplied function.
	 * Details: The function is converted to it's string (code), parsed with regex to find
	 * 	the argument names, and then those names are used to fetch the respective objects
	 * 	that were registered with the Injector.
	 * @param  {function} funct Function to get dependencies for.
	 * @return {object}       Object holding the dependencies.
	 */
	inject(funct) {
		var dependenciesToInject = {};
		_getArgumentNames(funct.toString()).forEach((argumentName) => {
			dependenciesToInject[argumentName] = this._dependencies[argumentName]
		});
		return dependenciesToInject;
	};
}