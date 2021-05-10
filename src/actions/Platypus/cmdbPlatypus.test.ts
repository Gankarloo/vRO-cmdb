import * as WF from "../invokeWorkflow";
import { cmdbPlatypus } from "./cmdbPlatypus";

describe("Test cmdbPlatypus class", () => {
    let cmdb;
    let AssetName = "asset2";
    let AssetSize = 5;
    let json = JSON.stringify({transactionId: 8});
    
    beforeAll(() => {
        cmdb = new cmdbPlatypus(AssetName, AssetSize);
    })
    it("is an object", () => {
        expect(cmdbPlatypus instanceof Object).toBe(true);
    })
    it("is an object", () => {
        expect(cmdb instanceof Object).toBe(true);
    })
    it("has the right properties", () => {
        expect(Object.keys(cmdb)).toContain("recordName");
        expect(Object.keys(cmdb)).toContain("recordSize");
    })
    it("Adds", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:200, contentAsString:json});

        let regex = "^Platypus: added Name: " + AssetName + " with size: " + AssetSize + "$"
        let re = new RegExp(regex)
        expect(cmdb.Add()).toMatch(re);
    })
    it("Fails to Add", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:400, contentAsString:json});
        expect( function() { cmdb.Add(); }).toThrowError("Platypus: Failed to add: asset2, REST return code: 400");
    })
    it("Fails to Add - transaction", () => {
        spyOn(WF, "invokeWorkflow").and.returnValues({statusCode:200, contentAsString:json}, {statusCode:400, contentAsString:json});
        let regex = "^Platypus: Failed to commit transaction with ID: .*$"
        let re = new RegExp(regex);
        expect( function() { cmdb.Add(); }).toThrowError(re);
    })
    it("Fails to Add with unknown status code", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:500, contentAsString:json});
        expect( function() { cmdb.Add(); }).toThrowError("Platypus: Unknown return code from REST call: 500");
    })
    it("Fails to Add - transaction with unknown status code", () => {
        spyOn(WF, "invokeWorkflow").and.returnValues({statusCode:200, contentAsString:json},{statusCode:500, contentAsString:json});
        expect( function() { cmdb.Add(); }).toThrowError("Platypus: Unknown return code from REST call: 500");
    })
    it("Removes", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:200, contentAsString:json});
        expect(cmdb.Remove(AssetId)).toBe("Platypus: Removed ID: " + AssetId);
    })
    it("Fails to Remove", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:400, contentAsString:json});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Platypus: Failed to remove asset with ID: 45, REST return code: 400");
    })
    it("Fails to Remove - transaction", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValues({statusCode:200, contentAsString:json},{statusCode:400, contentAsString:json});
        let regex = "^Platypus: Failed to commit transaction with ID: .*$"
        let re = new RegExp(regex);
        expect( function() { cmdb.Remove(AssetId); }).toThrowError(re);
    })
    it("Fails to Remove with unknown status code", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:500, contentAsString:json});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Platypus: Unknown return code from REST call: 500");
    })
    it("Fails to Remove - transaction with unknown status code", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValues({statusCode:200, contentAsString:json},{statusCode:500, contentAsString:json});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Platypus: Unknown return code from REST call: 500");
    })
})
