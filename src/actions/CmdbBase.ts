/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
export interface IstatusRange {
    min: number;
    max: number;
}

export interface ICmdb {
    recordName:string,
    recordSize:number,
    httpStatusOK:IstatusRange,
    httpStatusFail:IstatusRange,
    settings: () => void,
    Add: (recordName:string, recordSize:number) => string,
    Remove: (recordId:number) => string,
}
/* export class CmdbBase {
    recordName!:string;
    recordSize!:number;
    httpStatusOK!:IstatusRange;
    httpStatusFail!:IstatusRange;

    constructor(name:string, size:number) {
        this.recordName = name;
        this.recordSize = size;
        this.settings();
    }

    settings(){};

    Add() {
        return "Stub...";
    }

    Remove(recordId: number):string {
        return "Stub...";
    } 
} */
