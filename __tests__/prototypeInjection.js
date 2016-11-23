import { $injector, http, router } from "../src/_jestTestsConfig";


//test proto
var protoTest = function(HttpService, RouterService){
		var { HttpService, RouterService } = $injector.inject(this.constructor);
		this.http = HttpService;
		this.router = RouterService;
};

 var instance = new protoTest();

//tests
describe('Prototype Constructor Injection', () => {

  it('Has http service', () => {
    expect(instance.http).toBe(http);
  });

  it('Has router service', () => {
    expect(instance.router).toBe(router);
  });
});