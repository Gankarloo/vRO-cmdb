/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
import { CmdbKangaroo } from "./Kangaroo/CmdbKangaroo";
import { cmdbPlatypus } from "./Platypus/cmdbPlatypus";
import { CmdbWombat } from "./Wombat/cmdbWombat";

export class CMDBFactory {
    /**
     * 
     * @param name 
     * @returns 
     */
    public getCMDB(name: string) {
        switch (name.toLowerCase()){
            case "kangaroo":{
                return new CmdbKangaroo();
            }
            case "wombat":{
                return new CmdbWombat();
            }
            case "platypus":{
                return new cmdbPlatypus();
            }
            default:{
                throw new Error("Unknown CMDB: " + name );
            }
        }
    }
}
