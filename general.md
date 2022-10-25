### Protocols
#### TLS only
All requests are done over TLS v1.2. TLS uses stronger encryption algorithms 
and has the ability to work on different ports. 
Both SSL 2.0 and 3.0 have been deprecated by the IETF (in 2011 and 2015, respectively). 
Ref: https://www.globalsign.com/en/blog/ssl-vs-tls-difference/

#### UTF-8 encoding
Every string passed to and from the API needs to be UTF-8 encoded. 
For maximum compatibility, normalize to Unicode Normalization Form C (NFC) 
before UTF-8 encoding.
---

### Date and Datetime Formats
All dates in the API are strings in the following format:
###### DATE
```
"YYYY-MM-DD"

Example:
"2016-06-04"
```
###### DATE WITH TIME
```
"YYYY-MM-DD HH:MM:SS"

Example:
"2016-06-04 22:31:20"
```
---

### API Error Codes
Errors are returned using standard HTTP error code syntax. 
Any additional info is included in the body of the return call, JSON-formatted.

| HTTP Status Code | Description                                                                                                                      |
|------------------|----------------------------------------------------------------------------------------------------------------------------------|
| 400              | Bad input parameter. The error message should indicate which one and why.                                                        |
| 401              | Bad or expired api_key. This can happen if the access token was revoked or expired. To fix, you should re-authenticate the user. |
| 403              | Forbidden request, when a user is not authorized to perform a certain action.                                                    |
| 405              | Request method not expected (generally should be OPTIONS, GET, POST, PUT).                                                       |
| 503              | Service Unavailable. Suspicious Behavior Detected.                                                                               |
| 5xx              | Server-Side Error.                                                                                                               |

---
### API Success Codes

| HTTP Status Code | Description                                              |
|------------------|----------------------------------------------------------|
| 200              | 	Default OK                                              |
| 201              | Object Created OK                                        |
| 202              | Accepted                                                 |
| 204              | 	Empty Response                                          |
| 205-299          | Success codes that are Currently not used in Veryfi APIs |
