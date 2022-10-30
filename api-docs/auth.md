### Client Header
All requests should also contain client header. Client ID identifies which client is making the requests to Veryfi API.
Your Client ID is located in the Keys section.

``` CLIENT-ID: "CLIENT_ID" ```

### Authorization
All API requests should carry the following authorization header.

```AUTHORIZATION: "apikey USERNAME:API_KEY"```

This is how your authorization should look:

```AUTHORIZATION: "apikey johndoe.email:0n0a8d5f10b9c036d4ae7a9532fad458"```

<style>
      * {
      box-sizing: border-box;
    }
    .wrapper {
      max-width: 50rem;
      width: 100%;
      margin: 0 auto;
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
      position: relative;
      display: block;
      line-height: 2.75em;
      height: 3em;
      padding: 0 1.618em;
      background: #2b2b2b;
      border-right: 0.125rem solid #ffffff;
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
      top: 2.75em;
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
        <h3>Signature & Timestamp Headers</h3>
        <p>All Requests to <span
                style="color: #c7254e; background-color: #f9f2f4; font-family: monospace">/partner/users/</span>
            endpoints should have
            <span
                style="border: 1px solid black; padding: 2px; font-size: 10px; display: inline-block">X-VERYFI-REQUEST-SIGNATURE</span>
            and <span
                style="border: 1px solid black; padding: 2px; font-size: 10px; display: inline-block">X-VERYFI-REQUEST-TIMESTAMP</span>
            headers.
        </p>
        <pre>
X-Veryfi-Request-Signature: "Generated Signature"
X-Veryfi-Request-Timestamp: "Unix Timestamp integer 
(ms since epoch) https://www.epochconverter.com"
        </pre>
        <p>These headers are used for an additional layer of authentication.
            Refer to the code examples on the right for a demonstration of how the value
            of the
            <span
                style="border: 1px solid black; padding: 2px; font-size: 10px; display: inline-block">X-VERYFI-REQUEST-SIGNATURE</span>
            header is generated. The value of your account's
            <span style="color: #c7254e; background-color: #f9f2f4; font-family: monospace">CLIENT_SECRET</span>
            that is referenced in the code examples can be found <a href="/api/settings/keys/">here</a>.
        </p>
        <p>Note: Signatures are valid for 30 minutes from the time of generation.</p>
    </div>
    <div class="col" style="display: flex; flex-direction: column; width: 50%">
        <div class="wrapper">
            <div class="tabs">
                <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch">
                    <label for="tab-1" class="tab-label">PYTHON</label>
                    <div class="tab-content"> 
                        <pre>
                            <code>
import time
import hashlib
import hmac
import base64
&nbsp;
CLIENT_SECRET = "CLIENT_SECRET"
user_id = "USER_ID"
# Build signature
timestamp = int(time.time() * 1000)
payload_to_sign = "timestamp:{0},user_id:{1}".format(timestamp, user_id)
tmp_signature = hmac.new(CLIENT_SECRET, msg=payload, digestmod=hashlib.sha256).digest()
secret_bytes = bytes(CLIENT_SECRET, 'utf-8')
payload_to_sign_bytes = bytes(payload_to_sign, 'utf-8')
tmp_signature = hmac.new(secret_bytes, msg=payload_to_sign_bytes, digestmod=hashlib.sha256).digest()
signature = str(base64.b64encode(tmp_signature)).strip()
&nbsp;
print signature
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
$CLIENT_SECRET = "CLIENT_SECRET";
$user_id = "USER_ID";
&nbsp;
// Build signature
$timestamp = time() * 1000;
$payload_to_sign = "timestamp:$timestamp,user_id:$user_id";
$tmp_signature = hash_hmac('sha256', $payload_to_sign, $CLIENT_SECRET, true);
$signature = base64_encode($tmp_signature);
&nbsp;
print($signature);
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
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
&nbsp;
public String getSignature() {
    String clientSecret = "CLIENT_SECRET";
    String userId = "USER_ID";
    &nbsp;
    // Build signature
    Date date = new Date();
    long timeStamp = date.getTime();
    String message = "timestamp:" + timeStamp + ",user_id:" + userId;
    SecretKeySpec keySpec = new SecretKeySpec(clientSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    Mac mac;
    try {
        mac = Mac.getInstance("HmacSHA256");
    } catch (NoSuchAlgorithmException e) {
        return e.getMessage();
    }
    try {
        mac.init(keySpec);
    } catch (InvalidKeyException e) {
        return  e.getMessage();
    }
    byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
    String base64SignatureEncoded = Base64.getEncoder().encodeToString(rawHmac);
&nbsp;
    return base64SignatureEncoded;
}
                            </code>
                        </pre>
                    </div>
                </div>
                <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-4" class="tab-switch">
                    <label for="tab-4" class="tab-label">BASH</label>
                    <div class="tab-content">
                        <pre>
                            <code>
CLIENT_SECRET="CLIENT_SECRET"
user_id="USER_ID"
&nbsp;
# Sign the request
timestamp=$(( $(date +%s) * 1000 ))
payload_to_sign="timestamp:${timestamp},user_id:${user_id}"
base64_signature=$(echo -n ${payload_to_sign} | openssl sha256 -hmac ${CLIENT_SECRET} -binary | base64)
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

