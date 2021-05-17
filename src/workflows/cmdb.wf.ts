/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
import { Workflow } from "vrotsc-annotations";
import { CMDBFactory } from "../actions/CMDBFactory";

@Workflow ({
    name: "CMDB-Add",
    path: "CGI/Handson",
})

export class CMDBAdd {
    /**
     * 
     * @param cmdbName 
     * @param assetName 
     * @param assetSize 
     */
    public AddCMDB(cmdbName: string, assetName: string, assetSize: number) {
        let factory = new CMDBFactory();
        let cmdb = factory.getCMDB(cmdbName, assetName, assetSize);
        System.log(cmdb.Add())
    }
}

@Workflow ({
    name: "CMDB-Remove",
    path: "CGI/Handson",
})
export class CMDBRemove {
    /**
     * 
     * @param cmdbName 
     * @param assetName 
     * @param assetSize 
     * @param assetId 
     */
    public RemoveCMDB(cmdbName: string, assetName: string, assetSize: number, assetId: number) {
        let factory = new CMDBFactory();
        let cmdb = factory.getCMDB(cmdbName, assetName, assetSize);
        System.log(cmdb.Remove(assetId));
    }
}
