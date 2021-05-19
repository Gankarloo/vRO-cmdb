import * as WF from "../invokeWorkflow";
import { CmdbWombat } from "./cmdbWombat";

describe("Test cmdbWombat class", () => {
    let cmdb:CmdbWombat;
    const AssetName = "asset2";
    const AssetSize = 5;
    
    beforeAll(() => {
        cmdb = new CmdbWombat();
    })
    it("is an object", () => {
        expect(CmdbWombat instanceof Object).toBe(true);
    })
    it("is an object", () => {
        expect(cmdb instanceof Object).toBe(true);
    })
    xit("has the right properties", () => {
        expect(Object.keys(cmdb)).toContain("recordName");
        expect(Object.keys(cmdb)).toContain("recordSize");
    })
    it("Adds", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:200});

        //const regex = "^Wombat: added Name: " + AssetName + " with size: " + AssetSize + "$"
        const regex = `^Wombat: added Name: ${AssetName} with size: ${AssetSize}$`
        const re = new RegExp(regex)
        expect(cmdb.Add(AssetName, AssetSize)).toMatch(re);
    })
    it("Adds with statuscode in range", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:241});

        const regex = `^Wombat: added Name: ${AssetName} with size: ${AssetSize}$`
        const re = new RegExp(regex)
        expect(cmdb.Add(AssetName, AssetSize)).toMatch(re);
    })
    it("Fails to Add", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:400});
        expect( function() { cmdb.Add(AssetName, AssetSize); }).toThrowError("Wombat: Failed to add: asset2 REST return code: 400");
    })
    it("Fails to Add with statuscode in range", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:489});
        expect( function() { cmdb.Add(AssetName, AssetSize); }).toThrowError("Wombat: Failed to add: asset2 REST return code: 489");
    })
    it("Fails to Add with unknown status code", () => {
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:500});
        expect( function() { cmdb.Add(AssetName, AssetSize); }).toThrowError("Wombat: Unknown return code from REST call: 500");
    })
    it("Removes", () => {
        const AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:200});
        expect(cmdb.Remove(AssetId)).toBe(`Wombat: removed ID: ${AssetId}`);
    })
    it("Removes with statuscode in range", () => {
        const AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:281});
        expect(cmdb.Remove(AssetId)).toBe(`Wombat: removed ID: ${AssetId}`);
    })
    it("Fails to Remove", () => {
        const AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:400});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Wombat: Failed to remove asset with ID: 45");
    })
    it("Fails to Remove with statuscode in range", () => {
        const AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:402});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Wombat: Failed to remove asset with ID: 45");
    })
    it("Fails to Remove with unknown status code", () => {
        const AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:500});
        expect( function() { cmdb.Remove(AssetId); }).toThrowError("Wombat: Unknown return code from REST call: 500");
    })
})