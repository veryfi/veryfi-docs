<h3 className="h3-title">Document Processing</h3>

<p className="p-text bold-text">POST requests are used to submit document for processing. However, 
there are a few important request configurations to be considered depending 
on the content and response type.</p>


<h5 className="h5-title">Processing document depending on the content type:</h5>

---
<span style="color: #22CF6D; font-size: 16px;">Multipart/form-data upload</span>

<p className="p-text">Submit a request to process a multipart/form-data file upload.</p>

---
<span style="color: #22CF6D; font-size: 16px;">Base64 encoded file upload</span>

<p className="p-text">Submit a request to process a Base64 encoded document.</p>

---
<span style="color: #22CF6D; font-size: 16px;">Specify a file URL</span>

<p className="p-text">Submit a request to process a file using a URL.</p>


<h5 className="h5-title" style="margin-top: 80px;">Retrieving extracted data depending on the response types:</h5>

---
<span style="color: #22CF6D; font-size: 16px;">Syncronous response</span>
<p className="p-text">By default all  processing requests are synchronous. The data is extracted in real-time and the 
results are included in the response to the processing API request.</p>

---
<span style="color: #22CF6D; font-size: 16px;">Asynchronous response</span>
<p className="p-text">Asynchronous processing requests receive an immediate response, however, 
the data extraction runs in a background process. Once data extraction completes, Veryfi makes 
a request to your configured webhook URL.</p>
