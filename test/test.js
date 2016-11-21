window["http"]  = { get: "I'm a http service." };
window["router"] = { routes: "I'm a router."};

$injector.register("HttpService", window["http"])
	.register("RouterService", window["router"]);


var logInjectionSuccess = function(key, http, router){
	console.log(key + ' injection success: ' + (http == window["http"] && router == window["router"]).toString());
}

//Test regular function
var doStuff = function(HttpService, RouterService) {
	var injected = $injector.inject(doStuff);
	var { HttpService, RouterService } = injected;
	logInjectionSuccess("function", HttpService, RouterService);
};
doStuff();


//test ES6 class
class classTest {
	constructor(HttpService, RouterService){
		var { HttpService, RouterService } = $injector.inject(this.constructor);
		this.http = HttpService;
		this.router = RouterService;
	}
};

var classTestObject = new classTest();
logInjectionSuccess("ES6 class", classTestObject.http, classTestObject.router);



//test prototype inheritance
var protoTest = function(HttpService, RouterService){
	var { HttpService, RouterService } = $injector.inject(this.constructor);
	this.http = HttpService;
	this.router = RouterService;
};

var protoTestObject = new protoTest();
logInjectionSuccess("Prototype", protoTestObject.http, protoTestObject.router);