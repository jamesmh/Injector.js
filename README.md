# Injector.js

I've looked around for a simple library that provides dependency injection for vanilla JavaScript. The libraries I've seen are not simple enough to use though. So... I made one.  

## Installation

Include /dist/injector.js. 

See /src/index.js if you want to import the ES6 module into your project.

### Step 1:Register Dependencies

You need to provide "$injector" with all the dependencies you will need. Use .register(), which can be chained. The first parameter is the "name" or key of the dependency, and the second parameter is the object to be the dependency. *Note: The "name" will be used to match parameter names from functions... keep reading.*

```
var http  = { get: "I'm a http service." };
var router = { routes: "I'm a router."};

$injector.register("HttpService", http)
	.register("RouterService", router);
```

Right now, the object you inject is used statically. (I may add the option to have new instances injected - eventually)


### Step 2: Enable Function For Injection

Each function you want to have DI enabled for will have to "initialize" himself. 

(a) Call the .inject() method from the injector object ("$injector" if using pre-built file) then (b) supply the function you are inside of as the parameter. The returned object has the dependencies as properties.

#### ES6 class constructor:

For ES6 constructors, supply the .inject() method with "this.constructor".
```
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
```
var prototypeConstructor = function(HttpService, RouterService){
	var { HttpService, RouterService } = $injector.inject(this.constructor);
	this.http = HttpService;
	this.router = RouterService;
};
```

#### Function:

As with ES6 constructors, supply the .inject() method with "this.constructor". Note that lambda, anonymous and self-executing functions will not work.
```
var regularFunction = function(HttpService, RouterService) {
	// Without ES6 destructuring
	var injected = $injector.inject(doStuff);
	HttpService = injected.HttpService;
	RouterService = injected.RouterService;
};
```


### Step 3: Call The Function With No Arguments :)

Just call the function you configured. Consider the following:

```
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

### To Dos / Enhancements

(a) Create "call" method that will accept a function and perform the injection for you, without needing to "initialize" the DI.

(b) Create extendable class that provdides DI for all child classes?

(c) Explore advanced "tricks" like creating dummy functions that can be re-used to define a group of dependencies to inject.

*Would this work?*
```
// Represents a generic "Http" dependency group.
var httpDependencies = function(HttpService, RouterService){};

// ....Later on....
var someHttpRelatedFunction = function() {
	var { HttpService, RouterService } = $injector.inject(httpDependencies);
	
	// Do some stuff using the HttpService and RouterService....
};
```

*And this? Dynamic injection?*

```
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
```
var someFunction = function(HttpService) { /* do stuff */ };

// Later on...
var { HttpService } = $injector.inject(someFunction);
someFunction(HttpService);

var { HttpService } = $injector.inject(someOtherFunction);
someFunction(HttpService);

```
