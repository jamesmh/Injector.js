import { $injector, http, router } from "../src/_jestTestsConfig";


//Test ES6 class
class classTest {
	constructor(HttpService, RouterService){
		var { HttpService, RouterService } = $injector.inject(this.constructor);
		this.http = HttpService;
		this.router = RouterService;
	}
};

var instance = new classTest();

//tests
describe('ES6 Class Injection', () => {
    it('Has http service', () => {
    expect(instance.http).toBe(http);
  });

  it('Has router service', () => {
    expect(instance.router).toBe(router);
  });
});