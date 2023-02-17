<h5 className="h5-title">API Error Codes</h5>

---
**400** - <p className="p-text">Bad input parameter. The error message should indicate which one and why.</p>

---
**401** - <p className="p-text">Bad or expired api_key. This can happen if the access token was revoked or expired. To fix, you should re-authenticate the user.</p>

---
**403** - <p className="p-text">Forbidden request, when a user is not authorized to perform a certain action.</p>

---
**405** - <p className="p-text">Request method not expected (generally should be OPTIONS, GET, POST, PUT).</p>

---
**503** - <p className="p-text">Service Unavailable. Suspicious Behavior Detected.</p>

---
**5xx** - <p className="p-text">Server-Side Error.</p>