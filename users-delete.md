### Delete a User

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
        <p>Delete a specific user.</p>
        <h3>HTTP Request</h3>
        <pre>
DELETE ENVIRONMENT_URL/api/v7/partner/users/USER_ID/
        </pre>
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
&nbsp;
user_id = "USER_ID"
&nbsp;
url = '{0}api/v7/partner/users/{1}/'.format(ENVIRONMENT_URL, user_id)
headers = {
"Content-Type": "application/json",
"Accept": "application/json",
"CLIENT-ID": CLIENT_ID,
"AUTHORIZATION": "apikey {0}:{1}".format(username, api_key),
"X-Veryfi-Request-Timestamp": str(TIMESTAMP),
"X-Veryfi-Request-Signature": SIGNATURE
}
&nbsp;
response = requests.delete(url=url, headers=headers)
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
    $user_id = "USER_ID";
&nbsp;
    $url = "{$ENVIRONMENT_URL}api/v7/partner/users/$user_id/";
    $headers = array(
        'Content-Type: application/json',
        'Accept: application/json',
        "AUTHORIZATION: apikey $username:$api_key",
        "CLIENT-ID: $CLIENT_ID",
        "X-Veryfi-Request-Timestamp: TIMESTAMP",
        "X-Veryfi-Request-Signature: SIGNATURE"
    );
&nbsp;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
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
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
&nbsp;
public String deleteSingleUser() {
    String clientId = "CLIENT_ID";
    String clientSecret = "CLIENT_SECRET";
    String apiKey = "apikey USERNAME:API_KEY";
    String URL = ENVIRONMENT_URL + "api/v7/partner/users/USER_ID/";
&nbsp;
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.add("CLIENT-ID", clientId);
    headers.add("AUTHORIZATION", apiKey);
    headers.add("X-Veryfi-Request-Timestamp", String.valueOf(TIMESTAMP));
    headers.add("X-Veryfi-Request-Signature", SIGNATURE);
&nbsp;
    RestTemplate restTemplate = new RestTemplate();
    HttpEntity&lt;String&gt; entity = new HttpEntity<>(null, headers);
    ResponseEntity&lt;String&gt; response = restTemplate.exchange(URL, HttpMethod.DELETE, entity, String.class);
    return response.getStatusCode().toString();
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
curl    -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -H "CLIENT-ID: CLIENT_ID" \
        -H "AUTHORIZATION: apikey USERNAME:API_KEY" \
        -H "X-Veryfi-Request-Timestamp: TIMESTAMP" \
        -H "X-Veryfi-Request-Signature: SIGNATURE" \
        -X DELETE ENVIRONMENT_URL/api/v7/partner/users/USER_ID/
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
    "status": "ok"
}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


