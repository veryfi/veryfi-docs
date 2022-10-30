---
## Method 2: Base64 encoded file
Submit a request to process a Base64 encoded document.

### HTTP Request
`POST ENVIRONMENT_URL/api/v8/partner/checks/`

### Parameters
| Field     | Type   | Required | Description                  |
|-----------|--------|----------|------------------------------|
| file_name | String | Y        | 			File name (eg. my_w2.jpg) |
| file_data | String | Y        | 				Base64 encoded file      |



