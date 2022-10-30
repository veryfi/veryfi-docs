---
## Method 3: URL
Submit a request to process a file using a URL.

### HTTP Request
`POST ENVIRONMENT_URL/api/v8/partner/w9s/`

### Parameters
| Field     | Type   | Required | Description                                                                                                           |
|-----------|--------|----------|-----------------------------------------------------------------------------------------------------------------------|
| file_name | String | Y        | 	File name (eg. my_w2.jpg)                                                                                            |
| file_url  | String | Y/N      | 	Required if *file_urls* isn't specified. Publicly accessible URL to a file, e.g. "https://cdn.example.com/my_w2.jpg" |



