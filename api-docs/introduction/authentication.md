### Authentication

<span style="color: #22CF6D;font-size: 20px">GET</span><span style="color: #7D819E;font-size: 20px"> /documents/</span>

All API requests should carry the following authorization header and contain AUTHORIZATION and CLIENT-ID fields


##### Authorization Header Fields

---
<span className="parameter-text">**AUTHORIZATION**</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span> <span className="parameter-info">String</span>

The value follows the format: “apikey {**USERNAME**}:{**API_KEY**}”. Find your <span style="color: #22CF6D;">**USERNAME**</span> and <span style="color: #22CF6D;">**API_KEY**</span> in <span style="color: #22CF6D;">Profile Keys Section</span>

---
<span className="parameter-text">**CLIENT-ID**</span> <span style="color: #FFC56D;font-size: 14px" className="parameter-info">REQUIRED</span> <span className="parameter-info">String</span>

Client ID is located in the <span style="color: #22CF6D;">Profile Keys Section</span>
