##### Parameters

---

**file_name** <span style="color: #FFC56D;font-size: 14px">REQUIRED</span> String

file name (e.g starbucks.jpg)

---

**file** <span style="color: #FFC56D;font-size: 14px">REQUIRED</span> String

File (pdf, jpg, .jpeg, .png)

---

**categories** <span>Optional</span> List

List of categories, if you would like to use you`re own list and it’s different from the Default one [“Meals & Entertainment”, “Travel”, ...]

---

**tags** <span>Optional</span> List

List of tags to apply to the document, e.g. [“conference trip 2020”, “work travel”, ...]

---
**max_pages_to_process** <span>Optional</span> Int

When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.

---
**boost_mode** <span>Optional</span> Boolean

Flag that tells Veryfi whether boost mode should be enabled. When set to true, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is false.

---
**external_id** <span>Optional</span> String

Optional custom document identifier. Use this if you would like to assign your own ID to documents

---
**async** <span>Optional</span> Boolean

Optional switch to enable asynchronous processing mode (set to true to enable). [Click here]() for more details.
