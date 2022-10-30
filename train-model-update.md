## How model training works
Veryfi's Machine Learning models undergo frequent training. Changes that are made to processed documents are used during these training sessions.

To help improve the accuracy of data extraction for documents that you submit to Veryfi's API, all you need to do is to correct any issues at a document or line-item level through the PUT, POST and DELETE operations described below.

A new and improved version of the models is typically released every 1-2 weeks.

---
## Update Document
Update a previously processed document.

### HTTP Request
`PUT ENVIRONMENT_URL/api/v8/partner/documents/DOCUMENT_ID/`

### Parameters
| Field           | Type    | Required | Description                                                                                        |
|-----------------|---------|----------|----------------------------------------------------------------------------------------------------|
| bill_to_name    | String  | N        | 			Name of the Bill To contact                                                                     |
| bill_to_address | String  | N        | Address of the Bill To contact                                                                     |
| category        | String  | N        | Category for the document                                                                          |
| date            | 	String | N        | 	Date on invoice/bill/receipt in *YYYY-MM-DD HH:MM:SS* format                                      |
| due_date        | String  | N        | Due Date on invoice in *YYYY-MM-DD HH:MM:SS* format                                                |
| invoice_number  | String  | N        | Invoice number                                                                                     |
| subtotal        | String  | N        | Subtotal on the document                                                                           |
| tax             | String  | N        | 	Tax on the document                                                                               |
| tip             | String  | N        | Tip / gratuity                                                                                     |
| total           | String  | N        | Total on the document                                                                              |
| vendor          | Dict    | N        | 	{"name": "<vendor_name>", "address": "<vendor_address>"}                                          |
| external_id     | String  | N        | Optional custom document identifier. Use this if you would like to assign your own ID to documents |

For more details go to [Interactive API PUT](/api/docs/interactive/v8/documents/#put-/documents/-document_id-)

