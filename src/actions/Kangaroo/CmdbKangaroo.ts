/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
import { CmdbBase } from "../CmdbBase";
//import * as config from '../../elements/resource/Kangaroo/cmdbKangaroo.json'

export class CmdbKangaroo extends CmdbBase {
    public Add() {
        this.recordId = this.getRandomInt()

        // build arguments
        //var conf;
        /* var resElemPath = "/cmdb/elements/resource";
        var resElems = Server.getResourceElementCategoryWithPath(resElemPath);
        
        resElems.resourceElements.forEach(function(entry){
            if(entry.name == 'cmdbKangaroo.json'){
                conf = entry.getContentAsMimeAttachment();
            }
        }) */

        var conf = {
            hostname: "kangaroo.local",
            port: 443
        }
        var restArgs = {
            Action : "add",
            Method : "Post",
            Body : this.recordName + ";" + this.recordSize,
        }
        var execute = this.REST(conf.hostname, conf.port, restArgs);
        var execute = true;
        if(execute == true) {
            return "Kangaroo: added Name: " + this.recordName + " with size: " + this.recordSize + " Returned ID: " + this.recordId;
        } else {
            throw("Kangaroo: Failed to add" + this.recordName);
        }
    }
    
    public Remove(recordId: number) {
        return "RestAPI removed ID: " + recordId
    }

}
