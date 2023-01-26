##### Parameters

---
<span className="parameter-text">file_name</span> <span style="color: #FFC56D;font-size: 14px" clasName="parameter-info">REQUIRED</span> <span clasName="parameter-info">String</span>

file name (e.g starbucks.jpg)

---

<span className="parameter-text">file</span> <span style="color: #FFC56D;font-size: 14px" clasName="parameter-info">REQUIRED</span> <span clasName="parameter-info">File</span>

File (pdf, jpg, .jpeg, .png)

---

<span className="parameter-text">categories</span> <span clasName="parameter-info">Optional</span> <span clasName="parameter-info">List</span>

List of categories, if you would like to use you`re own list and it’s different from the Default one [“Meals & Entertainment”, “Travel”, ...]

---

<span className="parameter-text">tags</span> <span clasName="parameter-info">Optional</span> <span clasName="parameter-info">List</span>

List of tags to apply to the document, e.g. [“conference trip 2020”, “work travel”, ...]

---
<span className="parameter-text">max_pages_to_process<span> <span clasName="parameter-info">Optional</span> <span clasName="parameter-info">Int</span>

When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.

---
<span className="parameter-text">boost_mode<span> <span clasName="parameter-info">Optional</span> <span clasName="parameter-info">Boolean</span>

Flag that tells Veryfi whether boost mode should be enabled. When set to true, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is false.

---
<span className="parameter-text">external_id</span> <span clasName="parameter-info">Optional</span> <span clasName="parameter-info">String</span>

Optional custom document identifier. Use this if you would like to assign your own ID to documents

---
<span className="parameter-text">async</span> <span clasName="parameter-info">Optional</span> <span clasName="parameter-info">Boolean</span>

Optional switch to enable asynchronous processing mode (set to true to enable). [Click here]() for more details.

