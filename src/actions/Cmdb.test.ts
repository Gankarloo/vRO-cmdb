import { CmdbBase } from "./CmdbBase"

describe("Test Base class CmdbBase", () => {
    var cmdb;
    beforeAll(() => {
        cmdb = new CmdbBase("asset1",10)
    })
    it("Adds", () => {
        //expect(new CmdbBase("asset1",10).Add()).toMatch(/^RestAPI added Name: asset1 with size: 10 Returned ID: \d{1,4}$/);
        expect(cmdb.Add()).toMatch(/^RestAPI added Name: asset1 with size: 10 Returned ID: \d{1,4}$/);
    })
    it("Removes", () => {
        //expect(new CmdbBase("asset1",10).Remove(10)).toBe("RestAPI removed ID: 10");
        expect(cmdb.Remove(10)).toBe("RestAPI removed ID: 10");
    })
})