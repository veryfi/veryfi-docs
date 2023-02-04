##### Parameters

---
<span className="parameter-text">q</span> <span className="parameter-info">Optional</span>

Search term to search for a specific document by its content. These fields will be searched: external_id, category, vendor.name, notes, invoice_number, total and ocr_text.

---
<span className="parameter-text">external_id</span> <span className="parameter-info">Optional</span>

Search for documents that match your custom identifier

---
<span className="parameter-text">tag</span> <span className="parameter-info">Optional</span>

Search for documents with the specified tag

---
<span className="parameter-text">created__gt</span> <span className="parameter-info">Optional</span>

Search for documents with a created date greater than the one specified here.The date format for this parameter is: YYYY-MM-DD+HH:MM:SSDon't send both created__gt and created__gte in a single request.

---
<span className="parameter-text">created__gte</span> <span className="parameter-info">Optional</span>

Search for documents with a created date greater than or equal to the one specified here.The date format for this parameter is: YYYY-MM-DD+HH:MM:SSDon't send both created__gt and created__gte in a single request.

---
<span className="parameter-text">created__lt</span> <span className="parameter-info">Optional</span>

Search for documents with a created date less than the one specified here.The date format for this parameter is: YYYY-MM-DD+HH:MM:SSDon't send both created__lt and created__lte in a single request.

---
<span className="parameter-text">created__lte</span> <span className="parameter-info">Optional</span>

Search for documents with a created date less than or equal to the one specified here.The date format for this parameter is: YYYY-MM-DD+HH:MM:SSDon't send both created__gt and created__gte in a single request.

---