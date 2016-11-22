# Injector.js
Vanilla JS dependency injection.

I've looked around for a simple library that provides dependency injection for vanilla JavaScript. The libraries I've seen are not "just simple" enough though, in terms of ease of use / configuration. I want to be able to call a function (normally a constructor) *without supplying anything*... and have the dependancies injected. So....I haven't found anything like that. So I made one.  

## Installation

Include /dist/injector.js. See /src/index.js if you want to import ES6 module into your project.

## Step 1:Register Dependencies

The first thing you need to do is provide the "injector" with all the dependencies you have. Use .register(), which can be chained. The first parameter is the "name" or key of the dependency, and the second is the actual object.

```
var http  = { get: "I'm a http service." };
var router = { routes: "I'm a router."};

$injector.register("HttpService", http)
	.register("RouterService", router);
```

Right now, the object you inject is used statically (will add option to have new instances injected eventually...).

## Step 2: Enable Function For Injection

Each function that you want to have injection enabled for must be initialized  on it's own. This is where I didn't like how other libraries complicated this step. For example, here's how you would enable injection for an ES6 class constructor:

```
class InjectMe {
	constructor(HttpService, RouterService){
    // Using ES6 deconstruction...
		var { HttpService, RouterService } = $injector.inject(this.constructor);
		this.http = HttpService;
		this.router = RouterService;
	}
};
```

The .inject() method accepts the function that you are inside of and want to enable injection for. The argument names of our function / method have to match one of the "names" or keys you provided to the .register() method. The .inject() method will return an object having all the dependancies. In the example above, ES6 deconstruction is used - which makes this process really easy. You could also do the following:

```
class InjectMe {
	constructor(HttpService, RouterService){
    // Using ES6 deconstruction...
		var dependancies = $injector.inject(this.constructor);
		this.http = dependancies.HttpService;
		this.router = dependancies.RouterService;
	}
};
```

You can enable ES6 constructors and prototype constructors. SUpply "this.constructor" to the .inject() method for these cases. You can also use regular functions or methods.
