### What to process

- Accepted file types are: **JPEG/JPG**, **PNG** and **PDF** and many more. [FAQ](https://faq.veryfi.com/en/articles/5415096-file-formats-veryfi-supports)
- To process **multiple files** as a single document, submit a **ZIP** containing all the related files. [FAQ](https://faq.veryfi.com/en/articles/6243055-processing-zip-files)
- To process a PDF with multiple documents inside separately, check out **PDF Splitter API**. [FAQ](https://faq.veryfi.com/en/articles/6311471-pdf-splitter-api)
- When submitting **PDF** documents containing more than 15 pages, only the **first 15 pages** will be read. [FAQ](https://faq.veryfi.com/en/articles/6483569-max_pages_to_process-explained)
- For **PDF** documents, **300 DPI** is optimal. [FAQ](https://faq.veryfi.com/en/articles/6171105-file-requirements)
- Optimal **image resolution** is dependent on the size of print in the image. Generally, **1000px** on the smaller dimension is recommended for images. [FAQ](https://faq.veryfi.com/en/articles/6171105-file-requirements)
- Avoid **blur** in images. Accuracy of extraction is largely dependent on the quality and clarity of the image. [FAQ](https://faq.veryfi.com/en/articles/5429636-blur-detection)

---
### Synchronous vs Asynchronous processing

Veryfi API supports both synchronous and asynchronous processing.

With [synchronous processing](), data is extracted in real-time and the results are included in the response to the processing API request.

[Asynchronous processing]() requests receive an immediate response, however the data extraction runs in a background process. Once data extraction completes, Veryfi makes a request to your configured webhook URL.

---
