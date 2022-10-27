### What to process

- Accepted file types are: **JPEG/JPG**, **PNG** and **PDF** and many more. [FAQ](https://faq.veryfi.com/en/articles/5415096-file-formats-veryfi-supports)
- To process **multiple files** as a single document, submit a **ZIP** containing all the related files. [FAQ](https://faq.veryfi.com/en/articles/6243055-processing-zip-files)
- To process a PDF with multiple documents inside separately, check out **PDF Splitter API**. [FAQ](https://faq.veryfi.com/en/articles/6311471-pdf-splitter-api)
- When submitting **PDF** documents containing more than 15 pages, only the **first 15 pages** will be read. [FAQ](https://faq.veryfi.com/en/articles/6483569-max_pages_to_process-explained)
- For **PDF** documents, **300 DPI** is optimal. [FAQ](https://faq.veryfi.com/en/articles/6171105-file-requirements)
- Optimal **image resolution** is dependent on the size of print in the image. Generally, **1000px** on the smaller dimension is recommended for images. [FAQ](https://faq.veryfi.com/en/articles/6171105-file-requirements)
- Avoid **blur** in images. Accuracy of extraction is largely dependent on the quality and clarity of the image. [FAQ](https://faq.veryfi.com/en/articles/5429636-blur-detection)

---
### Synchronous vs Asynchronous processing

Veryfi API supports both synchronous and asynchronous processing.

With [synchronous processing](), data is extracted in real-time and the results are included in the response to the processing API request.

[Asynchronous processing]() requests receive an immediate response, however the data extraction runs in a background process. Once data extraction completes, Veryfi makes a request to your configured webhook URL.

---
### Synchronous Processing
#### **Method 1: Process file using multipart/form-data upload**

<style>
      * {
      box-sizing: border-box;
    }
    .wrapper {
      max-width: fit-content;
      width: 100%;

    }
    .tabs {
      position: relative;
      margin: 3rem 0;
      background: #ffffff;
      height: 14.75rem;
    }
    .tabs::before,
    .tabs::after {
      content: "";
      display: table;
    }
    .tabs::after {
      clear: both;
    }
    .tab {
      float: left;
    }
    .tab-switch {
      display: none;
    }
    .tab-label {
      font-size: 10px;
      position: relative;
      display: block;
      line-height: 2.75em;
      height: 3em;
      padding: 0 1em;
      background: #2b2b2b;
      border-right: 0.125rem solid #ffffff;
      border-bottom: 0.1rem solid #ffffff;
      color: #e3deda;
      cursor: pointer;
      top: 0;
      transition: all 0.25s;
    }
    .tab-label:hover {
      top: -0.25rem;
      transition: top 0.25s;
    }
    .tab-content {
      height: fit-content;
      position: absolute;
      z-index: 1;
      left: 0;
      padding: 1.618rem;
      background: #2b2b2b;
      color: #ffffff;
      border-bottom: 0.25rem solid #ffffff;
      opacity: 0;
      transition: all 0.35s;
    }
    .tab-switch:checked + .tab-label {
      background: darkgrey;
      color: #e6e1dd;
      border-bottom: 0;
      border-right: 0.125rem solid #fff;
      
      transition: all 0.35s;
      z-index: 1;
      top: -0.0625rem;
    }
    .tab-switch:checked + label + .tab-content {
      z-index: 2;
      opacity: 1;
      transition: all 0.35s;
    }
</style>

<div class="row" style="display: flex; flex-direction: row">
    <div class="col" style="display: flex; flex-direction: column; width: 50%; margin-right: 15px">
        <p>Submit a request to process a multipart/form-data file upload.</p>
        <h3>HTTP Request</h3>
        <pre>
POST ENVIRONMENT_URL/api/v8/partner/documents/
        </pre>
        <h3>Parameters</h3>
        <table>
          <tr>
            <th>field</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>file_name</td>
            <td>String</td>
            <td>Y</td>
            <td>File name (eg. starbucks.jpg)</td>
          </tr>
          <tr>
            <td>file</td>
            <td>File</td>
            <td>Y</td>
            <td>File (pdf, jpg, .jpeg, .png)</td>
          </tr>
          <tr>
            <td>categories</td>
            <td>List</td>
            <td>N</td>
            <td>List of categories, if you would like to use your own list and it’s different from the Default one [“Meals & Entertainment”, “Travel”, ...]</td>
          </tr>
          <tr>
            <td>tags</td>
            <td>List</td>
            <td>N</td>
            <td>List of tags to apply to the document, e.g. [“conference trip 2020”, “work travel”, ...]</td>
          </tr>
          <tr>
            <td>max_pages_to_process</td>
            <td>Int</td>
            <td>N</td>
            <td>When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.</td>
          </tr>
          <tr>
            <td>boost_mode</td>
            <td>Boolean</td>
            <td>N</td>
            <td>Flag that tells Veryfi whether boost mode should be enabled. When set to
                <span
                    style="color: #c7254e; background-color: #f9f2f4; font-family: monospace">true</span>, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is 
                <span
                    style="color: #c7254e; background-color: #f9f2f4; font-family: monospace">false</span>.</td>
          </tr>
          <tr>
            <td>external_id</td>
            <td>String</td>
            <td>N</td>
            <td>Optional custom document identifier. Use this if you would like to assign your own ID to documents</td>
          </tr>
          <tr>
            <td>async</td>
            <td>Boolean</td>
            <td>N</td>
            <td>Optional switch to enable asynchronous processing mode (set to 
                <span
                    style="color: #c7254e; background-color: #f9f2f4; font-family: monospace">true</span> to enable).<a href="/api/docs/documents/process/#asynchronous"> Click here </a> for more details.</td>
          </tr>
        </table>
        <p> For more details go to <a href="/api/docs/interactive/v8/documents/#post-/documents">Interactive API POST</a></p>
    </div>
    <div class="col" style="display: flex; flex-direction: column; width: 50%; margin-right: 15px">
        <div class="wrapper">
            <div class="tabs">
                <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch">
                    <label for="tab-1" class="tab-label">PYTHON</label>
                    <div class="tab-content"> 
                        <pre>
                            <code>
import requests
&nbsp;
CLIENT_ID = "CLIENT_ID"
ENVIRONMENT_URL = "ENVIRONMENT_URL"
&nbsp;
username = "USERNAME"
api_key = "API_KEY"
process_file_url = '{0}api/v8/partner/documents/'.format(ENVIRONMENT_URL)
headers = {
"Accept": "application/json",
"CLIENT-ID": CLIENT_ID,
"AUTHORIZATION": "apikey {0}:{1}".format(username, api_key)
}
&nbsp;
# file path and file name
image_path = '/tmp/example.jpg'
file_name = 'example.jpg'
&nbsp;
# You can send the list of categories that is relevant to your case
# Veryfi will try to choose the best one that fits this document
categories = ["Office Expense", "Meals & Entertainment", "Utilities", "Automobile"]
payload = {
'file_name': file_name,
'categories': categories
}
files = {'file': ('file', open(image_path, 'rb'), 'image/jpeg')}
response = requests.post(url=process_file_url, headers=headers, data=payload, files=files)
&nbsp;
print(response.json())
                            </code>
                        </pre>
                    </div>
                </div>
                <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-2" class="tab-switch">
                    <label for="tab-2" class="tab-label">PHP</label>
                    <div class="tab-content">
                        <pre>
                            <code>
&lt;?php
$CLIENT_ID = "CLIENT_ID";
    $ENVIRONMENT_URL = "ENVIRONMENT_URL";
&nbsp;
    $username = "USERNAME";
    $api_key = "API_KEY";
&nbsp;
    # You can send the list of categories that is relevant to your case
    # Veryfi will try to choose the best one that fits this file
    $categories = array("Office Expense", "Meals & Entertainment", "Utilities", "Auto");
&nbsp;
    $file_path = "/tmp/example.jpg";
    $file_name = "example.jpg";
    $file_mime = "image/jpeg";
&nbsp;
    $mime_boundary=md5(time());
    $eol = "\r\n";
&nbsp;
    $url = "{$ENVIRONMENT_URL}api/v8/partner/documents/";
&nbsp;
    $fields = array(
        'file_name' => $file_name,
        'categories' => json_encode($categories)
    );
&nbsp;
    $data = '';
&nbsp;
    # Build field data
    foreach ($fields as $name => $content) {
        $data .= '--' . $mime_boundary . $eol;
        $data .= 'Content-Disposition: form-data; name="' . $name . '"' . $eol . $eol;
        $data .= $content . $eol;
    }
&nbsp;
    # Build file data
    $data .= '--' . $mime_boundary . $eol;
    $data .= 'Content-Disposition: form-data; name="file"; filename="' . $file_path . '"' . $eol;
    $data .= 'Content-Type: ' . $file_mime . $eol;
    $data .= 'Content-Transfer-Encoding: base64' . $eol . $eol;
    $data .= chunk_split(base64_encode(file_get_contents($file_path))) . $eol;
    $data .= "--" . $mime_boundary . "--" . $eol;
&nbsp;
    $headers = array(
        "Accept: application/json",
        "Content-Type: multipart/form-data; boundary=${mime_boundary}",
        "Content-Length: " . strlen($data),
        "AUTHORIZATION: apikey $username:$api_key",
        "CLIENT-ID: $CLIENT_ID"
    );
&nbsp;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
&nbsp;
    $json_response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
&nbsp;
    print("json_response = " . $json_response);
?&gt;
                            </code>
                        </pre>
                    </div>
                </div>
                <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-3" class="tab-switch">
                    <label for="tab-3" class="tab-label">JAVA</label>
                    <div class="tab-content">
                        <pre>
                            <code>
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import java.io.IOException;
&nbsp;
public String processDocumentBinary() throws IOException {
String clientId = "CLIENT_ID";
String apiKey = "apikey USERNAME:API_KEY";
String URL = ENVIRONMENT_URL + "api/v8/partner/documents/";
String filename = "example.png";
&nbsp;
    HttpHeaders headers = new HttpHeaders();
    headers.add("CLIENT-ID", clientId);
    headers.add("ACCEPT", "application/json");
    headers.add("AUTHORIZATION", apiKey);
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);
&nbsp;
    MultiValueMap&lt;String, Object&gt; body = new LinkedMultiValueMap<>();
    body.add("file", new FileSystemResource(filename));
&nbsp;
    HttpEntity&lt;MultiValueMap&lt;String, Object&gt;&gt; requestEntity = new HttpEntity<>(body, headers);
    try {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity&lt;String&gt; response = restTemplate
                .postForEntity(URL, requestEntity, String.class);
        return response.getBody();
    } catch (HttpClientErrorException e) {
        return e.getMessage();
    }
}
                            </code>
                        </pre>
                    </div>
                </div>
                <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-4" class="tab-switch">
                    <label for="tab-4" class="tab-label">CURL</label>
                    <div class="tab-content">
                        <pre>
                            <code>
curl -H "Content-Type: multipart/form-data" \
     -H "Accept: application/json" \
     -H "CLIENT-ID: CLIENT_ID" \
     -H "AUTHORIZATION: apikey USERNAME:API_KEY" \
     -X POST \
     -F 'file=@/Users/admin/tmp/panera_receipt.pdf' \
     -F 'file_name=panera_receipt.pdf' \
     ENVIRONMENT_URL/api/v8/partner/documents/
                            </code>
                        </pre>
                    </div>
                </div>
              <div class="tab" style="float: right; margin-left: 50px">
                    <input type="radio" name="css-tabs" id="tab-5" class="tab-switch">
                    <label for="tab-5" class="tab-label">RESPONSE</label>
                    <div class="tab-content">
                        <pre>
                            <code>
{
    "id": 12345678,
    "img_url": "https://cdn.veryfi.com/receipts/c45f9514-0c48-4f49-9005-f5e5b39da401.jpg",
    "img_thumbnail_url": "https://cdn.veryfi.com/receipts/c45f9514-0c48-f5e5b39da401_t.jpg",
    "card_number": "4037",
    "category": "Meals & Entertainment", 
    "currency_code": "USD",
    "date": "2018-06-23 19:56:00", 
    "payment": {"card_number": "", "display_name": "No Payment,", "type": "no_payment,"},
    "subtotal": 50.68,
    "tax": 10.00,
    "tip": 0.0,
    "total": 60.68,
    "vendor": {
        "address": "132 Palm Ave, Burbank, CA 91502, USA",
        "logo": "https://cdn.veryfi.com/logos/us/910164080.png", 
        "name": "Panera Bread",
        "phone_number": "8183911059", 
        "type": "cafe"
    },
&nbsp;
    ...
}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
