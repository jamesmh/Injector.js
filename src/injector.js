import { forEachPropertyDoAction } from './utils';

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
	 * @param  {string} keyOrPOJO   Key of the dependency, javascript object with multiple dependencies defined.
	 * @param  {object} object 		The dependency object.
	 * @return {object}        		The Injector instance.
	 */
	register(keyOrPOJO, object){
		return _register(this, keyOrPOJO, object, false);
	};

	/**
	 * Register a new singleton dependency.
	 * 
	 * @param {any} keyOrPOJO	Key of the dependency, javascript object with multiple dependencies defined.
	 * @param {any} object		The dependency object.
	 * @returns {object}		The Injector instance.
	 * 
	 * @memberOf Injector
	 */
	registerSingleton(keyOrPOJO, object){
		return _register(this, keyOrPOJO, object, true);
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
		const dependenciesToInject = {};
		_getArgumentNames(funct.toString())
			.map(argName => {
				const registered = this._dependencies[argName];	
				const dependencyIsSingleton = registered.singleton;
				dependenciesToInject[argName] = registered.singleton ? registered.dependency : new registered.dependency();
			});

		return dependenciesToInject;
	};
}

const  _regExInsideParentheses = /[(][^)]*[)]/;
const _regExParenthesesAndSpaces = /[()\s]/g;
const _getArgumentNames = functionString => _regExInsideParentheses.exec(functionString)[0].replace(_regExParenthesesAndSpaces, "").split(',');
const 	_register = (injector, keyOrPOJO, object, isSingleton = false) =>{

		// Called as one registration with key and object.
		if(typeof(keyOrPOJO) === "string"){
			const key = keyOrPOJO;
			injector._dependencies[key] = { dependency: object, singleton: isSingleton };
		}
		// Called with multiple objects to register.
		else {
			const configObject = keyOrPOJO;
			forEachPropertyDoAction(configObject, (key, property) => {
				injector._dependencies[key] = { dependency: property, singleton: isSingleton };
			});
		}

		return injector;
	}