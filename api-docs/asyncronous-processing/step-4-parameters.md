<h5 className="h5-title">To validate the incoming request, you will need:</h5>

---
<span className="parameter-text">payload</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span> 

<p className="p-text">The entire JSON request body.</p>

---
<span className="parameter-text">client_secret</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span>

<p className="p-text">The Client Secret can be found in the <a href="/api/settings/keys/" style="color: #8B99EE"> Profile Keys Section </a></p>

---
<span className="parameter-text">validation_signature</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span>

<p className="p-text">The value of the <span style="font-weight: 700">x-veryfi-signature</span> header in the request</p>

---
