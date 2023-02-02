### Method 3: Process file using URL

<span style="color: #8B99EE;font-size: 20px">POST</span><span style="color: #7D819E;font-size: 20px"> /{enviroment_url}/api/v8/partner/documents/</span>

Submit a request to process a file using a URL.

##### Parameters

---
<span className="parameter-text">file_url</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span> (if file_url isn't specified)   <span className="parameter-info">String</span> 

Publicly accessible URL to a file, e.g. "https://cdn.example.com/receipt.jpg"

---

<span className="parameter-text">file_data</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span>  (if file_url isn't specified)   <span className="parameter-info">File</span>

List of publicly accessible URLs to multiple files, e.g. ["https://cdn.example.com/receipt1.jpg", "https://cdn.example.com/receipt2.jpg"]

---

<span className="parameter-text">categories</span> <span className="parameter-info">Optional</span> <span className="parameter-info">List</span>

List of categories, if you would like to use you`re own list and it’s different from the Default one [“Meals & Entertainment”, “Travel”, ...]

---

<span className="parameter-text">tags</span> <span className="parameter-info">Optional</span> <span className="parameter-info">List</span>

List of tags to apply to the document, e.g. [“conference trip 2020”, “work travel”, ...]

---
<span className="parameter-text">max_pages_to_process<span> <span className="parameter-info">Optional</span> <span className="parameter-info">Int</span>

When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.

---
<span className="parameter-text">boost_mode<span> <span className="parameter-info">Optional</span> <span className="parameter-info">Boolean</span>

Flag that tells Veryfi whether boost mode should be enabled. When set to true, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is false.

---
<span className="parameter-text">external_id</span> <span className="parameter-info">Optional</span> <span className="parameter-info">String</span>

Optional custom document identifier. Use this if you would like to assign your own ID to documents

---
<span className="parameter-text">async</span> <span className="parameter-info">Optional</span> <span className="parameter-info">Boolean</span>

Optional switch to enable asynchronous processing mode (set to true to enable). [Click here]() for more details.

