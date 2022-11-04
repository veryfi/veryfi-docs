#### Table of Content

1. [Add Lens Framework to your project](/lens/docs/flutter/#add)
2. [Platform-specific Configuration: iOS](/lens/docs/flutter/#configuration-ios)
3. [Platform-specific Configuration: Android](/lens/docs/flutter/#configuration-android)
4. [Initialize Lens](/lens/docs/flutter/#init)
5. [Working with Lens](/lens/docs/flutter/#launch)
6. [Key security best practices](/lens/docs/flutter/#key-security)

> Keys: an access key is required to use this service. If you do not have one, you can [generate a key](/api/settings/keys/) now.

---

### 1. Add Lens Framework to your project

The Flutter wrapper for Veryfi Lens is available via a private NPM repository. The corresponding Android Lens SDK is also pulled from a private Maven repository. You will need to configure access to both repositories.

1. Navigate to the package manager access key page [here](/api/settings/keys/#package-managers-container)

2. Scroll down to the Lens: Flutter (iOS + Android) section and grant access to your SSH key to Veryfi's private NPM repository for the Flutter plugin.

Make sure your SSH key has been added to ssh-agent by running this command in the Terminal:
```shell
# Replace /path/to/private_key with the actual path to your SSH private key
ssh-add -K /path/to/private_key
```

3. Scroll down to the **Lens: Maven (Android)** section and generate your access credentials.

Replace `[NPM_USERNAME]` and `[NPM_PASSWORD]` with the credentials that were set up in the previous step.

```shell
npm config set @veryfi:registry https://nexus.veryfi.com/repository/npm/
npm config set _auth $(echo -n '[NPM_USERNAME]:[NPM_PASSWORD]' | openssl base64 -A) --registry=https://nexus.veryfi.com/repository/npm
```

4. Add your Maven credentials to your system environment.

   Replace `[USERNAME]` and `[PASSWORD]` with the credentials that were set up in the previous step.

```shell
export MAVEN_VERYFI_USERNAME=[USERNAME]
export MAVEN_VERYFI_PASSWORD=[PASSWORD]
```

5. Add the plugin to your Flutter project by adding this dependency to your package's `pubspec.yaml` file.

   Replace `[VERSION]` with the actual version of the plugin you wish to add to your project, e.g. `1.0.0`

```shell
dependencies:
  veryfi:
    git:
      url: https://[USERNAME]:[PASSWORD]@repo.veryfi.com/shared/lens/flutter-plugin-veryfi-lens.git
      ref: [VERSION]
```

**Note:** The wrapper supports the following Flutter SDK versions:
```shell
flutter: ">=1.20.0"
```

---

### 2. Platform-specific Configuration: iOS

#### App Permissions
Add the following to your `Info.plist` file in your project's "ios" folder:

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

#### Build Settings
1. Select the *Pods* project

2. Select the *veryfi* target

3. Open the *Build Settings* tab

4. Scroll down to the *Build Options* section

5. Set **Enable Bitcode** to **No**

**Note:** If you don't see *Veryfi* in the list of targets on the *Pods* project, make sure you first run:

```shell
flutter build ios
```

---

###  3. Platform-specific Configuration: Android
#### Version Support

Set minSDK to at least 23 in `app/build.gradle`:
```shell
android {
  defaultConfig {
    minSdkVersion 23
  }
}
```

#### Additional Settings
1. Update the Kotlin version in the project's `build.gradle` file:
```json
buildscript {
    ext.kotlin_version = '1.5.31'
}
```

2. Apply the kotlin-kapt plugin in `app/build.gradle`:
```json
apply plugin: 'kotlin-kapt'
```

3. Enable data binding in `app/build.gradle`:
```json
android {
    aaptOptions {
        noCompress "veryfi"
    }
    buildFeatures { viewBinding true }
}
```

---

### 4. Initialize Lens

1. import required symbols from Lens SDK
```js
import 'package:veryfi/lens.dart';
```

2. Configure your [authentication credentials](/api/settings/keys/):
```js
Map<String, dynamic> credentials = {
    'clientId': 'XXXX',
    'userName': 'XXXX',
    'apiKey': 'XXXX',
    'url': 'XXXX'
};
```
Please read our recommendations on how to secure your credentials [here](/lens/docs/flutter/#key-security)

3. Configure your Lens settings. Refer to the [full list](/lens/docs/flutter/#all-settings) of available settings later in this section.
```js
// Add all your desired settings here using 'key': value.
Map<String, dynamic> settings = {
    'showDocumentTypes': true
};
```

4. Initialize Lens:
```js
try {
      Veryfi.initLens(credentials, settings);
} on Exception catch (e) {
      // Handle initLens exception here
}
```

#### Available settings:
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
1. Define event callbacks. Refer to the [full list](/lens/docs/flutter/#all-events) of events available in the event handler later in this section.
```js
void handleVeryfiEvent(LensEvent eventType, Map<String, dynamic> response) {
    if (eventType == LensEvent.close) {
        debugPrint("[close] data: ${response}");
    }
    if (eventType == LensEvent.error) {
        debugPrint("[error] data: ${response}");
    }
    if (eventType == LensEvent.success) {
        debugPrint("[success] data: ${response}");
    }
    if (eventType == LensEvent.update) {
        debugPrint("[update] data: ${response}");
    }
}
```

2. Assign your event handler in Veryfi Lens:
```js
Veryfi.setDelegate(handleVeryfiEvent);
```

3. Launch the Lens camera:
```js
Veryfi.showCamera();
```

#### Available events

Following are all the events that are communicated via the event handler assigned in `Verfyi.setDelegate()`.

- `LensEvent.close`: Fired when the Veryfi Lens camera has been closed, either as a result of submitting an image for processing, or the user closed the camera without submitting an image.

Sample data:
```json
{
  "status": "close",
  "session_scan_count": 1,
  "queue_count": 1,
  "framework-version": "1.4.0",
  "framework-build": "1"
}
```

**NOTE:** In the object above `queue_count` refers to the number of submitted documents 
that are currently in the processing queue. `session_scan_count` refers to the number 
of documents that were submitted in the most recent Lens camera session - if this
is equal to 0 (zero) then the camera session was canceled without anything being 
submitted.

- `LensEvent.update`: during the processing of a document, this event will be raised multiple times. One time it will contain the thumbnail path for the submitted document, one time it will contain the original (submitted) image path and optionally, one time it will contain the stitched PDF path, if the user submitted more than one image for a document. In addition, multiple instances of this event will be fired containing the current upload progress percentage and other status updates.

Sample *package created* notification:
```json
{
  "status": "start",
  "package_id": "edc8653e4c2b4ef1"
}
```

Sample *thumbnail path* notification:
```json
{
  "status": "inprogress",
  "msg": "img_thumbnail_path",
  "data": "/path/to/thumbnail.jpg",
  "package_id": "edc8653e4c2b4ef1"
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

Sample *stitched PDF path* data:
```json
{
  "status": "inprogress",
  "msg": "img_stitched_pdf_path",
  "data": "/path/to/images.pdf",
  "package_id": "edc8653e4c2b4ef1"
}
```

Sample *upload progress percentage* data:
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

- `LensEvent.error`: if an error occurs during uploading or processing a submitted document, an error object is sent. If a general exception or crash is caught in Veryfi Lens, an exception object is sent instead.

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

- `LensEvent.success`: this event fires once a document has finished processing, whether it was submitted via the camera, the gallery, or it was dictated or entered/typed manually. This delegate provides the response from the Veryfi API.

Sample data:

```json
{
  "status": "done",
  "package_id": "edc8653e4c2b4ef1",
  "data": {"account_number": "", "bill_to": {"address": "", "name": "",}, "card_number": "", "category": "Meals & Entertainment", "created_date": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment": {"card_number": "", "display_name": "No Payment,", "type": "no_payment,"}, "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "type": "", "vat_number": ""}}
}
```

Sample *dictated expense* data:
```json
{
  "status": "done",
  "package_id": "edc8653e4c2b4ef1",
  "data": {"account_number": "", "bill_to": {"address": "", "name": "",}, "card_number": "", "category": "Meals & Entertainment", "created_date": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment": {"card_number": "", "display_name": "No Payment,", "type": "no_payment,"}, "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "type": "", "vat_number": ""}},
  "type":"dictation"
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
