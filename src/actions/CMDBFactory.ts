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

export class CMDBFactory {
    /**
     * 
     * @param name 
     * @param recordName 
     * @param recordSize 
     * @returns 
     */
    public getCMDB(name: string, recordName: string, recordSize: number): CmdbBase {
        if (name.toLowerCase().indexOf("kangaroo") >= 0) {
            return new CmdbKangaroo(recordName, recordSize);
        } else {
            throw new Error("Unknown CMDB: " + name );
        }
    }
}
