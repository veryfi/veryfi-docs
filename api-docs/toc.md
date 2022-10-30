## General
* [Protocols](/api/docs/general/#protocols)
* [Date & Datetime formats](/api/docs/general/#formats)
* [API Error Codes](/api/docs/general/#errorcodes)
* [API Success Codes](/api/docs/general/#successcodes)

## SDKS & POSTMAN
* [Veryfi SDKs for Python, GO and NodeJS](/api/docs/sdks/#sdks)
* [Postman Sample Postman Requests](/api/docs/sdks/#postman)

## Auth
* [Client Header](/api/docs/auth/#clientheader)
* [Authorization](/api/docs/auth/#authorization)
* [Signature & Timestamp Headers](/api/docs/auth/#signature)

## Interactive API
* [Interactive API v7: Receipts & Invoices](/api/docs/interactive/v7/documents/)
* [Interactive API v8: Receipts & Invoices](/api/docs/interactive/v8/documents/)

## Manage Users
* [Create a User](/api/docs/users/#add)
* [Get a User](/api/docs/users/#getone)
* [Delete a User](/api/docs/users/#delete)

---

## Invoices & Receipts

### Process
* [What to process](/api/docs/documents/process/#hints)
* [Synchronous vs Asynchronous processing](/api/docs/documents/process/#sync-hints)
* [Synchronous processing](/api/docs/documents/process/#synchronous)
  * [Method 1: Process file using multipart/form-data upload](/api/docs/documents/process/#form)
  * [Method 2: Process file using Base64 encoded file](/api/docs/documents/process/#base64)
  * [Method 3: Process file using URL](/api/docs/documents/process/#url)
* [Asynchronous processing](/api/docs/documents/process/#asynchronous)
  * [How it works](/api/docs/documents/process/#how-works)
  * [Step 1: Submit a document for processing](/api/docs/documents/process/#step_1)
  * [Step 2: Receiving and validating the webhook request](/api/docs/documents/process/#step_2)
  * [Step 3: Retrieve processed document](/api/docs/documents/process/#step_3)
* [Handling Zip files](/api/docs/documents/process/#zipfiles)

### Manage
* [Search Documents](/api/docs/documents/manage/#search)
* [Get a Document](/api/docs/documents/manage/#getone)
* [Delete a Document](/api/docs/documents/manage/#delete")
* [Get All Line Items for a Document](/api/docs/documents/manage/#lineitems-getall)
* [Get a Line Item](/api/docs/documents/manage/#lineitems-getone)

### Train Model
* [How model training works](/api/docs/documents/train/#hints)
* [Update Document](/api/docs/documents/train/#update)
* [Update a Line Item](/api/docs/documents/train/#lineitems-update)
* [Add a Line Item](/api/docs/documents/train/#lineitems-add)
* [Delete a Line Item](/api/docs/documents/train/#lineitems-delete)

### Manage Tags
* [Add a Tag](/api/docs/documents/tags/#add)
* [Get All Tags for a Document](/api/docs/documents/tags/#getallfordocument)
* [Delete a Tag from a Document](/api/docs/documents/tags/#deletefordocument)
* [Get all Tags (global)](/api/docs/documents/tags/#getall)
* [Delete a Tag (global)](/api/docs/documents/tags/#delete)