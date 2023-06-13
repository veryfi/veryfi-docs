<h3 className="h3-title" id="api-docs-document-processing">Document Processing</h3>

<p className="p-text bold-text">A user can submit documents of different content types for processing. Below you will find three different methods to submit a document for processing:</p>


<h5 className="h5-title">Process a document by content type:</h5>

---
<a className="p-text-green-link" href="#form-data-upload-new-api-docs" style="color: #8B99EE; font-size: 16px;">Method 1: Multipart/form-data upload</a>

<p className="p-text">Submit a request to process a multipart/form-data file upload.</p>

---
<a className="p-text-green-link" href="#base-64-new-api-docs" style="color: #8B99EE; font-size: 16px;">Method 2: Base64 encoded file upload</a>

<p className="p-text">Submit a request to process a Base64 encoded document.</p>

---
<a className="p-text-green-link" href="#using-a-url-new-api-docs" style="color: #8B99EE; font-size: 16px;">Method 3: Specify a file URL</a>

<p className="p-text">Submit a request to process a file using a URL.</p>


<h5 className="h5-title" style="margin-top: 80px;">Retrieving extracted data by response types:</h5>

---
<a className="p-text-green-link" href="/api/docs/api-docs-process-asynchronous/#synchronous-response-new-api-docs" style="color: #8B99EE; font-size: 16px;">Synchronous response</a>
<p className="p-text">All processing requests are synchronous by default. Therefore, a user that submits a POST request for document processing will receive the extracted data in the API response.</p>

---
<a className="p-text-green-link" href="/api/docs/api-docs-process-asynchronous/#asynchronous-new-api-docs" style="color: #8B99EE; font-size: 16px;">Asynchronous response</a>
<p className="p-text">Asynchronous processing requests receive an immediate response. However, the data extraction runs in a background process. Once data extraction completes, 
Veryfi makes a request to your configured webhook URL. The webhook URL is configurable in the <a href='/api/settings/keys/' style="color: #8B99EE;">Keys</a> section of <a href='/api/settings/keys/' style="color: #8B99EE;">Settings</a>.
</p>
