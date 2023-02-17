<h3 className="h3-title">Method 1: Process file using multipart/form-data upload</h3>

<span style="color: #8B99EE;font-size: 20px">POST</span><span style="color: #7D819E;font-size: 20px"> /{enviroment_url}/api/v8/partner/documents/</span>

<p className="p-text">Submit a request to process a multipart/form-data file upload.</p>

<h5 className="h5-title">Parameters</h5>

---
<span className="parameter-text">file_name</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span> <span className="parameter-info">String</span>

<p className="p-text">file name (e.g starbucks.jpg)</p>

---

<span className="parameter-text">file</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span> <span className="parameter-info">File</span>

<p className="p-text">File (pdf, jpg, .jpeg, .png)</p>

---

<span className="parameter-text">categories</span> <span className="parameter-info">Optional</span> <span className="parameter-info">List</span>

<p className="p-text">List of categories, if you would like to use you`re own list and it’s different from the Default one [“Meals & Entertainment”, “Travel”, ...]</p>

---

<span className="parameter-text">tags</span> <span className="parameter-info">Optional</span> <span className="parameter-info">List</span>

<p className="p-text">List of tags to apply to the document, e.g. [“conference trip 2020”, “work travel”, ...]</p>

---
<span className="parameter-text">max_pages_to_process<span> <span className="parameter-info">Optional</span> <span className="parameter-info">Int</span>

<p className="p-text">When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.</p>

---
<span className="parameter-text">boost_mode<span> <span className="parameter-info">Optional</span> <span className="parameter-info">Boolean</span>

<p className="p-text">Flag that tells Veryfi whether boost mode should be enabled. When set to true, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is false.</p>

---
<span className="parameter-text">external_id</span> <span className="parameter-info">Optional</span> <span className="parameter-info">String</span>

<p className="p-text">Optional custom document identifier. Use this if you would like to assign your own ID to documents</p>

---
<span className="parameter-text">async</span> <span className="parameter-info">Optional</span> <span className="parameter-info">Boolean</span>

<p className="p-text">Optional switch to enable asynchronous processing mode (set to true to enable). [Click here]() for more details.</p>

