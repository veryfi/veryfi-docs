<h3 className="h3-title">Signature & Timestamp Headers</h3>

<p className="p-text">All requests to <span style="color: #22CF6D;">/partner/users/</span> endpoints should have 
X-VERYFI-REQUEST-SIGNATURE and X-VERYFI-REQUEST-TIMESTAMP headers as an additional layer of authentication.</p>

<p className="p-text">When a user sends a <span style="font-weight: 700">POST</span> request, 
the request is being encoded by the <span style="font-weight: 700">CLIENT_SECRET</span> (signature). A signed 
<span style="font-weight: 700">POST</span> request is a request 
itself + a signature from a request. The server receives a request and signature. It can then check 
this signature along with the signature on file. Since the authorized server knows the 
<span style="font-weight: 700">CLIENT_SECRET</span>, it 
can validate and compare if the signature from the incoming request coincides with the signature on the 
server side.</p>

<h5 className="h5-title">Required Keys</h5>

---
<span className="parameter-text">CLIENT_SECRET</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span> <span className="parameter-info">String</span>

<p className="p-text">Could be obtained from the <a href='/api/settings/keys/' style="color: #22CF6D;">Keys</a> 
section in <a href='/api/settings/keys/' style="color: #22CF6D;">Settings</a>
</p>


<p className="p-text">Signatures are valid for 30 minutes from the time of generation.</p>

<p className="p-text"><span style="font-weight: 700">X-Veryfi-Request-Timestamp</span> value is 
an Unit Timestamp in ms since epoch. 
(<a href="https://www.epochconverter.com" style="color: #22CF6D;">https://www.epochconverter.com</a>)</p>

<p className="p-text">Since <span style="font-weight: 700">CLIENT_SECRET</span> is essential to the application's own 
password. When using a Veryfi SDK, it automatically does the signing.</p>

<p className="p-text">Refer to the code examples on the right for a demonstration of how the value of the 
<span style="font-weight: 700">X-VERYFI-REQUEST-SIGNATURE</span> header is generated.</p>
