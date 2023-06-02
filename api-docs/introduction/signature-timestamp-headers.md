<h3 className="h3-title" id="new-api-docs-signature-timestamp">Signature & Timestamp Headers</h3>

<p className="p-text">All requests to Veryfi’s endpoints should have X-VERYFI-REQUEST-SIGNATURE and X-VERYFI-REQUEST-TIMESTAMP headers as an additional layer of authentication.</p>

<p className="p-text">A user encodes a POST request with the <span style="font-weight: 700">CLIENT_SECRET</span> signature. A signed POST request is the request itself and the signature from the request.</p>

<h5 className="h5-title">Example:</h5>

<p className="p-text">A user sends a <a href="/api/docs/api-docs-v2/#/paths/api-v8-partner-documents/post" style="color: #8B99EE;">POST request to /Documents</a> with a signature to process a new Document.</p>

<p className="p-text">Veryfi checks the signature sent along with the signature on file. Since the authorized server knows the <span style="font-weight: 700">CLIENT_SECRET</span>, the server can validate and compare if the incoming request's signature coincides with the server's signature.</P>

<h5 className="h5-title">Required Keys</h5>

---
<span className="parameter-text">CLIENT_SECRET</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span> <span className="parameter-info">String</span>

<p className="p-text">Obtained from the <a href='/api/settings/keys/' style="color: #8B99EE;">Keys</a> 
section in <a href='/api/settings/keys/' style="color: #8B99EE;">Settings</a>
</p>


<p className="p-text" style="margin-top: 48px;">Signatures are valid for 30 minutes from the time of generation.</p>

<p className="p-text"><span style="font-weight: 700">X-Veryfi-Request-Timestamp</span> value is a Unix Timestamp in milliseconds (ms) since 
<a href="https://www.epochconverter.com" style="color: #8B99EE;">epoch</a>.</p>

<p className="p-text">Since <span style="font-weight: 700">CLIENT_SECRET</span> is essential to the application's password. it automatically does the signing when using a <a href="/api/docs/sdks/" style="color: #8B99EE;">Veryfi SDK</a>.</p>

<p className="p-text">Refer to the code examples on the right for a demonstration of how the value of the 
<span style="font-weight: 700">X-VERYFI-REQUEST-SIGNATURE</span> header is generated.</p>
