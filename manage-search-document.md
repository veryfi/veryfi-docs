> The response is limited to **1,000 documents**. To retrieve more than this, you will need to switch to `v8` of the API
> [Learn more about v8](https://www.veryfi.com/latest/api-version-8/)

## Search Documents
Retrieve previously processed documents.

### HTTP Request
`GET ENVIRONMENT_URL/api/v8/partner/documents/`

### Query Parameters 

|  Field       | Type   | Required | Description                                                                                                                                                                                                                  |
|--------------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| q            | String | N        | Search term to search for a specific document by its content.These fields will be searched:*external_id, tags, category, vendor.name, notes, invoice_number, total* and *ocr_text*.                                          |
| external_id  | String | N        | Search for documents that match your custom identifier                                                                                                                                                                       |
| tag          | String | N        | Search for documents with the specified tag                                                                                                                                                                                  |
| created__gt  | String | N        | Search for documents with a created date **greater than** the one specified here.The date format for this parameter is: *YYYY-MM-DD+HH:MM:SS* Don't send both *created__gt* and *created__gte* in a single request.          |
| created__gte | String | N        | Search for documents with a created date **greater than or equal** to the one specified here. The date format for this parameter is: *YYYY-MM-DD+HH:MM:SS* Don't send both *created__gt* and *created__gte* in a single request. |
| created__lt  | String | N        | Search for documents with a created date **less than** the one specified here. The date format for this parameter is: *YYYY-MM-DD+HH:MM:SS* Don't send both *created__lt* and *created__lte* in a single request.            |
| created__lte | String | N        | Search for documents with a created date **less than or equal** to the one specified here. The date format for this parameter is: *YYYY-MM-DD+HH:MM:SS* Don't send both *created__gt* and *created__gte* in a single request |

For more details go to [Interactive API GET](/api/docs/interactive/v8/documents/#get-/documents)