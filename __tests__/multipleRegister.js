import { $injector, http, router } from "../src/_jestTestsConfig";

var mockService =  { get: "I'm a mock. " };
var debugService = { get: "I'm a debug service... " };
var serverService = { get: "I'm a server service. "};

$injector.register({
	MockService: mockService,
	DebugService: debugService,
	ServerService: serverService
});


class RegistrationTest{
	constructor(MockService, DebugService, ServerService){
		var { MockService, DebugService, ServerService } = $injector.inject(this.constructor);
		this.mock = MockService;
		this.debug = DebugService;
		this.server = ServerService;
	}
};

var testObj = new RegistrationTest();

//tests
describe('Multiple Dependency Registration Using .register()', () => {

  it('MockService Injected / Registered', () => {
    expect(testObj.mock).toBe(mockService);
  });

  it('DebugService Injected / Registered', () => {
    expect(testObj.debug).toBe(debugService);
  });

   it('ServerService Injected / Registered', () => {
    expect(testObj.server).toBe(serverService);
  });
});