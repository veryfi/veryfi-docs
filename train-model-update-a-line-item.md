---
## Update a Line Item
Update an existing line item on a document.

### HTTP Request
`PUT ENVIRONMENT_URL/api/v8/partner/documents/DOCUMENT_ID/line-items/LINE_ITEM_ID/`

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


For more details go to [Interactive API PUT](/api/docs/interactive/v8/documents/#put-/documents/-document_id-/line-items/-line_item_id-)

