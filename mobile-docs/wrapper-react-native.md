#### Table of Content

1. [Add Lens Framework to your project](/lens/docs/react-native/#add)
2. [Platform-specific Configuration: iOS](/lens/docs/react-native/#configuration-ios)
3. [Platform-specific Configuration: Android](/lens/docs/react-native/#configuration-android)
4. [Initialize Lens](/lens/docs/react-native/#init)
5. [Communicate with Lens](/lens/docs/react-native/#communicate)
6. [Launch Lens](/lens/docs/react-native/#launch)
7. [Key security best practices](/lens/docs/cordova/#key-security)

> Keys: an access key is required to use this service. If you do not have one, you can [generate a key](/api/settings/keys/) now.

---

### 1. Add Lens Framework to your project

The React Native wrapper for Veryfi Lens is available via a private NPM repository. The corresponding Android Lens SDK is also pulled from a private Maven repository. You will need to configure access to both repositories

1. Navigate to the package manager access key page [here](/api/settings/keys/#package-managers-container)

2. Scroll down to the Lens: React Native (iOS + Android) section and create a credential pair to Veryfi's private NPM repository for the React Native plugin.

3. Scroll down to the Lens: Maven (Android) section and generate your access credentials.
4. Add your Maven credentials to your system environment.

   Replace `[MAVEN_USERNAME]` and `[MAVEN_PASSWORD]` with the credentials that were set up in the previous step.

```shell
export MAVEN_VERYFI_USERNAME=[MAVEN_USERNAME]
export MAVEN_VERYFI_PASSWORD=[MAVEN_PASSWORD]
```

5.Configure the npm registry location and credentials:

   Replace `[NPM_USERNAME]` and `[NPM_PASSWORD]` with the credentials that were set up in the previous step.

```shell
npm config set @veryfi:registry https://nexus.veryfi.com/repository/npm/
npm config set _auth $(echo -n '[NPM_USERNAME]:[NPM_PASSWORD]' | openssl base64 -A) --registry=https://nexus.veryfi.com/repository/npm/
```

6. Add the plugin to your React Native project.
```shell
npm i @veryfi/react-native-veryfi-lens@[VERSION]
```

**NOTE:** Replace `[VERSION]` with the actual version of the plugin you wish to add to your project, e.g. `2.0.0`

---

### 2. Platform-specific Configuration: iOS
1. Open the `ios` folder in your project in Terminal and run:
```shell
pod install
```
2. If you are using Objective-C only in your iOS project, create a Bridging Header. To have XCode do this for you:

    a. Right-click on your project folder in XCode and select *New File*

    b. Select *Swift File*, enter any name and click *Create*

    c. In the popup, follow the prompts to *Create Bridging Header*

3. Go to your app's *Target > Build Settings*, scroll down to the *Build Options* section and configure the following:

    a. Enable Bitcode: No 

    b. Validate Workspace: Yes

4. Add the following to your app's *Info.plist* file:
- This permission is mandatory so Lens can scan and process your receipts:
```xml
<key>NSCameraUsageDescription</key>
<string>Scan documents</string>
```
- These permissions are mandatory if you support gallery backups/usage:
```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Back up your document images in your photo gallery</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Choose document images to process from your photo gallery</string>
```

- These permission is mandatory if you want to support speech recognition (Voice):
```xml
<key>NSSpeechRecognitionUsageDescription</key>
<string>Quickly add transactions via voice dictation</string>
<key>NSMicrophoneUsageDescription</key>
<string>Quickly add transactions via voice dictation</string>
```

- These permissions are mandatory if you want to support location:
```xml
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Helps to identify places around you</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Helps to identify places around you</string>
```

- These permissions are optional, you must enable them if you want to support contacts (email) or calendar integration:
```xml
<key>NSContactsUsageDescription</key>
<string>Add your ___@veryfi.cc assigned email address for reference</string>
<key>NSCalendarsUsageDescription</key>
<string>Enrich your data with business meetings and events from your Calendar</string>
```

---

###  3. Platform-specific Configuration: Android

1. Ensure your *build.gradle (:app)* file includes at a minimum the following configuration, plus any other required settings:
```js
android {
    defaultConfig {
        minSdkVersion 23

        ndk {
            // Specifies the ABI configurations of your native app
            abiFilters "armeabi-v7a", "arm64-v8a",  "x86", "x86_64"
        }
    }

    aaptOptions {
        noCompress "veryfi"
    }

    buildFeatures {
        viewBinding true
    }

    packagingOptions {
        pickFirst 'lib/x86/libc++_shared.so'
        pickFirst 'lib/arm64-v8a/libc++_shared.so'
        pickFirst 'lib/armeabi-v7a/libc++_shared.so'
        pickFirst 'lib/x86_64/libc++_shared.so'
    }

    // Required if minSdkVersion is set to lower than 26
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

---

### 4. Initialize Lens

1.Import Veryfi Lens
```js
import VeryfiLens from '@veryfi/react-native-veryfi-lens';
```

2. Configure your [authentication credentials](/api/settings/keys/):
```js
const veryfiLensCredentials = {
   "url": "XXX",       // replace XXX with your assigned Client ID
   "clientId": "XXX",  // replace XXX with your assigned Username
   "userName": "XXX",  // replace XXX with your assigned API Key
   "apiKey": "XXX"     // replace XXX with your assigned Endpoint URL
};
```
Please read our recommendations on how to secure your credentials [here](/lens/docs/react-native/#key-security)

3. Configure your Lens settings. Refer to the [full list](/lens/docs/react-native/#all-settings) of available settings later in this section.
```js
const veryfiLensSettings = {
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

4. Initialize Lens. Send the above credentials and settings to Lens. Without this, Lens will fail to authenticate and launch.
```js
VeryfiLens.configureWithCredentials(veryfiLensCredentials, veryfiLensSettings);
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
- `boostModeIsOn`: flag that tells Veryfi whether boost mode should be enabled (default: *false*)
- `boundingBoxesIsOn`: returns coordinates for where fields are located on the document (default: *false*)
- `browseIsOn`: enables/disables the browse option for submitting images from local or cloud storage connected to the device (default: *true*)
- `categories`: optional list of custom categories for Veryfi to use for categorizing submitted documents (default: *null*)
- `checksBackIsOn`: enables/disables the capture of checks back side after front side is taken (default: *false*)
- `closeCameraOnSubmit`: after submitting an image, the Lens camera view will be closed and user returned to the host app (default: *true*)
- `confidenceDetailsIsOn`: enable some scores about the confidence level of the inference (default: *false*)
- `detectBlurResponseIsOn`: enables is_blurry which represents the model's assessment about whether the document is blurred or not (default: *false*)
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
- `multipleDocumentsIsOn`: enables/disables processing multiple stitched images as different transactions, this requires stitchIsOn (default: *true*)
- `notificationChannelName`: (Android only) sets the name of the notification channel used for uploading files for processing (default: *veryfi_channel_notification*)
- `originalImageMaxSizeInMB`: maximum size in MB applied when producing images. Valid range is: 0.2 to 2.5 (default: *2.5*)
- `primaryColor`: (Android only) main color used by material design (default: *"#4285f4"*)
- `returnOriginalImage`: if on, will provide the path on the device of the original image in the veryfiLensUpdate delegate function (default: *false*)
- `returnStitchedPDF`: if on, will provide the path on the device of stitched PDF (when multiple images are stitched for a single document) in the veryfiLensUpdate delegate function (default: *false*)
- `rotateDocIsOn`: enables option to rotate (on each press) a document by 90 degree clockwise (default: *true*)
- `saveLogsIsOn`: stores logs on device. Recommended to be enabled to aid with debugging if required (default: *true*)
- `shareLogsIsOn`: enables option on preview screen to share logs for debugging. Recommended to be disabled in production (default: *false*)
- `shieldProtectionIsOn`: adds shield icon to capture button and adds an menu option inside More > What is Shield? (default: *true*)
- `showDocumentTypes`: enables/disables the documentTypes setting. When disabled, the default camera experience will be used and all documents will be treated as either a receipt, invoice or bill (auto-detected) (default: *false*)
- `stitchIsOn`: enables/disables the option to combine multiple receipts together into a PDF (default: *true*)
- `stitchedPDFPixelDensityMultiplier`: multiplier for the image resolution being drawn on the PDF. Valid range is: 1.0 to 5.0 (default: *2.0*)
- `submitButtonBackgroundColor`: color used for submit button background (default: *#005AC1*)
- `submitButtonBorderColor`: color used for submit button border (default: *#005AC1*)
- `submitButtonCornerRadius`: number used to set submit button corner radius (default: *30*)
- `submitButtonFontColor`: color used for submit button text (default: *#FFFFFF*)

**NOTE**: In the case when the settings menu is disabled for the user (`moreSettingsMenuIsOn` is set to *false*), Lens will use the settings that it is initialized with. If the settings menu is enabled, the user will by default be presented with the configured values, but will be able to change these within the settings menu.

---

### 5. Communicate with Lens
Veryfi Lens provides a camera experience that allows users to capture and submit documents for data extraction and enrichment. Lens communicates the activities performed by the user, the various progress stages and status updates and also the final results of the data extraction process asynchronously, with the help of events.

To capture all events from Lens, your app will need to listen to the four event types defined below.

The following example simply logs all data received from all Lens events. This implementation will need to be adapted to do something that is more meaningful to your app's users.
```js
const lensEventCallback = (event) => {
   console.log(JSON.stringify(event, null, ' '));
}

const VeryfiLensEmitter = new NativeEventEmitter(VeryfiLens);
VeryfiLensEmitter.addListener(VeryfiLens.getConstants().onVeryfiLensClose, lensEventCallback);
VeryfiLensEmitter.addListener(VeryfiLens.getConstants().onVeryfiLensUpdate, lensEventCallback);
VeryfiLensEmitter.addListener(VeryfiLens.getConstants().onVeryfiLensError, lensEventCallback);
VeryfiLensEmitter.addListener(VeryfiLens.getConstants().onVeryfiLensSuccess, lensEventCallback);
```

#### Available events:
- `onVeryfiLensClose`: Fired when the Veryfi Lens camera has been closed, either as a result of submitting an image for processing, or the user closed the camera without submitting an image.

Sample data:

```json
{
    "queue_count": 1,
    "framework-version": "1.4.0",
    "session_scan_count": 1,
    "framework-build": "1"
}
```

**NOTE**: In the object above, `queue_count` refers to the number of submitted documents
that are currently in the processing queue. `session_scan_count` refers to the 
number of documents that were submitted in the most recent Lens camera session - if 
this is equal to 0 (zero) then the camera session was canceled without submitting 
anything.

- `onVeryfiLensUpdate`: during the processing of a document, this event will be raised multiple times. One time it will contain the thumbnail path for the submitted document, one time it will contain the original (submitted) image path and optionally, one time it will contain the stitched PDF path, if the user submitted more than one image for a document. In addition, multiple instances of this event will be fired containing the current upload progress percentage and other status updates.

Sample *thumbnail path* notification:

```json
{
    "status": "inprogress",
    "msg": "img_thumbnail_path",
    "data": "/path/to/thumbnail.jpg",
    "package_id": "edc8653e4c2b4ef1"
}
```

The thumbnail path can be used to fetch Base64 data of the image as per the following `lensEventCallback` code snippet:

```js
if (event.msg === "img_thumbnail_path" ) {
    VeryfiLens.getFileBase64(
        event.data,
        (error) => {
            console.error(`An error occurred while fetching thumbnail image Base64 data: ${error}`);
        },
        (dataBase64) => {
            console.log(`Got Base64 data: ${dataBase64}`);
        }
    );
}
```

Sample *full-size image path* data:
```json
{
    "status": "inprogress",
    "msg": "img_original_path",
    "data": "/path/to/image.jpg",
    "package_id": "edc8653e4c2b4ef1",
    "document_type": "receipt"
}
```
The original path can be used to fetch Base64 data of the image as per the following `lensEventCallback` code snippet:

```js
if (event.msg === "img_original_path" ) {
    VeryfiLens.getFileBase64(
        event.data,
        (error) => {
            console.error(`An error occurred while fetching original image Base64 data: ${error}`);
        },
        (dataBase64) => {
            console.log(`Got Base64 data: ${dataBase64}`);
        }
    );
}
```

Sample *stitched PDF path* data:
```json
{
    "status": "inprogress",
    "msg": "img_stitched_pdf_path",
    "data": "/path/to/images.pdf",
    "package_id": "edc8653e4c2b4ef1"
}
```

The stitched PDF path can be used to fetch Base64 data of the document as per the following `lensEventCallback` code snippet:

```js
if (event.msg === "img_stitched_pdf_path" ) {
    VeryfiLens.getFileBase64(
        event.data,
        (error) => {
            console.error(`An error occurred while fetching stitched PDF Base64 data: ${error}`);
        },
        (dataBase64) => {
            console.log(`Got Base64 data: ${dataBase64}`);
        }
    );
}
```

Sample **upload progress percentage** data:
```json
{
    "status": "inprogress",
    "msg": "progress",
    "data": 68,
    "package_id": "edc8653e4c2b4ef1"
}
```

Sample *package removed* notification data:
```json
{
    "status": "removed",
    "msg": "clear_package",
    "package_id": "edc8653e4c2b4ef1"
}
```

- `onVeryfiLensSuccess`: fired once a document has finished processing, whether it was submitted via the camera, the gallery, or it was dictated or entered/typed manually. This delegate provides the response from the Veryfi API.

Sample data:
```json
{
    "package_id": "edc8653e4c2b4ef1",
    "data": {"account_number": "", "bill_to": {"address": "", "name": "",}, "card_number": "", "category": "Meals & Entertainment", "created_date": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment": {"card_number": "", "display_name": "No Payment,", "type": "no_payment,"}, "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "type": "", "vat_number": ""}}
}
```

Sample *dictated expense* data:
```json
{
    "package_id": "edc8653e4c2b4ef1",
    "data": {"account_number": "", "bill_to": {"address": "", "name": "",}, "card_number": "", "category": "Meals & Entertainment", "created_date": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment": {"card_number": "", "display_name": "No Payment,", "type": "no_payment,"}, "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "type": "", "vat_number": ""}},
    "type":"dictation"
}
```

- `onVeryfiLensError`: If an error occurs during uploading or processing a submitted document, an error object is sent. If a general exception or crash is caught in Veryfi Lens, an exception object is sent instead.

Sample *error* data:
```json
{
    "status": "error",
    "package_id": "edc8653e4c2b4ef1",
    "error": "{\"status\":\"error\",\"message\":\"Failed to initialize AWS\",\"uploadId\":\"0921a75550504d2e\",\"code\":\"301\"}"
}
```

Sample *exception* data:

```json
{
    "status": "error",
    "package_id": "edc8653e4c2b4ef1",
    "exception": "java.lang.IllegalArgumentException: Cannot create enum from value!\n\tat com.amazonaws.regions.Regions.fromName(Regions.java:126)\n\tat com.veryfi.lens.helpers.RegionHelper.getRegion(RegionHelper.kt:28)\n\tat com.veryfi.lens.service.UploadDocumentsService.setAccelerateModeEnable(UploadDocumentsService.kt:94)\n\tat com.veryfi.lens.service.UploadDocumentsService.onUploadType(UploadDocumentsService.kt:186)\n\tat com.veryfi.lens.service.UploadDocumentsService.onStartCommand(UploadDocumentsService.kt:161)\n\tat android.app.ActivityThread.handleServiceArgs(ActivityThread.java:4236)\n\tat android.app.ActivityThread.access$1800(ActivityThread.java:231)\n\tat android.app.ActivityThread$H.handleMessage(ActivityThread.java:1925)\n\tat android.os.Handler.dispatchMessage(Handler.java:106)\n\tat android.os.Looper.loop(Looper.java:223)\n\tat android.app.ActivityThread.main(ActivityThread.java:7478)\n\tat java.lang.reflect.Method.invoke(Native Method)\n\tat com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:549)\n\tat com.android.internal.os.ZygoteInit.main(ZygoteInit.java:941)\n"
}
```
---

#### 6. Launch Lens
This function call launches the Veryfi Lens camera experience to allow users to capture and submit documents.

```shell
VeryfiLens.showCamera();
```

---
#### 7.  Key security best practices
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
