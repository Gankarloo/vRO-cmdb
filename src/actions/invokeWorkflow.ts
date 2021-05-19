/*-
 * #%L
 * cmdb
 * %%
 * Copyright (C) 2021 TODO: Enter Organization name
 * %%
 * TODO: Define header text
 * #L%
 */
/**
 * 
 * @param WorkflowId 
 * @param WorkflowInputs 
 * @param WorkflowSettings 
 * @returns 
 */
export function invokeWorkflow(WorkflowId:string, WorkflowInputs:Record<string, any>,WorkflowSettings:Record<string,string>){
    const wf = Server.getWorkflowWithId(WorkflowId);
    const wfTokens = [];
    const wfInputs = new Properties();

    for(const input in WorkflowInputs){
        wfInputs.put(input, WorkflowInputs[input])
    }

    switch(WorkflowSettings['type']){
        case "REST": {
            const rHost = RESTHostManager.getHost(WorkflowSettings['restHostID']);
            const rOperation = rHost.getOperation(WorkflowSettings['restOperationID']);
            wfInputs.put('restOperation', rOperation);
            break;
        }
    }


    // execute Workflow
    const wfToken = wf.execute(wfInputs);
    wfTokens.push(wfToken);
    // Wait for workflow to complete
    System.getModule('com.vmware.library.vc.basic').waitForCompletionForBatchWorkflow(wfTokens);

    const wfOutputs = wfToken.getOutputParameters();
    return wfOutputs;
}
