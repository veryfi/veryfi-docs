## Method 1: Multipart/form-data upload
Submit a request to process a multipart/form-data file upload.

### HTTP Request
`POST ENVIRONMENT_URL/api/v7/partner/business-cards/`

### Parameters
| Field     | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| file_name | String | Y        | 			File name (eg. my_w2.jpg)    |
| file      | File   | Y        | 			File (pdf, jpg, .jpeg, .png) |



