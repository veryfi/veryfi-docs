<h3 className="h3-title" id="asynchronous-new-api-docs">Asynchronous Processing</h3>

<p className="p-text">Asynchronous processing is ideal when submitting multiple documents simultaneously for 
batch processing. The Documents API will send a notification to the <a href="/api/settings/keys/" style="color: #8B99EE">webhook configured</a> when the 
documents are processed and ready to be consumed.</p>

<p className="p-text">This asynchronous flow is achieved with the use of <a href="#set-webhooks-new-api-docs" style="color: #8B99EE"> Webhooks </a>.</p>

<h5 className="p-text"> Asynchronous Processing Workflow: </h5>

1. <p className="p-text"> Document is submitted for processing with the async switch turned on.</p>
2. <p className="p-text">Veryfi processes the document</p>
3. <p className="p-text">Veryfi makes a request to the webhook URL</p>
4. <p className="p-text">The service that is serving your webhook makes a request to the Veryfi API to get the processed document's details</p>
