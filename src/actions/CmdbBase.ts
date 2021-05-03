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

    constructor(name:string, size:number) {
        this.recordName = name;
        this.recordSize = size;
    }

    Add():string {
/*         System.log("RestAPI adding Name: " + this.recordName + "with size: " + this.recordSize) */
        this.recordId = this.getRandomInt()
        return "RestAPI: added Name: " + this.recordName + " with size: " + this.recordSize + " Returned ID: " + this.recordId
    }

    Remove(recordId: number):string {
        return "RestAPI removed ID: " + recordId
    }

    getRandomInt(): number {
        let min = 1;
        let max = 1000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    REST(hostname: string, port: number, args) {
        // Rest client call here...
        // will be mocked.
        System.log("REST: Connecting to " + hostname + ":" + port);
        System.log("Action: " + args['Action'] + " Method: " + args['Method'])
        return true
    }
}
