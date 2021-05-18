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
        let cmdb = factory.getCMDB(cmdbName);
        System.log(cmdb.Add(assetName, assetSize));
    }
}

@Workflow ({
    name: "CMDB-Remove",
    path: "CGI/Handson",
    presentation: "whattt",
})
export class CMDBRemove {
    /**
     * 
     * @param cmdbName 
     * @param assetId 
     */
    public RemoveCMDB(cmdbName: string, assetId: number) {
        let factory = new CMDBFactory();
        let cmdb = factory.getCMDB(cmdbName);
        System.log(cmdb.Remove(assetId));
    }
}
