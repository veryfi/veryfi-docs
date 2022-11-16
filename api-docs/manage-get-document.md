### Get a Document
Retrieve a previously processed document.

#### HTTP Request
```shell
GET ENVIRONMENT_URL/api/v8/partner/documents/DOCUMENT_ID/
```

#### Query Parameters

---
**return_audit_trail** &nbsp; &nbsp; &nbsp; *Boolean* &nbsp; &nbsp; &nbsp; `Optional`

Set to `true` to return the Audit Trail on this document.
An audit trail includes information about changes made to this document and by who by date.

