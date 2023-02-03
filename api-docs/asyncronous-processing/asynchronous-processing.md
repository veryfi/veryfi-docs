### Asynchronous Processing 

While Veryfi's API is capable of extracting structured data from unstructured documents in just seconds, there are use cases for separating the collection of documents from the backend business logic that processes the data extracted from these documents.

This asynchronous flow is achieved with the use of <span style="color: #22CF6D"> Webhooks </span>.

Asynchronous Processing Workflow:

1. Document is submitted for processing with the async switch turned on.
2. Veryfi processes the document
3. Veryfi makes a request to the webhook URL
4. The service that is serving your webhook makes a request to the Veryfi API to get the processed document's details and performs any required tasks

