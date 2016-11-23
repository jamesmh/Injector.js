import { Injector } from "./injector";

//Configure injection...
var $injector = new Injector();
var http  = { get: "I'm a http service." };
var router = { get: "I'm a router."};

$injector.register("HttpService", http)
	.register("RouterService", router);

export { $injector, http, router };