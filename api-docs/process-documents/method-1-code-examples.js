[
  {
    codeLanguage: "PYTHON",
    language: "python",
    value: "1",
    example: `import requests

CLIENT_ID = "CLIENT_ID"
ENVIRONMENT_URL = "ENVIRONMENT_URL"

username = "USERNAME"
api_key = "API_KEY"

document_id = "DOCUMENT_ID"

url = '{0}api/v8/partner/documents/{1}/'.format(ENVIRONMENT_URL, document_id)
headers = {
"Content-Type": "application/json",
"Accept": "application/json", 
"CLIENT-ID": CLIENT_ID,
"AUTHORIZATION": "apikey {0}:{1}".format(username, api_key)
}

response = requests.get(url=url, headers=headers)

print(response.json())
        `,
  },
  {
    codeLanguage: "PHP",
    language: "php",
    value: "2",
    example: `<?php
$CLIENT_ID = "CLIENT_ID";
$ENVIRONMENT_URL = "ENVIRONMENT_URL";

$username = "USERNAME";
$api_key = "API_KEY";

$document_id = "DOCUMENT_ID";

$headers = array(
    'Content-Type: application/json',
    'Accept: application/json',
    "AUTHORIZATION: apikey $username:$api_key",
    "CLIENT-ID: $CLIENT_ID"
);

$url = "{$ENVIRONMENT_URL}api/v8/partner/documents/$document_id/";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$json_response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

print("json_response = " . $json_response);
?>
    `,
  },
  {
    codeLanguage: "JAVA",
    language: "java",
    value: "3",
    example: `import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

public void getSingleDocument() {
String clientId = "CLIENT_ID";
String apiKey = "apikey USERNAME:API_KEY";
String documentId = "DOCUMENT_ID";
String URL = ENVIRONMENT_URL + "api/v8/partner/documents/" + documentId + "/";
RestTemplate restTemplate = new RestTemplate();

HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_JSON);
headers.add("CLIENT-ID", clientId);
headers.add("AUTHORIZATION", apiKey);

HttpEntity<String> entity = new HttpEntity<>(null, headers);
ResponseEntity<String> response = restTemplate.exchange(URL, HttpMethod.GET, entity, String.class);
response.getStatusCode();
        }
        `,
  },
  {
    codeLanguage: "CURL",
    language: "plaintext",
    value: "4",
    example: `curl -H "Content-Type: application/json" 
-H "Accept: application/json" 
-H "CLIENT-ID: CLIENT_ID" 
-H "AUTHORIZATION: apikey USERNAME:API_KEY" 
-X GET ENVIRONMENT_URL/api/v8/partner/documents/DOCUMENT_ID/
   `,
  },
];