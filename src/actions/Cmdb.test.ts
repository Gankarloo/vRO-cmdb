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
    it("Generates a random number", () => {
        let regex = "\\d{1,4}"
        let re = new RegExp(regex);
        expect(cmdb.getRandomInt()).toMatch(re);
    })
})