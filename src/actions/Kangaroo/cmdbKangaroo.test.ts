//import * as RESTutils from "../rest";
import * as WF from "../invokeWorkflow";
import { CmdbKangaroo } from "./CmdbKangaroo";


describe("Test Kangaroo class", () => {
    var kangaroo;
    var AssetName = "asset2";
    var AssetSize = 5;
    
    beforeAll(() => {
        kangaroo = new CmdbKangaroo(AssetName, AssetSize);
    })
    it("is an object", () => {
        expect(CmdbKangaroo instanceof Object).toBe(true);
    })
    it("is an object", () => {
        expect(kangaroo instanceof Object).toBe(true);
    })
    it("has the right properties", () => {
        expect(Object.keys(kangaroo)).toContain("recordName");
        expect(Object.keys(kangaroo)).toContain("recordSize");
    })
    it("Adds", () => {
        //spyOn(RESTutils, "theRestCall").and.returnValue({status:200});
        //spyOn(RESTutils, "invokeRest").and.returnValue({statusCode:200});
        //spyOn(kangaroo, "getOutputParameters").and.returnValue("Hello World, Adam!")
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:200});

        var regex = "^Kangaroo: added Name: " + AssetName + " with size: " + AssetSize + " Returned ID: \\d{1,4}$"
        var re = new RegExp(regex)
        expect(kangaroo.Add()).toMatch(re);
    })
    it("has now property recordID", () => {
        expect(Object.keys(kangaroo)).toContain("recordId");
    })
    it("Removes", () => {
        var AssetId = 45;
        //spyOn(RESTutils, "theRestCall").and.returnValue({status:200});
        //spyOn(kangaroo, "REST").and.returnValue(true);
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:200});
        expect(kangaroo.Remove(AssetId)).toBe("Kangaroo: removed ID: " + AssetId);
    })
    it("Fails to Add", () => {
        //spyOn(RESTutils, "theRestCall").and.returnValue({status:400});
        //spyOn(kangaroo, "REST").and.returnValue(false);
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:400});
        expect( function() { kangaroo.Add(); }).toThrowError("Kangaroo: Failed to add: asset2 REST return code: 400");
    })
    it("Fails to Add with unknown status code", () => {
        //spyOn(RESTutils, "theRestCall").and.returnValue({status:400});
        //spyOn(kangaroo, "REST").and.returnValue(false);
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:500});
        expect( function() { kangaroo.Add(); }).toThrowError("Kangaroo: Unknown return code from REST call: 500");
    })
    it("Fails to Remove", () => {
        var AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:400});
        expect( function() { kangaroo.Remove(AssetId); }).toThrowError("Kangaroo: Failed to remove asset with ID: 45");
    })
    it("Fails to Remove with unknown status code", () => {
        var AssetId = 45;
        spyOn(WF, "invokeWorkflow").and.returnValue({statusCode:500});
        expect( function() { kangaroo.Remove(AssetId); }).toThrowError("Kangaroo: Unknown return code from REST call: 500");
    })
})