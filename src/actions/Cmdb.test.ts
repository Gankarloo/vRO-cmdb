import { CmdbBase } from "./CmdbBase"

describe("Test Base class CmdbBase", () => {
    let cmdb;

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
})