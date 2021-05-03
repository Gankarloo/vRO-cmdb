import { CmdbBase } from "./CmdbBase"

describe("Test Base class CmdbBase", () => {
    var cmdb;
    var AssetName = "asset1";
    var AssetSize = 10;

    beforeAll(() => {
        cmdb = new CmdbBase("asset1",10)
    })
    it("is an object", () => {
        expect(CmdbBase instanceof Object).toBe(true);
    })
    it("is an object", () => {
        expect(cmdb instanceof Object).toBe(true);
    })
    it("has the right properties", () => {
        expect(Object.keys(cmdb)).toContain("recordName");
        expect(Object.keys(cmdb)).toContain("recordSize");
    })
    it("Adds", () => {
        var regex = "^RestAPI: added Name: " + AssetName + " with size: " + AssetSize + " Returned ID: \\d{1,4}$"
        var re = new RegExp(regex)
        expect(cmdb.Add()).toMatch(re);
    })
    it("has now property recordID", () => {
        expect(Object.keys(cmdb)).toContain("recordId");
    })
    it("Removes", () => {
        expect(cmdb.Remove(10)).toBe("RestAPI removed ID: 10");
    })
})