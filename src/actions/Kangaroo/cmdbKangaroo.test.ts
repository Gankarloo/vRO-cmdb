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
        var regex = "^Kangaroo: added Name: " + AssetName + " with size: " + AssetSize + " Returned ID: \\d{1,4}$"
        var re = new RegExp(regex)
        expect(kangaroo.Add()).toMatch(re);
    })
    it("has now property recordID", () => {
        expect(Object.keys(kangaroo)).toContain("recordId");
    })
    it("Removes", () => {
        var AssetId = 45;
        expect(kangaroo.Remove(AssetId)).toBe("RestAPI removed ID: " + AssetId);
    })
})
