##### API Error Codes

---
**400** - Bad input parameter. The error message should indicate which one and why.

---
**401** - Bad or expired api_key. This can happen if the access token was revoked or expired. To fix, you should re-authenticate the user.

---
**403** - Forbidden request, when a user is not authorized to perform a certain action.

---
**405** - Request method not expected (generally should be OPTIONS, GET, POST, PUT).

---
**503** - Service Unavailable. Suspicious Behavior Detected.

---
**5xx** - Server-Side Error.