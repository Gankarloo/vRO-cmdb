import { CMDBFactory } from "./CMDBFactory"
import { CmdbKangaroo } from "./Kangaroo/CmdbKangaroo";
import { CmdbWombat } from "./Wombat/cmdbWombat";
import { cmdbPlatypus } from "./Platypus/cmdbPlatypus";

describe("Test the Factory", () => {
    let factory;
    let recordName = "Asset2";
    let recordSize = 38;

    it("Get's an Kangaroo object", () => {
        let httpOK = {min: 200, max:200};
        let httpFail = {min: 400, max: 400};
        let name = "kangaroo";
        let factory = new CMDBFactory();
        let kangaroo = factory.getCMDB(name,recordName,recordSize);

        expect(kangaroo instanceof CmdbKangaroo).toBe(true);
        expect(Object(kangaroo)).toEqual(jasmine.objectContaining({
            recordName: recordName,
            recordSize: recordSize,
            httpStatusOK: httpOK,
            httpStatusFail: httpFail,
            Add: jasmine.any(Function),
            Remove: jasmine.any(Function),
        }));
    })
    it("Get's an Wombat object", () => {
        let httpOK = {min: 200, max:299};
        let httpFail = {min: 400, max: 499};
        let name = "wombat";
        let factory = new CMDBFactory();
        let wombat = factory.getCMDB(name,recordName,recordSize);

        expect(wombat instanceof CmdbWombat).toBe(true);
        expect(Object(wombat)).toEqual(jasmine.objectContaining({
            recordName: recordName,
            recordSize: recordSize,
            httpStatusOK: httpOK,
            httpStatusFail: httpFail,
            Add: jasmine.any(Function),
            Remove: jasmine.any(Function),
        }));
    })
    it("Get's an Platypus object", () => {
        let httpOK = {min: 200, max:200};
        let httpFail = {min: 400, max: 400};
        let name = "platypus";
        let factory = new CMDBFactory();
        let platypus = factory.getCMDB(name,recordName,recordSize);

        expect(platypus instanceof cmdbPlatypus).toBe(true);
        expect(Object(platypus)).toEqual(jasmine.objectContaining({
            recordName: recordName,
            recordSize: recordSize,
            httpStatusOK: httpOK,
            httpStatusFail: httpFail,
            Add: jasmine.any(Function),
            Remove: jasmine.any(Function),
        }));
    })
})