#### Table of Content

1. [Add Lens Framework to your project](/lens/docs/cordova/#add)
2. [Platform-specific Configuration: iOS](/lens/docs/cordova/#configuration-ios)
3. [Platform-specific Configuration: Android](/lens/docs/cordova/#configuration-android)
4. [Initialize Lens](/lens/docs/cordova/#init)
5. [Working with Lens](/lens/docs/cordova/#launch)
6. [Key security best practices](/lens/docs/cordova/#key-security)

> Keys: an access key is required to use this service. If you do not have one, you can [generate a key](/api/settings/keys/) now.

---

### 1. Add Lens Framework to your project

The Cordova wrapper for Veryfi Lens is available via a private NPM repository.

1. Navigate to the package manager access key page [here](/api/settings/keys/#package-managers-container)

2. Scroll down to the Lens: Cordova (iOS + Android) section and create a credential pair to Veryfi's private NPM repository for the Cordova plugin.

3. Configure the npm registry location and credentials.

Replace `[NPM_USERNAME]` and `[NPM_PASSWORD]` with the credentials that were set up in the previous step.

```shell
npm config set @veryfi:registry https://nexus.veryfi.com/repository/npm/
npm config set _auth $(echo -n '[NPM_USERNAME]:[NPM_PASSWORD]' | openssl base64 -A) --registry=https://nexus.veryfi.com/repository/npm
```

4. Add the plugin to your Cordova project:

```shell
cordova plugin add @veryfi/cordova-plugin-veryfi-lens@[VERSION]
```

**NOTE:** Replace `[VERSION]` with the actual version of the plugin you wish to add to your project, e.g. `2.0.0`

---

### 2. Platform-specific Configuration: iOS

#### App Permissions
Add the following permissions to your app's config.xml to allow camera and gallery access:

```xml
<platform name="ios">
    <edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
        <string>Scan documents</string>
    </edit-config>
    <edit-config file="*-Info.plist" mode="merge" target="NSPhotoLibraryAddUsageDescription">
        <string>Back up your document images in your photo gallery</string>
    </edit-config>
    <edit-config file="*-Info.plist" mode="merge" target="NSPhotoLibraryUsageDescription">
        <string>Choose document images to process from your photo gallery</string>
    </edit-config>
    <edit-config file="*-Info.plist" mode="merge" target="NSSpeechRecognitionUsageDescription">
        <string>Quickly add transactions via voice dictation</string>
    </edit-config>
    <edit-config file="*-Info.plist" mode="merge" target="NSMicrophoneUsageDescription">
        <string>Quickly add transactions via voice dictation</string>
    </edit-config>
    <edit-config file="*-Info.plist" mode="merge" target="NSLocationAlwaysAndWhenInUseUsageDescription">
        <string>Helps to identify places around you</string>
    </edit-config>
    <edit-config file="*-Info.plist" mode="merge" target="NSLocationWhenInUseUsageDescription">
        <string>Helps to identify nearby vendors</string>
    </edit-config>
    <edit-config file="*-Info.plist" mode="merge" target="NSContactsUsageDescription">
        <string>Add your ___@veryfi.cc assigned email address for reference</string>
    </edit-config>
    <edit-config file="*-Info.plist" mode="merge" target="NSCalendarsUsageDescription">
        <string>Enrich your data with business meetings and events from your Calendar</string>
    </edit-config>
</platform>
```

#### Build Configuration
The plugin comes bundled with arm64 and x86_64 architectures to support devices as well as simulators. Before sending a build to iTunes, the simulator framework needs to be stripped out.

A script responsible for doing this is included and can be found in: `/util/trim-binary.sh`

Upon adding the Lens plugin to your project, a new Run Script phase should automatically be added to your target's Build Phases. Ensure that this is in place, otherwise iTunes submissions will be rejected.

---

###  3. Platform-specific Configuration: Android
#### Version Support

Set minSDK to at least 23 in the project's `build.gradle`:
```shell
defaultMinSdkVersion=23
```

#### ProGuard Rules
If using ProGuard in your app, you will need to include the supplied ProGuard rules file (`proguard-custom.txt`) in your project. The file is available in the root folder of the plugin and should be copied to the root folder of your project.

---

### 4. Initialize Lens

1. Configure your [authentication credentials](/api/settings/keys/):
```js
var clientId = "XXX"; // replace XXX with your assigned Client Id
var username = "XXX"; // replace XXX with your assigned Username
var apiKey = "XXX";   // replace XXX with your assigned API Key
var url = "XXX";      // replace XXX with your assigned Endpoint URL
```
Please read our recommendations on how to secure your credentials [here](/lens/docs/cordova/#key-security)

2. Configure your Lens settings. Refer to the [full list](/lens/docs/cordova/#all-settings) of available settings later in this section.
```js
var settings = {
    blurDetectionIsOn: true,
    autoLightDetectionIsOn: false,
    backupDocsToGallery: true,
    autoDocDetectionAndCropIsOn: true,
    showDocumentTypes: true,
    documentTypes: ['long_receipt', 'receipt'],
    moreMenuIsOn: true,
    categories: ["Meals", "Entertainment", "Job supplies"],
    originalImageMaxSize: 2.0,
    stitchedPDFPixelDensityMultiplier: 2.0
};
```

3. Initialize Lens:
```js
var isDebug = true;   // if true, will print detailed debug information to the console log
cordova.plugins.Veryfi.Lens.init(isDebug, url, clientId, username, apiKey, settings);
```

#### Available settings:
- `accentColor`: (Android only) accent color used by material design (default: *"#005AC1"*)
- `autoCropGalleryIsOn`: forces document detection and auto cropping on documents imported from the image gallery (default: *false*)
- `autoDeleteAfterProcessing`: if on, scanned files will be deleted once processing has completed (default: *false*)
- `autoDocDetectionAndCropIsOn`: detects, highlights and crops documents automatically during camera image capture (default: *true*)
- `autoLightDetectionIsOn`: if on the room ambience controls light to illuminate the document. Turn OFF for manual controls (default: *true*)
- `autoRotateIsOn`: automatically rotates image so the contained document is correctly oriented (default: *false*)
- `backupDocsToGallery`: uses photo gallery to backup each scans -- NOTE: must ask user for permission (default: *true*)
- `blurDetectionIsOn`: checks if a picture captured has 20% or more blur - blurred receipts don't process well (default: *true*)
- `browseIsOn`: enables/disables the browse option for submitting images from local or cloud storage connected to the device (default: *true*)
- `categories`: optional list of custom categories for Veryfi to use for categorizing submitted documents (default: *null*)
- `closeCameraOnSubmit`: after submitting an image, the Lens camera view will be closed and user returned to the host app (default: *true*)
- `dictateIsOn`: enables/disables the "Add by voice" option (default: *true*)
- `docDetectFillUIColor`: document detection rectangle fill color (default: *"#9653BF8A"*)
- `docDetectStrokeUIColor`: document detection rectangle stroke color (default: *null*)
- `emailCCDomain`: the domain name used to power emailed documents (default: *"veryfi.cc"*)
- `emailCCIsOn`: enables/disables the email cc view inside settings (default: *true*)
- `externalId`: a pass-through field to add a unique reference identifier for a scan which can be used to map back to your system (default: *""*)
- `galleryIsOn`: enables/disables the photo gallery feature (default: *true*)
- `locationServicesIsOn`: enables/disables location services to grab user's lat & lng (default: *true*)
- `manualCropIsOn`: (Android only) toggles the option to manually crop an image before submitting it for processing (default: *true*)
- `moreMenuIsOn`: enables/disables the showing of the more menu (default: *true*)
- `moreSettingsMenuIsOn`: enables/disables the showing of the More > Settings option. NOTE: When this is FALSE all Settings come from the app, not the user (default: *true*)
- `originalImageMaxSizeInMB`: maximum size in MB applied when producing images. Valid range is: 0.2 to 2.5 (default: *2.5*)
- `primaryColor`: (Android only) main color used by material design (default: *"#4285f4"*)
- `returnStitchedPDF`: provides path of stitched PDF (when multiple images are stitched for a single document) in the veryfiLensUpdate delegate function (default: *false*)
- `rotateDocIsOn`: enables option to rotate (on each press) a document by 90 degree clockwise (default: *true*)
- `saveLogsIsOn`: stores logs on device. Recommended to be enabled to aid with debugging if required (default: *true*)
- `shareLogsIsOn`: enables option on preview screen to share logs for debugging. Recommended to be disabled in production (default: *false*)
- `shieldProtectionIsOn`: adds shield icon to capture button and adds an menu option inside More > What is Shield? (default: *true*)
- `showDocumentTypes`: enables/disables the documentTypes setting. When disabled, the default camera experience will be used and all documents will be treated as either a receipt, invoice or bill (auto-detected) (default: *false*)
- `stitchIsOn`: enables/disables the option to combine multiple receipts together into a PDF (default: *true*)
- `stitchedPDFPixelDensityMultiplier`: multiplier for the image resolution being drawn on the PDF. Valid range is: 1.0 to 5.0 (default: *2.0*)

**NOTE**: In the case when the settings menu is disabled for the user (`moreSettingsMenuIsOn` is set to *false*), Lens will use the settings that it is initialized with. If the settings menu is enabled, the user will by default be presented with the configured values, but will be able to change these within the settings menu.

---

### 5. Working with Lens
1. Define event callbacks. Refer to the [full list](/lens/docs/cordova/#all-events) of events available in `lensEventCallback` later in this section.
```js
// Callback function for handling all Lens events
function lensEventCallback(data) {
    var jsonObject = JSON.parse(data);
    if (jsonObject.event === "veryfi_lens_close") {
        console.log("veryfi_lens_close data: " + data);
    }
    if (jsonObject.event === "veryfi_lens_update") {
        console.log("veryfi_lens_update data: " + data);
    }
    if (jsonObject.event === "veryfi_lens_error") {
        console.log("veryfi_lens_error data: " + data);
    }
    if (jsonObject.event === "veryfi_lens_success") {
        console.log("veryfi_lens_success data: " + data);
    }
}

// Callback function for capturing Veryfi Lens Camera errors
function lensErrorCallback(data) {
  console.log("showCamera error: " + data);
}
```

2. Launch the Lens camera:
```js
cordova.plugins.Veryfi.Lens.showCamera(lensEventCallback, lensErrorCallback);
```

#### Available events

Following are all the events that are communicated via the `lensEventCallback` callback function.

- `veryfi_lens_close`: Fired when the Veryfi Lens camera has been closed, either as a result of submitting an image for processing, or the user closed the camera without submitting an image.

Sample data:
```json
{
    "status": "close",
    "session_scan_count": 1,
    "queue_count": 1,
    "framework-version": "1.4.0",
    "framework-build": "1",
    "event": "veryfi_lens_close"
}
```

**NOTE:** In the object above `queue_count` refers to the number of submitted documents 
that are currently in the processing queue. `session_scan_count` refers to the number 
of documents that were submitted in the most recent Lens camera session - if this
is equal to 0 (zero) then the camera session was canceled without anything being 
submitted.

- `veryfi_lens_update`: during the processing of a document, this event will be raised multiple times. One time it will contain the thumbnail path for the submitted document, one time it will contain the original (submitted) image path and optionally, one time it will contain the stitched PDF path, if the user submitted more than one image for a document. In addition, multiple instances of this event will be fired containing the current upload progress percentage and other status updates.

Sample *package created* notification:
```json
{
    "status": "start",
    "package_id": "edc8653e4c2b4ef1",
    "event": "veryfi_lens_update"
}
```

Sample *thumbnail path* notification:
```json
{
    "status": "inprogress",
    "msg": "img_thumbnail_path",
    "data": "/path/to/thumbnail.jpg",
    "package_id": "edc8653e4c2b4ef1",
    "event": "veryfi_lens_update"
}
```

The thumbnail path can be used to fetch Base64 data of the image as per the 
following `lensEventCallback` code snippet:
```js
if (jsonObject.event == "veryfi_lens_update") {
    if (jsonObject.msg === "img_thumbnail_path") {
        cordova.plugins.Veryfi.Lens.getFileBase64(jsonObject,
            function (response) {
                console.log("Got thumbnail image Base64 data: ", response);
            }, function (error) {
                console.log("An error occurred while fetching thumbnail image Base64 data: ", error);
            }
        );
    }
}
```
Sample *full-size image path* data:
```json
{
    "status": "inprogress",
    "msg": "img_original_path",
    "data": "/path/to/image.jpg",
    "package_id": "edc8653e4c2b4ef1",
    "document_type": "receipt",
    "event": "veryfi_lens_update"
}
```
The original path can be used to fetch Base64 data of the image as per the following `lensEventCallback` code snippet:
```js
if (jsonObject.event == "veryfi_lens_update") {
    if (jsonObject.msg === "img_original_path") {
        cordova.plugins.Veryfi.Lens.getFileBase64(jsonObject,
            function (response) {
                console.log("Got original image Base64 data: ", response);
            }, function (error) {
                console.log("An error occurred while fetching original image Base64 data: ", error);
            }
        );
    }
}
```

Sample *stitched PDF path* data:
```json
{
    "status": "inprogress",
    "msg": "img_stitched_pdf_path",
    "data": "/path/to/images.pdf",
    "package_id": "edc8653e4c2b4ef1",
    "event": "veryfi_lens_update"
}
```

The stitched PDF path can be used to fetch Base64 data of the document as per the following `lensEventCallback` code snippet:
```js
if (jsonObject.event == "veryfi_lens_update") {
    if (jsonObject.msg === "img_stitched_pdf_path") {
        cordova.plugins.Veryfi.Lens.getFileBase64(jsonObject,
            function (response) {
                console.log("Got stitched PDF Base64 data: ", response);
            }, function (error) {
                console.log("An error occurred while fetching stitched PDF Base64 data: ", error);
            }
        );
    }
}
```
Sample *upload progress percentage* data:
```json
{
    "status": "inprogress",
    "msg": "progress",
    "data": 68,
    "package_id": "edc8653e4c2b4ef1",
    "event": "veryfi_lens_update"
}
```

Sample *package removed* notification data:
```json
{
    "status": "removed",
    "msg": "clear_package",
    "package_id": "edc8653e4c2b4ef1",
    "event": "veryfi_lens_update"
}
```

- `veryfi_lens_error`: if an error occurs during uploading or processing a submitted document, an error object is sent. If a general exception or crash is caught in Veryfi Lens, an exception object is sent instead.

Sample error data:

```json
{
    "status": "error",
    "package_id": "edc8653e4c2b4ef1",
    "error": "{\"status\":\"error\",\"message\":\"Failed to initialize AWS\",\"uploadId\":\"0921a75550504d2e\",\"code\":\"301\"}",
    "event": "veryfi_lens_error"
}
```
Sample *exception* data:

```json
{
    "status": "error",
    "package_id": "edc8653e4c2b4ef1",
    "exception": "java.lang.IllegalArgumentException: Cannot create enum from value!\n\tat com.amazonaws.regions.Regions.fromName(Regions.java:126)\n\tat com.veryfi.lens.helpers.RegionHelper.getRegion(RegionHelper.kt:28)\n\tat com.veryfi.lens.service.UploadDocumentsService.setAccelerateModeEnable(UploadDocumentsService.kt:94)\n\tat com.veryfi.lens.service.UploadDocumentsService.onUploadType(UploadDocumentsService.kt:186)\n\tat com.veryfi.lens.service.UploadDocumentsService.onStartCommand(UploadDocumentsService.kt:161)\n\tat android.app.ActivityThread.handleServiceArgs(ActivityThread.java:4236)\n\tat android.app.ActivityThread.access$1800(ActivityThread.java:231)\n\tat android.app.ActivityThread$H.handleMessage(ActivityThread.java:1925)\n\tat android.os.Handler.dispatchMessage(Handler.java:106)\n\tat android.os.Looper.loop(Looper.java:223)\n\tat android.app.ActivityThread.main(ActivityThread.java:7478)\n\tat java.lang.reflect.Method.invoke(Native Method)\n\tat com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:549)\n\tat com.android.internal.os.ZygoteInit.main(ZygoteInit.java:941)\n",
    "event": "veryfi_lens_error"
}
```

- `veryfi_lens_success`: this event fires once a document has finished processing, whether it was submitted via the camera, the gallery, or it was dictated or entered/typed manually. This delegate provides the response from the Veryfi API.

Sample data:

```json
{
    "status": "done",
    "package_id": "edc8653e4c2b4ef1",
    "data": {"account_number": "", "bill_to": {"address": "", "name": "",}, "card_number": "", "category": "Meals & Entertainment", "created_date": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment": {"card_number": "", "display_name": "No Payment,", "type": "no_payment,"}, "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "type": "", "vat_number": ""}},
    "event": "veryfi_lens_success"
}
```

Sample *dictated expense* data:
```json
{
    "status": "done",
    "package_id": "edc8653e4c2b4ef1",
    "data": {"account_number": "", "bill_to": {"address": "", "name": "",}, "card_number": "", "category": "Meals & Entertainment", "created_date": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment": {"card_number": "", "display_name": "No Payment,", "type": "no_payment,"}, "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "type": "", "vat_number": ""}},
    "type":"dictation",
    "event": "veryfi_lens_success"
}
```

---
#### 6.  Key security best practices
The recommended flow for this process is:

![key-security](../assets/key-security.png)

The above process secures Veryfi credentials by preventing:

1. **Reverse engineering attacks**: Since the credentials are not being stored as part of the app source code it is not possible to get them through reverse engineering tools such as Apktool
2. **Man in the middle attacks**: Only the Public Key is sent to the API to encrypt your Veryfi credentials. This means the credentials are not accessible even if an attacker performs a Man in the Middle attack, Proxy attack, SSL attack, or similar because the credentials are encrypted and the Private Key is required to decrypt them. The Private Key is only accessible to the app that creates it
3. **Other attacks**: Since the Key Pair used for encrypting/decrypting the Veryfi credentials is created on app install and stored in Android Keystore or iOS Keychain, they’re not accessible to attackers. This is thanks to protection mechanisms supplied by the OS on the device.

**API Notes:**

The API must use HTTPS with strong encryption and Veryfi credentials must be securely stored at rest on the back end.

**Customer App Notes:**

- Once the credentials are decrypted on the customer app, they may be stored securely on the device to avoid the need to fetch the Veryfi credentials after each user login. If this approach is taken, it must be done using EcryptedSharedPreferences on Android or using Keychain on iOS.
- If feasible, consider also implementing SSL pinning in iOS applications to further mitigate man-in-the-middle attacks. Before doing so, please make sure that this is appropriate for your application as this can lead to your app becoming unusable if this isn’t implemented correctly. SSL pinning requires fallback strategies to be implemented to cater for future SSL certificate changes.

---

**Please note:** adding the Lens SDK to your app will increase your final app size by up to ~20MB. This is due to machine learning models, support libraries, etc included in the SDK.
