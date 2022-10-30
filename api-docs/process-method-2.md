#### **Method 2: Process file using Base64 encoded file**

Submit a request to process a Base64 encoded document.

### HTTP Request
```POST ENVIRONMENT_URL/api/v8/partner/documents/```

### Parameters
| Field                | Type    | Required | Description                                                                                                                                                                                            |
|----------------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| file_name            | String  | Y        | 	File name (eg. starbucks.jpg)                                                                                                                                                                         |
| file_data            | String  | Y        | Base64 encoded file                                                                                                                                                                                    |
| categories           | List    | N        | List of categories, if you would like to use your own list and it’s different from the Default one [“Meals & Entertainment”, “Travel”, ...]                                                            |
| tags                 | 	List   | N        | 	List of tags to apply to the document, e.g. [“conference trip 2020”, “work travel”, ...]                                                                                                              |
| max_pages_to_process | Int     | N        | When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.                                        |
| boost_mode           | Boolean | N        | Flag that tells Veryfi whether boost mode should be enabled. When set to `true`, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is `false`. |
| external_id          | String  | N        | Optional custom document identifier. Use this if you would like to assign your own ID to documents                                                                                                     |
| async                | Boolean | N        | Optional switch to enable asynchronous processing mode (set to `true` to enable). [Click here](/api/docs/documents/process/#asynchronous) for more details.                                            |

For more details go to [Interactive API POST](/api/docs/interactive/v8/documents/#post-/documents)