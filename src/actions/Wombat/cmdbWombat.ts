/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
import { ICmdb, IstatusRange } from "../CmdbBase";
import { invokeWorkflow } from "../invokeWorkflow";

//export class CmdbWombat extends CmdbBase {
export class CmdbWombat implements ICmdb {
    recordName!:string;
    recordSize!:number;
    httpStatusOK:IstatusRange = {min: 200, max:299};
    httpStatusFail:IstatusRange = {min: 400, max:499};

    settings(){
        this.httpStatusOK = {min: 200, max:299};
        this.httpStatusFail = {min: 400, max:499};
    }
    public Add(recordName:string, recordSize:number): string {
        // save params on class object.
        this.recordName = recordName;
        this.recordSize = recordSize;

        const wfId = 'A18080808080808080808080808080808080808001299080088268176866967b3'; // Worflow "Invoke a REST operation"
        const restContent = `<CreateRecord><Name>${this.recordName}</Name><Size>${this.recordSize}</Size></CreateRecord>`;
        const restAcceptHeaders = ['*/*'];
        const inputs:Record<string, any> = {
            content: restContent,
            acceptHeaders: restAcceptHeaders,
            defaultContentType: "application/xml",
        }
        const settings:Record<string, any> = {
            type: 'REST',                                       // Type of Workflow
            restHostID: '77b0e5ed-c4b2-41fa-9e98-5863948729e7', // REST Host "Wombat"
            restOperationID: '77b0e5ed-c4b2-41fa-9e98-5863948729e7:338709ee-cf55-47d3-9748-b091c4b00d6a', // REST Operation "Create Record"
        }
        const runWf = invokeWorkflow(wfId,inputs,settings);

        if(runWf['statusCode'] >= this.httpStatusOK.min && runWf['statusCode'] <= this.httpStatusOK.max) {
            return `Wombat: added Name: ${this.recordName} with size: ${this.recordSize}`;
        } else if (runWf['statusCode'] >= this.httpStatusFail.min && runWf['statusCode'] <= this.httpStatusFail.max) {
            throw new Error(`Wombat: Failed to add: ${this.recordName} REST return code: ${Number(runWf['statusCode'])}`);
        } else {
            throw new Error(`Wombat: Unknown return code from REST call: ${Number(runWf['statusCode'])}`);
        }
    }
    public Remove(recordId: number): string {

        const wfId = 'A18080808080808080808080808080808080808001299080088268176866967b3'; // Worflow "Invoke a REST operation"
        const restAcceptHeaders = ['*/*'];
        const restContent = `<DeleteRecord><Id>${recordId}</Id></DeleteRecord>`;
        const inputs:Record<string, any> = {
            content: restContent,
            acceptHeaders: restAcceptHeaders,
            defaultContentType: "application/xml",
        }
        const settings:Record<string, any> = {
            type: 'REST',                                       // Type of Workflow
            restHostID: '77b0e5ed-c4b2-41fa-9e98-5863948729e7', // REST Host "Wombat"
            restOperationID: '77b0e5ed-c4b2-41fa-9e98-5863948729e7:6b678061-1b18-49af-8a05-3b06972bda57', // REST Operation "Delete Record"
        }
        const runWf = invokeWorkflow(wfId,inputs,settings);

        if(runWf['statusCode'] >= this.httpStatusOK.min && runWf['statusCode'] <= this.httpStatusOK.max) {
            return `Wombat: removed ID: ${recordId}`;
        } else if (runWf['statusCode'] >= this.httpStatusFail.min && runWf['statusCode'] <= this.httpStatusFail.max) {
            throw new Error(`Wombat: Failed to remove asset with ID: ${recordId}`);
        } else {
            throw new Error(`Wombat: Unknown return code from REST call: ${Number(runWf['statusCode'])}`);
        }
    }
}
