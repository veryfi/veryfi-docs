#### **Method 3: Process file using URL**

Submit a request to process a file using a URL.

### HTTP Request
```POST ENVIRONMENT_URL/api/v8/partner/documents/```

### Parameters
| Field                | Type    | Required | Description                                                                                                                                                                                            |
|----------------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| file_url            | String  | Y/N      | 		Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. "https://cdn.example.com/receipt.jpg"                                                                                                                                                                         |
| file_urls            | LIST    | Y/N      | Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ["https://cdn.example.com/receipt1.jpg", "https://cdn.example.com/receipt2.jpg"]|
| categories           | List    | N        | List of categories, if you would like to use your own list and it’s different from the Default one [“Meals & Entertainment”, “Travel”, ...]                                                            |
| tags                 | 	List   | N        | 	List of tags to apply to the document, e.g. [“conference trip 2020”, “work travel”, ...]                                                                                                              |
| max_pages_to_process | Int     | N        | When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.                                        |
| boost_mode           | Boolean | N        | Flag that tells Veryfi whether boost mode should be enabled. When set to `true`, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is `false`. |
| external_id          | String  | N        | Optional custom document identifier. Use this if you would like to assign your own ID to documents                                                                                                     |
| async                | Boolean | N        | Optional switch to enable asynchronous processing mode (set to `true` to enable). [Click here](/api/docs/documents/process/#asynchronous) for more details.                                            |

For more details go to [Interactive API POST](/api/docs/interactive/v8/documents/#post-/documents)