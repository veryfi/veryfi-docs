---
## Get a Document
Retrieve a previously processed document.

### HTTP Request
`GET ENVIRONMENT_URL/api/v8/partner/documents/DOCUMENT_ID/`

### Query Parameters 

| Field              | Type    | Required | Description                                                                                                                                           |
|--------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| return_audit_trail | Boolean | N        | Set to `true` to return the Audit Trail on this document. An audit trail includes information about changes made to this document and by who by date. |


For more details go to [Interactive API GET](/api/docs/interactive/v8/documents/#get-/documents/-document_id-)