### Search Documents

Retrieve previously processed documents.

&nbsp;
&nbsp;

#### HTTP Request
```shell
GET ENVIRONMENT_URL/api/v8/partner/documents/
```

&nbsp;
&nbsp;

#### Query Parameters

---
**q** &nbsp; &nbsp; &nbsp; *String* &nbsp; &nbsp; &nbsp; `Optional`

Search term to search for a specific document by its content.
These fields will be searched:
*external_id, tags, category, vendor.name, notes, invoice_number, total* and *ocr_text*.

---
**external_id** &nbsp; &nbsp; &nbsp; *String* &nbsp; &nbsp; &nbsp; `Optional`

Search for documents that match your custom identifier

---
**tag** &nbsp; &nbsp; &nbsp; *String* &nbsp; &nbsp; &nbsp; `Optional`

Search for documents with the specified tag

---
**created__gt** &nbsp; &nbsp; &nbsp; *String* &nbsp; &nbsp; &nbsp; `Optional`

Search for documents with a created date *greater than* the one specified here.
The date format for this parameter is: *YYYY-MM-DD+HH:MM:SS*
Don't send both *created__gt* and *created__gte* in a single request.

---
**created__gte** &nbsp; &nbsp; &nbsp; *String* &nbsp; &nbsp; &nbsp; `Optional`

Search for documents with a created date **greater than or equal to** the one specified here.
The date format for this parameter is: *YYYY-MM-DD+HH:MM:SS*
Don't send both *created__gt* and *created__gte* in a single request.

---
**created__lt** &nbsp; &nbsp; &nbsp; *String* &nbsp; &nbsp; &nbsp; `Optional`

Search for documents with a created date **less than** the one specified here.
The date format for this parameter is: *YYYY-MM-DD+HH:MM:SS*
Don't send both *created__lt* and *created__lte* in a single request.

---
**created__lte** &nbsp; &nbsp; &nbsp; *String* &nbsp; &nbsp; &nbsp; `Optional`

Search for documents with a created date **less than or equal to** the one specified here.
The date format for this parameter is: *YYYY-MM-DD+HH:MM:SS*
Don't send both *created__gt* and *created__gte* in a single request.

---
&nbsp;
&nbsp;

#### Returns

---

Returns an array of Document objects if the call succeeds.