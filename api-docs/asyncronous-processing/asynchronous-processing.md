<h3 className="h3-title" id="asynchronous-new-api-docs">Asynchronous Processing</h3> 

<p className="p-text">While getting an instant result is a huge advantage , there are use cases for separating the collection of documents from the backend business logic that processes the data extracted from these documents. One of the use cases is a batch document processing, when multiple documents submitted at the same time. Server should be notified when all the documents are processed and structured data is ready to be consumed. In such cases asynchronous processing is even faster then getting instant results document by document.</p>

<p className="p-text">This asynchronous flow is achieved with the use of <span style="color: #22CF6D"> Webhooks </span>.</p>

<p className="p-text"> Asynchronous Processing Workflow: </p>

1. <p className="p-text"> Document is submitted for processing with the async switch turned on.</p>
2. <p className="p-text">Veryfi processes the document</p>
3. <p className="p-text">Veryfi makes a request to the webhook URL</p>
4. <p className="p-text">The service that is serving your webhook makes a request to the Veryfi API to get the processed document's details and performs any required tasks</p>
