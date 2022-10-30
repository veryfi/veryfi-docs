---
## Add a Line Item
Add a line item to a document.

### HTTP Request
`POST ENVIRONMENT_URL/api/v8/partner/documents/DOCUMENT_ID/line-items/`

### Parameters
| Field           | Type   | Required | Description                        |
|-----------------|--------|----------|------------------------------------|
| order           | Int    | N        | Position in the list of line items |
| sku             | String | N        | SKU information for a product      |
| description     | String | N        | 	Line item description             |
| category        | String | N        | 		Category for the line item       |
| total           | Number | N        | Total for the line item            |
| tax             | Number | N        | 	Tax amount for this line          |
| price           | Number | N        | Price for the 1 unit of measure    |
| unit_of_measure | String | N        | 	Unit of measure                   |
| quantity        | Number | N        | Quantity of the product purchased  |


For more details go to [Interactive API PUT](/api/docs/interactive/v8/documents/#post-/documents/-document_id-/line-items)

