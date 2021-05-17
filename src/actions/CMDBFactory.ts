/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
import { CmdbBase } from "./CmdbBase";
import { CmdbKangaroo } from "./Kangaroo/CmdbKangaroo";
import { cmdbPlatypus } from "./Platypus/cmdbPlatypus";
import { CmdbWombat } from "./Wombat/cmdbWombat";

export class CMDBFactory {
    /**
     * 
     * @param name 
     * @param recordName 
     * @param recordSize 
     * @returns 
     */
    public getCMDB(name: string, recordName: string, recordSize: number): CmdbBase {
        switch (name.toLowerCase()){
            case "kangaroo":{
                return new CmdbKangaroo(recordName, recordSize);
            }
            case "wombat":{
                return new CmdbWombat(recordName, recordSize);
            }
            case "platypus":{
                return new cmdbPlatypus(recordName, recordSize);
            }
            default:{
                throw new Error("Unknown CMDB: " + name );
            }
        }
        /* if (name.toLowerCase().indexOf("kangaroo") >= 0) {
            return new CmdbKangaroo(recordName, recordSize);
        } else if (name.toLowerCase().indexOf("wombat") >= 0) {
            return new CmdbWombat(recordName, recordSize);
        } else if (name.toLowerCase().indexOf("platypus") >= 0) {
            return new CmdbWombat(recordName, recordSize);
        } else {
            throw new Error("Unknown CMDB: " + name );
        } */
    }
}
