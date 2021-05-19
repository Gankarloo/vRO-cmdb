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
//export class CmdbKangaroo extends CmdbBase {
export class CmdbKangaroo implements ICmdb {
    recordName!:string;
    recordSize!:number;
    httpStatusOK:IstatusRange = {min: 200, max: 200};
    httpStatusFail:IstatusRange = {min: 400, max: 400};

    settings(): void {
        this.httpStatusOK = {min: 200, max: 200};
        this.httpStatusFail = {min: 400, max: 400};
    }

    /**
     * 
     * @returns 
     */
    public Add(recordName:string, recordSize:number): string {
        // save params on class object.
        this.recordName = recordName;
        this.recordSize = recordSize;

        const wfId = 'A18080808080808080808080808080808080808001299080088268176866967b3'; // Worflow "Invoke a REST operation"
        const restContent = JSON.stringify({              // html body
            name : this.recordName,
            size : this.recordSize
        })
        const restAcceptHeaders = ['*/*'];
        const inputs:Record<string, any> = {
            content: restContent,
            acceptHeaders: restAcceptHeaders,
            defaultContentType: "application/json",
        }
        const settings:Record<string, any> = {
            type: 'REST',                                       // Type of Workflow
            restHostID: '45767ca5-a644-4a66-8f78-d6dcc257aa07', // REST Host "kangaroo"
            restOperationID: '45767ca5-a644-4a66-8f78-d6dcc257aa07:698d3086-5442-4b7b-9b3c-14940d716d98', // REST Operation "Create Record"
        }
        const runWf = invokeWorkflow(wfId,inputs,settings);

        if(runWf['statusCode'] >= this.httpStatusOK.min && runWf['statusCode'] <= this.httpStatusOK.max) {
            return `Kangaroo: added Name: ${this.recordName} with size: ${this.recordSize}`;
        } else if (runWf['statusCode'] >= this.httpStatusFail.min && runWf['statusCode'] <= this.httpStatusFail.max) {
            throw new Error(`Kangaroo: Failed to add: ${this.recordName} REST return code: ${String(runWf['statusCode'])}`);
        } else {
            throw new Error(`Kangaroo: Unknown return code from REST call: ${String(runWf['statusCode'])}`);
        }
    }
    /**
     * 
     * @param recordId 
     * @returns 
     */
    public Remove(recordId: number): string {

        const wfId = 'A18080808080808080808080808080808080808001299080088268176866967b3'; // Worflow "Invoke a REST operation"
        const restAcceptHeaders = ['*/*'];
        const inputs:Record<string, any> = {
            param_0: recordId,                              // First and only parameter is the ID
            acceptHeaders: restAcceptHeaders,
        }
        const settings:Record<string, any> = {
            type: 'REST',                                       // Type of Workflow
            restHostID: '45767ca5-a644-4a66-8f78-d6dcc257aa07', // REST Host "kangaroo"
            restOperationID: '45767ca5-a644-4a66-8f78-d6dcc257aa07:786c338f-40ed-45a8-b6b3-348ecd37497e', // REST Operation "Delete Record"
        }
        const runWf = invokeWorkflow(wfId,inputs,settings);
        

        if(runWf['statusCode'] >= this.httpStatusOK.min && runWf['statusCode'] <= this.httpStatusOK.max) {
            return `Kangaroo: removed ID: ${recordId}`
        } else if (runWf['statusCode'] >= this.httpStatusFail.min && runWf['statusCode'] <= this.httpStatusFail.max) {
            throw new Error(`Kangaroo: Failed to remove asset with ID: ${recordId}`);
        } else {
            throw new Error(`Kangaroo: Unknown return code from REST call: ${String(runWf['statusCode'])}`);
        }
    }

}
