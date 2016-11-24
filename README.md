# Injector.js

I've looked around for a simple library that provides dependency injection for vanilla JavaScript. The libraries I've seen are not simple enough to use though. So... I made one.

I'm using ES6 modules, webpack to compile and jest for testing.

## Dev Installation

Clone or download zip. If you want to compile then run "npm install" to install node dependencies. Then run "gulp".

To run the jest unit tests run "npm test"


## Usage Installation

Include "/dist/injector.js" if you just want the compiled version.

If you want to import the ES6 module into your project then reference "/src/injector.js." Here's an example taken from the internal entry file "/src/index.js":

```javascript
import { Injector } from "./injector";
window["$injector"] = new Injector();
```


### Step 1: Register Dependencies

You need to provide "$injector" with all the dependencies you will need. Provide to the .register() or .registerSingleton() method an object with (a) keys that correspond to the argument names that they will be injected into and (b) the actual object to be the dependency.

```javascript
var http  = { get: "I'm a http service." };
var router = { routes: "I'm a router."};

$injector.registerSingleton({
	HttpService: http,
	RouterService: router
});
```

The .register() and .registerSingleton() methods will also accept a dependency registration in the following format:

```javascript
var http  = { get: "I'm a http service." };
var router = { routes: "I'm a router."};

$injector.registerSingleton("HttpService", http)
	.registerSingleton("RouterService", router);
```

In both examples, any functions that are enabled for injection will have arguments "HttpService" and "RouterService" injected. Ex:

```javascript
function(HttpService, RouterService) { /* code here... */ };
```

To register dependencies that will be new instantiations everytime they are injected, use .register(). You need to provide an object that has a constructor so the injector is able to instantiate a new one.

```javascript
// Prototype....
var http  = function() { this.get = "I'm a http service."; };

// ES6 class
class router {
	constructor(){
	 	this.get = "I'm a router.";
	};
};

$injector.register({
    HttpService: http, 
    RouterService: router
  });
```


### Step 2: Enable Function For Injection

Each function you want to have DI enabled for will have to "initialize" himself. 

(a) Call the .inject() method from the injector object ("$injector" if using pre-built file) then (b) supply the function you are inside of as the parameter. The returned object has the dependencies as properties.

#### ES6 class constructor:

For ES6 constructors, supply the .inject() method with "this.constructor".

```javascript
class InjectMe {
	constructor(HttpService, RouterService){
		// Using ES6 destructuring...
		var { HttpService, RouterService } = $injector.inject(this.constructor);
		this.http = HttpService;
		this.router = RouterService;
	}
};
```

#### Non-class / prototype constructor:

As with ES6 constructors, supply the .inject() method with "this.constructor".

```javascript
var prototypeConstructor = function(HttpService, RouterService){
	var { HttpService, RouterService } = $injector.inject(this.constructor);
	this.http = HttpService;
	this.router = RouterService;
};
```


#### Function:

Supply the .inject() method with the function you are in. Note that anonymous and self-executing functions will not work.

```javascript
var regularFunction = function(HttpService, RouterService) {
	// Without ES6 destructuring
	var injected = $injector.inject(regularFunction);
	HttpService = injected.HttpService;
	RouterService = injected.RouterService;
};
```


### Step 3: Call The Function With No Arguments :)

Just call the function you configured. Consider the following:

```javascript
class InjectMe {
	constructor(HttpService, RouterService){
		// Using ES6 deconstruction...
		var { HttpService, RouterService } = $injector.inject(this.constructor);
		this.http = HttpService;
		this.router = RouterService;
	}
};

var myInstance = new InjectMe(); // myInstance.http is the injected object that was previous configured....
```

### To Dos / Enhancements / Notes...

(a) Create extendable class that provdides DI for all child classes?

(b) Explore advanced "tricks" like creating dummy functions that can be re-used to define a group of dependencies to inject.

*Would this work?*
```javascript
// Represents a generic "Http" dependency group.
var httpDependencies = function(HttpService, RouterService){};

// ....Later on....
var someHttpRelatedFunction = function() {
	var { HttpService, RouterService } = $injector.inject(httpDependencies);
	
	// Do some stuff using the HttpService and RouterService....
};
```

*And this? Dynamic injection?*

```javascript
class InjectMe {
	constructor(someCondition){
		// Using ES6 destructuring...
		if (someCondition){
        		var { HttpService, RouterService } = $injector.inject(this.constructor);
		}
		else {
			var { HttpService, RouterService } = $injector.inject(someOtherHttpDependencyGroupFunction);
		}
		this.http = HttpService;
		this.router = RouterService;
	}
};
```

*Or this?*
```javascript
var someFunction = function(HttpService) { /* do stuff */ };

// Later on...
var { HttpService } = $injector.inject(someFunction);
someFunction(HttpService);

var { HttpService } = $injector.inject(someOtherFunction);
someFunction(HttpService);

```
