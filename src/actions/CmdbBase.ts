/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
interface statusRange {
    min: number;
    max: number;
}
export class CmdbBase {
    recordName:string;
    recordSize:number;
    httpStatusOK!:statusRange;
    httpStatusFail!:statusRange;

    constructor(name:string, size:number) {
        this.recordName = name;
        this.recordSize = size;
        this.settings();
    }

    settings(){};

    /**
     * 
     * @returns 
     */
    Add() {
        return "Stub...";
    }

    /**
     * 
     * @param recordId 
     * @returns 
     */
    Remove(recordId: number):string {
        return "Stub...";
    } 

    /**
     * 
     * @returns 
     */
    /* getRandomInt(): number {
        let min = 1;
        let max = 1000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } */
}
