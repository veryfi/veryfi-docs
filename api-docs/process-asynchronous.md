---
## Asynchronous Processing
#### How it works
While Veryfi's API is capable of extracting structured data from unstructured documents in just seconds, there are use cases for separating the collection of documents from the backend business logic that processes the data extracted from these documents.

This asynchronous flow is achieved with the use of Webhooks. The process works like this:
1. Document is submitted for processing with the `async` switch turned on
2. Veryfi processes the document
3. Veryfi makes a request to the webhook URL
4. The service that is serving your webhook makes a request to the Veryfi API to get the processed document's details and performs any required tasks

Your webhook URL is tied to your user profile and can be configured [here](/api/settings/keys/#webhook).

**NOTE**: Make sure your webhook responds with a 200 HTTP Status Code in a timely manner (under 10 seconds).
It will need to be able to process requests similar to this one (see [Step]() 2 below for more details):
```json
curl --location --request POST 'https://YOUR_WEBHOOK_URL/' \
     --header 'Content-Type: application/json' \
     --header 'x-veryfi-signature: 3awRveqxsYK5nB6YjcaMoq1Tov87ksq+YZ34ab7YoEq=' \
     --data-raw '{"id": 41331192, "created": "2021-09-19 20:37:47"}'
```
---

#### Step 1: Submit a document for processing
Submit a document for processing using one of the methods described in the [synchronous processing](/api/docs/documents/process/#synchronous) section above.

Make sure that you enable asynchronous processing mode by adding this input parameter to the JSON request body:
```json
{
    "async": true
}
```
The response will contain the document ID assigned to the document that is being processed. No additional information is available at this point as the document has not yet been processed.
```json
{
    "id": 123456789
}
```
---
#### Step 2: Receiving and validating the webhook request
Within seconds of submitting a document for processing you will receive a webhook POST request to your specified webhook URL. The request body will be in JSON format and look similar to this:
```json
{
    "event": "document.created",
    "data": {
        "id": 123456789,
        "created": "2021-10-20 15:27:26"
    }
}
```
**NOTE**: If the async request fails, the webhook event will be:
```json
{
    "event": "document.failed",
    "data": {
        "id": 123456789,
        "created": "2021-10-20 15:27:26",
        “error”: “<reason for failure>”
    }
}
```
In order to validate that this request was sent by Veryfi, a special validation header will be included in this request:
```json
"x-veryfi-signature": "3awRveqxsYK5nB6YjcaMoq1Tov87ksq+YZ34ab7YoEq="
```
To validate the request, you will need 3 things:

- `payload` - this is the entire JSON request body
- `client_secret` - this can be found [here](/api/settings/keys/)
- `validation_signature` - this is the value of the *x-veryfi-signature* header in the request

The example code below demonstrates how to validate the incoming request.
#### PYTHON 3
```js
import hashlib
import hmac
import base64
from typing import *

def create_signature(data_payload: Dict, client_secret: str) -> str:
    signature = hmac.new(
        client_secret.encode("utf-8"), msg=str(data_payload).encode("utf-8"), digestmod=hashlib.sha256
    ).digest()
    base64_signature = str(base64.b64encode(signature), "utf-8").strip()
    return base64_signature

generated_signature = create_signature(payload["data"], client_secret)

# Confirm that the generated signature equals the validation signature
# from the x-veryfi-signature header
is_valid = generated_signature == validation_signature
```
---
#### Step 3: Retrieve processed document
Now that the webhook request has been validated as indeed coming from Veryfi, the next step is to retrieve the data extracted from the document and perform any additional required tasks.

To get the document's details, perform a GET request to `/api/v8/partner/documents/DOCUMENT_ID/` as described [here](/dashboard/#getone). `DOCUMENT_ID` can be found by accessing `data.id` in the JSON request body for the webhook request.

---
## Handling Zip files
The following examples are in Python. Uploading a zip file:
```js
import zipfile
from veryfi import Client

list_files = ['receipt1.jpg', 'receipt2.jpg']
zip_file_path = 'receipts.zip'

with zipfile.ZipFile(zip_file_path, 'w') as zipF:
    for file in list_files:
        zipF.write(file, compress_type=zipfile.ZIP_DEFLATED)

client_id = 'your_client_id'
client_secret = 'your_client_secret'
username = 'your_username'
api_key = 'your_password'

veryfi_client = Client(client_id, client_secret, username, api_key)
response = veryfi_client.process_document(zip_file_path)
```
or if you are not using veryfi Client and don’t want to write zip on disk here is how you can do it in-memory.
```js
import io
import zipfile
import base64
import requests
import json

list_files = ['receipt1.jpg', 'receipt2.jpg']

zip_buffer = io.BytesIO()
with zipfile.ZipFile(zip_buffer, "a", zipfile.ZIP_DEFLATED, False) as zip_file:
    for file_name in list_files:
        with open(file_name, "rb") as image_file:
            zip_file.writestr(file_name, image_file.read())

encode_zip_string = base64.b64encode(zip_buffer.getvalue())

client_id = 'your_client_id'
client_secret = 'your_client_secret'
username = 'your_username'
api_key = 'your_password'

headers = {
    "User-Agent": "Python Veryfi-Python/3.0.0",
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Client-Id": client_id,
    "Authorization": f"apikey {username}:{api_key}"
}
api_url = "api.veryfi.com/api/v8/partner/documents"
request_arguments = {
    "file_name": file_name,
    "file_data": encode_zip_string,
}
_session = requests.Session()
response = _session.request(
            "POST",
            url=api_url,
            headers=headers,
            data=json.dumps(request_arguments),
        )
```