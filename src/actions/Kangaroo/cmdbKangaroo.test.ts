//import * as RESTutils from "../rest";
import * as WF from "../invokeWorkflow";
import { CmdbKangaroo } from "./CmdbKangaroo";


describe("Test Kangaroo class", () => {
    let cmdb;
    let AssetName = "asset2";
    let AssetSize = 5;
    
    beforeAll(() => {
        cmdb = new CmdbKangaroo(AssetName, AssetSize);
    })
    it("is an object", () => {
        expect(CmdbKangaroo instanceof Object).toBe(true);
    })
    it("is an object", () => {
        expect(cmdb instanceof Object).toBe(true);
    })
    it("has the right properties", () => {
        expect(Object.keys(cmdb)).toContain("recordName");
        expect(Object.keys(cmdb)).toContain("recordSize");
    })
    it("Adds", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:200});

        let regex = "^Kangaroo: added Name: " + AssetName + " with size: " + AssetSize + "$"
        let re = new RegExp(regex)
        expect(cmdb.Add()).toMatch(re);
    })
    it("Fails to Add", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:400});
        expect( function() { cmdb.Add(); }).toThrowError("Kangaroo: Failed to add: asset2 REST return code: 400");
    })
    it("Fails to Add with unknown status code", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:500});
        expect( function() { cmdb.Add(); }).toThrowError("Kangaroo: Unknown return code from REST call: 500");
    })
    xit("has now property recordID", () => {
        expect(Object.keys(cmdb)).toContain("recordId");
    })
    it("Removes", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:200});
        expect(cmdb.Remove(AssetId)).toBe("Kangaroo: removed ID: " + AssetId);
    })
    it("Fails to Remove", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:400});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Kangaroo: Failed to remove asset with ID: 45");
    })
    it("Fails to Remove with unknown status code", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:500});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Kangaroo: Unknown return code from REST call: 500");
    })
})

describe("Try to mock vRO specific classes", () => {
    xit("Test1", () => {
        /* class Server {
            public getWorkflowWithId(var1: any) {
                return true;
            }
        }
        class RESTHostManager {
            public getHost(var1: any) {
                return new RESTHost;
            }
        }
        class RESTHost {
            public getOperation(var1: any) {
                return new RESTOperation;
            }
        }
        class RESTOperation {
            public put(var1: any, var2: any) {
            }
        }
        class WorkflowToken {
            public getOutputParameters() {
                return true;
            }
        }
        class WorkFlow {
            public execute(var1: any) {
                return new WorkflowToken;
            }
        } */
        //let mockRESTHostManager = jasmine.createSpyObj("RESTHostManager", ["getHost"]);
        //mockRESTHostManager.and.returnvalue(true);
        //spyOn(mockRESTHostManager, "getHost").and.returnValue(true);

        //let mockServer = jasmine.createSpyObj("Server", "getWorkflowWithId");
        //let mockServer = jasmine.createSpyObj("Server", {
        //    'getWorkflowWithId': true,
        //})
        //let mockRESTHostManager = jasmine.createSpyObj("RESTHostManager", {
        //    'getHost': {
        //        getOperation: function() {
        //            return true;
        //        }
        //    },
        //});
        //let mockgetWorkflowWithId = jasmine.createSpy("Server");
        //let mockgetHost = jasmine.createSpy("getHost");
        //let mockgetModule = jasmine.createSpy("getModule");
        //let mockexecute = jasmine.createSpy("execute");
        //let mockgetOutpurParameters = jasmine.createSpy("getOutPutParameters");
        //mockgetWorkflowWithId.and.returnValue(true);
        //mockgetHost.and.returnValue(true);
        //mockgetModule.and.returnValue(true);
        //mockexecute.and.returnValue(true);
        //mockgetOutpurParameters.and.returnValue({statusCode: 200});

        let AssetName = "asset2";
        let AssetSize = 5;
        let cmdb = new CmdbKangaroo(AssetName, AssetSize);

        let regex = "^Kangaroo: added Name: " + AssetName + " with size: " + AssetSize + " Returned ID: \\d{1,4}$"
        let re = new RegExp(regex)
        expect(cmdb.Add()).toMatch(re);
    })
})