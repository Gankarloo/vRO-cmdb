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
import { invokeWorkflow } from "../invokeWorkflow";

export class CmdbWombat extends CmdbBase {
    settings(){
        this.httpStatusOK = {min: 200, max:299};
        this.httpStatusFail = {min: 400, max:499};
    }
    public Add() {

        let wfId = 'A18080808080808080808080808080808080808001299080088268176866967b3'; // Worflow "Invoke a REST operation"
        let restContent = `<CreateRecord><Name>${this.recordName}</Name><Size>${this.recordSize}</Size></CreateRecord>`;
        let restAcceptHeaders = ['*/*'];
        let inputs:Record<string, any> = {
            content: restContent,
            acceptHeaders: restAcceptHeaders,
            defaultContentType: "application/xml",
        }
        let settings:Record<string, any> = {
            type: 'REST',                                       // Type of Workflow
            restHostID: '77b0e5ed-c4b2-41fa-9e98-5863948729e7', // REST Host "Wombat"
            restOperationID: '77b0e5ed-c4b2-41fa-9e98-5863948729e7:338709ee-cf55-47d3-9748-b091c4b00d6a', // REST Operation "Create Record"
        }
        let runWf = invokeWorkflow(wfId,inputs,settings);

        if(runWf['statusCode'] >= this.httpStatusOK.min && runWf['statusCode'] <= this.httpStatusOK.max) {
            return "Wombat: added Name: " + this.recordName + " with size: " + this.recordSize;
        } else if (runWf['statusCode'] >= this.httpStatusFail.min && runWf['statusCode'] <= this.httpStatusFail.max) {
            throw new Error("Wombat: Failed to add: " + this.recordName + " REST return code: " + runWf['statusCode']);
        } else {
            throw new Error("Wombat: Unknown return code from REST call: " + runWf['statusCode']);
        }
    }
    public Remove(recordId: number) {

        let wfId = 'A18080808080808080808080808080808080808001299080088268176866967b3'; // Worflow "Invoke a REST operation"
        let restAcceptHeaders = ['*/*'];
        let restContent = `<DeleteRecord><Id>${recordId}</Id></DeleteRecord>`;
        let inputs:Record<string, any> = {
            content: restContent,
            acceptHeaders: restAcceptHeaders,
            defaultContentType: "application/xml",
        }
        let settings:Record<string, any> = {
            type: 'REST',                                       // Type of Workflow
            restHostID: '77b0e5ed-c4b2-41fa-9e98-5863948729e7', // REST Host "Wombat"
            restOperationID: '77b0e5ed-c4b2-41fa-9e98-5863948729e7:6b678061-1b18-49af-8a05-3b06972bda57', // REST Operation "Delete Record"
        }
        let runWf = invokeWorkflow(wfId,inputs,settings);

        if(runWf['statusCode'] >= this.httpStatusOK.min && runWf['statusCode'] <= this.httpStatusOK.max) {
            return "Wombat: removed ID: " + recordId
        } else if (runWf['statusCode'] >= this.httpStatusFail.min && runWf['statusCode'] <= this.httpStatusFail.max) {
            throw new Error("Wombat: Failed to remove asset with ID: " + recordId);
        } else {
            throw new Error("Wombat: Unknown return code from REST call: " + runWf['statusCode']);
        }
    }
}
