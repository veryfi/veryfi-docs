<h3 className="h3-title" id="validate-webhook-new-api-docs">Step 4: Validate the webhook request</h3>

<p className="p-text">Your application should validate that Veryfi is the service that sent the webhook request. Securing sensitive data and safeguarding your application and servers from misuse is essential.</p>

<p className="p-text">Veryfi includes a validation header in the webhook request so that your application can validate that Veryfi sent the inbound request. This optional step adds an extra layer of security to prevent spoofing of the webhook call.</p>

<h5 className="h5-title">Document processing workflow for webhooks:</h5>

<p className="p-text">Once a document is processed, Veryfi will send a notification to the <a href='/api/settings/keys/' style="color: #8B99EE;">configured webhook</a>.</p>

<p className="p-text">If Veryfi does not receive a success response in a timely manner (any response code < 400 is considered successful), it tries three more times with an increasing wait period.
The default time-out settings are 3 seconds for the connection and 20 seconds for the response, and the maximum repeats per request is 4.
</p>

<p className="p-text">If all three webhook deliveries fail, two API webhook failed emails will be sent to configured admin email address:</p>

1. <p className="p-text">The first email will include the first failed document id.</p>
2. <p className="p-text">The second email will contain all the document ids that failed to receive a successful webhook response.</p>

<p className="p-text">Veryfi will only send these two emails in a 24 hour period for failed webhook responses.</p>
