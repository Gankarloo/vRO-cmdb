/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
export class CmdbBase {
    recordName:string;
    recordSize:number;
    recordId:number;
    httpStatusOK:number;
    httpStatusFail:number;

    constructor(name:string, size:number) {
        this.recordName = name;
        this.recordSize = size;
        this.settings();
    }

    settings(){};

    Add() {
        //System.log("RestAPI adding Name: " + this.recordName + "with size: " + this.recordSize) 
        //this.recordId = this.getRandomInt()
        //return "RestAPI: added Name: " + this.recordName + " with size: " + this.recordSize + " Returned ID: " + this.recordId
        return "Stub...";
    }

    Remove(recordId: number):string {
        //return "RestAPI removed ID: " + recordId
        return "Stub...";
    } 

    getRandomInt(): number {
        let min = 1;
        let max = 1000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /* REST(restobj:RESTobject) {
        // Rest client call here...
        // will be mocked.
        System.log("REST: Connecting to URL: " + restobj.URL + " Method: " + restobj.Method);
        System.log("REST: Body: \n" + restobj.Body )
        //var result = restobj.theRestCall(restobj);
        var result = theRestCall(restobj);
        if(result.status == restobj.ResponseOK){
            System.log("REST: HTTP Status: " + result.Status);
            System.log("REST: Call successful");
            return true
        } else if(result.status == restobj.ResponseFail) {
            System.log("REST: HTTP Status: " + result.Status);
            System.log("REST: Call failed...");
            return false
        } else {
            System.log("REST: HTTP Status: " + result.Status);
            System.log("REST: Unexpected return status. Call failed...");
            return false
        }
    } */
}
