import * as WF from "../invokeWorkflow";
import { CmdbWombat } from "./cmdbWombat";

describe("Test cmdbWombat class", () => {
    let cmdb:CmdbWombat;
    let AssetName = "asset2";
    let AssetSize = 5;
    
    beforeAll(() => {
        cmdb = new CmdbWombat(AssetName, AssetSize);
    })
    it("is an object", () => {
        expect(CmdbWombat instanceof Object).toBe(true);
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

        let regex = "^Wombat: added Name: " + AssetName + " with size: " + AssetSize + "$"
        let re = new RegExp(regex)
        expect(cmdb.Add()).toMatch(re);
    })
    it("Adds with statuscode in range", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:241});

        let regex = "^Wombat: added Name: " + AssetName + " with size: " + AssetSize + "$"
        let re = new RegExp(regex)
        expect(cmdb.Add()).toMatch(re);
    })
    it("Fails to Add", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:400});
        expect( function() { cmdb.Add(); }).toThrowError("Wombat: Failed to add: asset2 REST return code: 400");
    })
    it("Fails to Add with statuscode in range", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:489});
        expect( function() { cmdb.Add(); }).toThrowError("Wombat: Failed to add: asset2 REST return code: 489");
    })
    it("Fails to Add with unknown status code", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:500});
        expect( function() { cmdb.Add(); }).toThrowError("Wombat: Unknown return code from REST call: 500");
    })
    it("Removes", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:200});
        expect(cmdb.Remove(AssetId)).toBe("Wombat: removed ID: " + AssetId);
    })
    it("Removes with statuscode in range", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:281});
        expect(cmdb.Remove(AssetId)).toBe("Wombat: removed ID: " + AssetId);
    })
    it("Fails to Remove", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:400});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Wombat: Failed to remove asset with ID: 45");
    })
    it("Fails to Remove with statuscode in range", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:402});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Wombat: Failed to remove asset with ID: 45");
    })
    it("Fails to Remove with unknown status code", () => {
        let AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:500});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Wombat: Unknown return code from REST call: 500");
    })
})