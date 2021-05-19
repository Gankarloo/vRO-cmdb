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

//export class cmdbPlatypus extends CmdbBase {
export class cmdbPlatypus implements ICmdb {
    recordName!:string;
    recordSize!:number;
    httpStatusOK:IstatusRange = {min: 200, max:200};
    httpStatusFail:IstatusRange = {min: 400, max:400};

    settings(){
        this.httpStatusOK = {min: 200, max:200};
        this.httpStatusFail = {min: 400, max:400};
    }
    public Add(recordName:string, recordSize:number): string {
        // save params on class object.
        this.recordName = recordName;
        this.recordSize = recordSize;

        const wfId = 'A18080808080808080808080808080808080808001299080088268176866967b3'; // Worflow "Invoke a REST operation"
        //#region Send transaction
        const restContent = JSON.stringify({
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
            restHostID: '9b23b340-6186-42e2-99cf-48f45cdc95dc', // REST Host "Platypus"
            restOperationID: '9b23b340-6186-42e2-99cf-48f45cdc95dc:be05131f-0754-4f11-a4b6-4968069368ed', // REST Operation "Create Record"
        }
        let runWf = invokeWorkflow(wfId,inputs,settings);
        //#endregion
        //#region Commit transaction
        let status = Number(runWf['statusCode']);
        const transactionIdJson: string = runWf['contentAsString'];
        const transactionIdObject = JSON.parse(transactionIdJson);
        const transactionId: number = transactionIdObject.transactionId;

        if(status >= this.httpStatusOK.min && status <= this.httpStatusOK.max) {
            // Commit the transaction
            // set the returned transactionId as the new content
            inputs.content = transactionIdJson;

            // change to the commit operation
            settings.restOperationID = '9b23b340-6186-42e2-99cf-48f45cdc95dc:f8601415-115e-4a39-88d3-4f0a393e1f23';

            runWf = invokeWorkflow(wfId,inputs,settings);
        } else if (status >= this.httpStatusFail.min && status <= this.httpStatusFail.max) {
            throw new Error(`Platypus: Failed to add: ${this.recordName}, REST return code: ${status}`);
        } else {
            throw new Error(`Platypus: Unknown return code from REST call: ${status}`);
        }
        //#endregion
        status = Number(runWf['statusCode']);
        if(status >= this.httpStatusOK.min && status <= this.httpStatusOK.max) {
            return `Platypus: added Name: ${this.recordName} with size: ${this.recordSize}`;
        } else if (status >= this.httpStatusFail.min && status <= this.httpStatusFail.max) {
            throw new Error(`Platypus: Failed to commit transaction with ID: ${transactionId}`);
        } else {
            throw new Error(`Platypus: Unknown return code from REST call: ${status}`);
        }
    }
    public Remove(recordId: number): string {
        const wfId = 'A18080808080808080808080808080808080808001299080088268176866967b3'; // Worflow "Invoke a REST operation"
        //#region Send transaction
        const restContent = JSON.stringify({
            id : recordId
        })
        const restAcceptHeaders = ['*/*'];
        const inputs:Record<string, any> = {
            content: restContent,
            acceptHeaders: restAcceptHeaders,
            defaultContentType: "application/json",
        }
        const settings:Record<string, any> = {
            type: 'REST',                                       // Type of Workflow
            restHostID: '9b23b340-6186-42e2-99cf-48f45cdc95dc', // REST Host "Platypus"
            restOperationID: '9b23b340-6186-42e2-99cf-48f45cdc95dc:e9b332b4-0d57-4fd1-81a0-3ab2dadd314f', // REST Operation "Delete Record"
        }
        let runWf = invokeWorkflow(wfId,inputs,settings);
        //#endregion
        //#region Commit transaction
        let status = Number(runWf['statusCode']);
        const transactionIdJson = runWf['contentAsString'];
        const transactionIdObject = JSON.parse(transactionIdJson);
        const transactionId: number = transactionIdObject.transactionId;

        if(status >= this.httpStatusOK.min && status <= this.httpStatusOK.max) {
            // Commit the transaction
            // set the returned transactionId as the new content
            inputs.content = transactionIdJson;

            // change to the commit operation
            settings.restOperationID = '9b23b340-6186-42e2-99cf-48f45cdc95dc:f8601415-115e-4a39-88d3-4f0a393e1f23';

            runWf = invokeWorkflow(wfId,inputs,settings);
        } else if (status >= this.httpStatusFail.min && status <= this.httpStatusFail.max) {
            throw new Error(`Platypus: Failed to remove asset with ID: ${recordId}, REST return code: ${status}`);
        } else {
            throw new Error(`Platypus: Unknown return code from REST call: ${status}`);
        }
        //#endregion
        status = Number(runWf['statusCode']);
        if(status >= this.httpStatusOK.min && status <= this.httpStatusOK.max) {
            return `Platypus: Removed ID: ${recordId}`;
        } else if (status >= this.httpStatusFail.min && status <= this.httpStatusFail.max) {
            throw new Error(`Platypus: Failed to commit transaction with ID: ${transactionId}`);
        } else {
            throw new Error(`Platypus: Unknown return code from REST call: ${status}`);
        }
    }
    
}
