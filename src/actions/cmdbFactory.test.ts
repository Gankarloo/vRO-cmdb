import { CMDBFactory } from "./CMDBFactory"
import { CmdbKangaroo } from "./Kangaroo/CmdbKangaroo";
import { CmdbWombat } from "./Wombat/cmdbWombat";
import { cmdbPlatypus } from "./Platypus/cmdbPlatypus";

describe("Test the Factory", () => {
    let factory;
    const recordName = "Asset2";
    const recordSize = 38;

    it("Get's an Kangaroo object", () => {
        const httpOK = {min: 200, max:200};
        const httpFail = {min: 400, max: 400};
        const name = "kangaroo";
        const factory = new CMDBFactory();
        const kangaroo = factory.getCMDB(name);

        expect(kangaroo instanceof CmdbKangaroo).toBe(true);
        expect(Object(kangaroo)).toEqual(jasmine.objectContaining({
            //recordName: undefined,
            //recordSize: undefined,
            httpStatusOK: httpOK,
            httpStatusFail: httpFail,
            Add: jasmine.any(Function),
            Remove: jasmine.any(Function),
        }));
    })
    it("Get's an Wombat object", () => {
        const httpOK = {min: 200, max:299};
        const httpFail = {min: 400, max: 499};
        const name = "wombat";
        const factory = new CMDBFactory();
        const wombat = factory.getCMDB(name);

        expect(wombat instanceof CmdbWombat).toBe(true);
        expect(Object(wombat)).toEqual(jasmine.objectContaining({
            //recordName: recordName,
            //recordSize: recordSize,
            httpStatusOK: httpOK,
            httpStatusFail: httpFail,
            Add: jasmine.any(Function),
            Remove: jasmine.any(Function),
        }));
    })
    it("Get's an Platypus object", () => {
        const httpOK = {min: 200, max:200};
        const httpFail = {min: 400, max: 400};
        const name = "platypus";
        const factory = new CMDBFactory();
        const platypus = factory.getCMDB(name);

        expect(platypus instanceof cmdbPlatypus).toBe(true);
        expect(Object(platypus)).toEqual(jasmine.objectContaining({
            //recordName: recordName,
            //recordSize: recordSize,
            httpStatusOK: httpOK,
            httpStatusFail: httpFail,
            Add: jasmine.any(Function),
            Remove: jasmine.any(Function),
        }));
    })
})