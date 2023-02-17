<h5 className="h5-title">API Error Codes</h5>

---
<p className="p-text"><span className="bold-text">400</span> - Bad input parameter. The error message should indicate which one and why.</p>

---
<p className="p-text"><span className="bold-text">401</span> - Bad or expired api_key. This can happen if the access token was revoked or expired. To fix, you should re-authenticate the user.</p>

---
<p className="p-text"><span className="bold-text">403</span> - Forbidden request, when a user is not authorized to perform a certain action.</p>

---
<p className="p-text"><span className="bold-text">405</span> - Request method not expected (generally should be OPTIONS, GET, POST, PUT).</p>

---
<p className="p-text"><span className="bold-text">503</span> - Service Unavailable. Suspicious Behavior Detected.</p>

---
<p className="p-text"><span className="bold-text">5xx</span> - Server-Side Error.</p>