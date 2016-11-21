	const  _regExInsideParentheses = /[(][^)]*[)]/;
	const _regExParenthesesAndSpaces = /[()\s]/g;

export class Injector {

	constructor() {
		this._dependencies = [];
		return this;
	};

	register(key, object){
		this._dependencies[key] = object;
		return this;
	};

	inject() {
		var functCode = arguments[0].toString();
		var toInject = {};
		this.getArgumentNames(functCode).forEach((argumentName) => {
			toInject[argumentName] = this._dependencies[argumentName]
		});
		return toInject;
	};

	getArgumentNames(funct){
		return _regExInsideParentheses.exec(funct)[0].replace(_regExParenthesesAndSpaces, "").split(',');
	};
}