### LENS FOR RECEIPTS & INVOICES
![receipts&invoices](	https://www.veryfi.com/wp-content/uploads/Veryfi-Lens-Long-Stitch_t.png)

1. [Add Lens Framework to your project](/lens/docs/android/#add-long-receipts)
2. [Configure your project to use Lens Framework](/lens/docs/android/#configure-long-receipts)
3. [Initialize Lens](/lens/docs/android/#init-long-receipts)
4. [Launch Lens inside your App](/lens/docs/android/#launch-long-receipts)
5. [Communicate with Lens](/lens/docs/android/#delegates-long-receipts)
6. [Key security best practices](/lens/docs/android/#key-security-long-receipts)

> Keys: an access key is required to use this service. If you do not have one, you can [generate a key](/api/settings/keys/) now.

#### 1. Add Lens Framework to your project

1. Add the Maven repository details to the `dependencyResolutionManagement.repositories` section of your `settings.gradle` as shown in this minimalistic example:
```js
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()

        // Maven repository for VeryfiLens
        maven {
            url "https://nexus.veryfi.com/repository/maven-releases/"
            credentials {
                username = 'USERNAME'
                password = 'PASSWORD'
            }
            authentication {
                basic(BasicAuthentication)
            }
        }
    }
}
```
**NOTE**: Replace `USERNAME` and `PASSWORD` with your real username and password. You can manage your Maven access credentials [here](/api/settings/keys/#package-managers-container).

2. Add Veryfi Lens to the dependencies in your build.gradle (:app) file (replace "X.X.X" with the Lens SDK version you're currently using):
```js
dependencies {
    implementation 'com.veryfi.lens:veryfi-lens-receipts-sdk:X.X.X'
}
```

---
####  2. Configure your project to use Lens SDK

1. Ensure your build.gradle (:app) file includes at a minimum the following configuration, plus any other required settings:
```js
plugins {
    id 'kotlin-kapt'
}

android {
    defaultConfig {
        minSdkVersion 23

        ndk {
            // Specifies the ABI configurations of your native app
            abiFilters "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
        }

        javaCompileOptions {
            annotationProcessorOptions {
                arguments += [
                    "room.schemaLocation":"$projectDir/schemas".toString(),
                    "room.incremental":"true",
                    "room.expandProjection":"true"]
            }
        }
    }

    androidResources {
        noCompress "veryfi"
    }

    buildFeatures {
        viewBinding true
    }

    // Required if minSdkVersion is set to lower than 26
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

2. Ensure your `build.gradle (:app)` file includes at a minimum the following dependencies (replace "X.X.X" with the Lens SDK version you're currently using) as well as the latest **AndroidX** libraries:
```js
dependencies {
    implementation 'androidx.appcompat:appcompat:X.X.X'
    implementation 'com.veryfi.lens:veryfi-lens-long-receipts-sdk:X.X.X.X'
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
}
```

3. Ensure your main `build.gradle` file includes the required repositories:
```js
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
```

4. Set Android Gradle Plugin to version 7 in `build.gradle` file:
```js
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:7.2.2'
    }
}
```

5. Remove/disable `repositoriesMode` in your `settings.gradle` file :
```js
dependencyResolutionManagement {
    // Disable the following line:
    // repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)

    repositories {
        google()
        mavenCentral()
    }
}
```

6. If your app uses the `android:allowBackup` tag, include the following settings in the Activity section of your `AndroidManifest.xml` file :
```xml
<application
tools:ignore="AllowBackup,GoogleAppIndexingWarning"
tools:replace="android:allowBackup">
```

---

#### 3.  Initialize Lens

1. Import required classes from Lens SDK:
```java
import com.veryfi.lens.VeryfiLens
import com.veryfi.lens.VeryfiLensCredentials
import com.veryfi.lens.VeryfiLensSettings
import com.veryfi.lens.VeryfiLensDelegate
```

2. Configure your [authentication credentials](/api/settings/keys/):
```js
val veryfiLensCredentials = VeryfiLensCredentials()
veryfiLensCredentials.clientId = "XXX"  // replace XXX with your assigned Client Id
veryfiLensCredentials.username = "XXX"  // replace XXX with your assigned Username 
veryfiLensCredentials.apiKey = "XXX"    // replace XXX with your assigned API Key 
veryfiLensCredentials.url = "XXX"       // replace XXX with your assigned Endpoint URL

```

Please read our recommendations on how to secure your credentials [here](/lens/docs/ios/#key-security-receipts-invoices)

3. Configure your Lens settings. Refer to the [full list](/lens/docs/ios/#all-settings) of available settings later in this section.
```js
val veryfiLensSettings = VeryfiLensSettings()
veryfiLensSettings.documentTypes = arrayListOf(DocumentType.LONG_RECEIPT)
veryfiLensSettings.blurDetectionIsOn = true
veryfiLensSettings.autoLightDetectionIsOn = true
veryfiLensSettings.backupDocsToGallery = true
veryfiLensSettings.autoDocDetectionAndCropIsOn = true
veryfiLensSettings.closeCameraOnSubmit = true
veryfiLensSettings.stitchIsOn = true
veryfiLensSettings.locationServicesIsOn = true
veryfiLensSettings.moreMenuIsOn = true
veryfiLensSettings.categories = arrayListOf("Meals", "Entertainment", "Job supplies")
veryfiLensSettings.primaryColor = "#53BF8A"
veryfiLensSettings.secondaryColor = "#005AC1"
```

4. Initialize Lens:
```js
VeryfiLens.configure(this, veryfiLensCredentials, veryfiLensSettings)
```

#### Available settings:
- `accentColor`: accent color used by material design (default: *"#005AC1"*)
- `accentDarkColor`: accent dark color used by material design (default: *"#DBE2F9"*)
- `primaryDarkColor`: main dark color used by material design (default: *"#ADC6FF"*)
- `secondaryDarkColor`: secondary dark color used by material design default: *"#3F4759"*)
- `autoCropGalleryIsOn`: forces document detection and auto cropping on documents imported from the image gallery (default: *false*)
- `autoDeleteAfterProcessing`: if on, scanned files will be deleted once processing has completed (default: *false*)
- `autoDocDetectionAndCropIsOn`: detects, highlights and crops documents automatically during camera image capture (default: *true*)
- `autoLightDetectionIsOn`: if on the room ambience controls light to illuminate the document. Turn OFF for manual controls (default: *true*)
- `autoRotateIsOn`: automatically rotates image so the contained document is correctly oriented (default: *false*)
- `autoSubmitDocumentOnCapture`: auto submit document on capture, skipping the preview screen (default: *false*)
- `backupDocsToGallery`: uses photo gallery to backup each scans -- NOTE: must ask user for permission (default: *true*)
- `blurDetectionIsOn`: checks if a picture captured has 20% or more blur - blurred receipts don't process well (default: *true*)
- `boostModeIsOn`: flag that tells Veryfi whether boost mode should be enabled (default: *false*)
- `boundingBoxesIsOn`: returns coordinates for where fields are located on the document (default: *false*)
- `categories`: optional list of custom categories for Veryfi to use in categorizing submitted documents (default: *null*)
- `checksBackIsOn`: enables/disables the capture of checks back side after front side is taken (default: *false*)
- `closeCameraOnSubmit`: after submitting an image, the Lens camera view will be closed and user returned to the host app (default: *true*)
- `confidenceDetailsIsOn`: enable some scores about the confidence level of the inference (default: *false*)
- `defaultSelectedDocumentType`: which is the default selected document type (default: *DocumentType.RECEIPT*)
- `detectBlurResponseIsOn`: enables is_blurry which represents the model's assessment about whether the document is blurred or not (default: *false*)
- `dictateIsOn`: enables/disables the "Add by voice" option (default: *true*)
- `docDetectFillUIColor`: document detection rectangle fill color (default: *"#9653BF8A"*)
- `docDetectStrokeUIColor`: document detection rectangle stroke color (default: *null*)
- `emailCCDomain`: the domain name used to power emailed documents (default: *"veryfi.cc"*)
- `emailCCIsOn`: enables/disables the email cc view inside settings (default: *true*)
- `externalId`: a pass-through field to add a unique reference identifier for a scan which can be used to map back to your system (default: *""*)
- `galleryIsOn`: enables/disables the photo gallery feature (default: *true*)
- `locationServicesIsOn`: enables/disables location services to grab user's lat & lng (default: *true*)
- `manualCropIsOn`: toggles the option to manually crop an image before submitting it for processing (default: *true*)
- `moreMenuIsOn`: enables/disables the showing of the more menu (default: *true*)
- `moreSettingsMenuIsOn`: enables/disables the showing of the More > Settings option. NOTE: When this is FALSE all Settings come from the app, not the user (default: *true*)
- `multipleDocumentsIsOn`: enables/disables processing multiple stitched images as different transactions, this requires stitchIsOn (default: *true*)
- `notificationChannelName`: sets the name of the notification channel used for uploading files for processing (default: *veryfi_channel_notification*)
- `originalImageMaxSizeInMB`: maximum size in MB applied when producing images. Valid range is: 0.2 to 2.5 (default: *2.5*)
- `primaryColor`: main color used by material design (default: *"#4285f4"*)
- `returnStitchedPDF`: provides path of stitched PDF (when multiple images are stitched for a single document) in the veryfiLensUpdate delegate function (default: *false*)
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
- 
**NOTE**: In the case when the settings menu is disabled for the user (`moreSettingsMenuIsOn` is set to false), Lens will use the settings that it is initialized with. If the settings menu is enabled, the user will by default be presented with the configured values, but will be able to change these within the settings menu.

---

#### 4. Launch Lens inside your App
1. Launch the Lens camera:
```js
VeryfiLens.showCamera()
```

2. Optionally, instead of launching the Lens camera experience, you may perform one of the following:

- Launch the Gallery screen to submit images from the Photo Gallery:
```js
VeryfiLens.showGallery()
```

- Launch the Dictation screen to submit images either typed or dictated by voice:
```js
VeryfiLens.showDictation()
```

- Open email collection instructions screen, including the email address the user should forward documents to:
```js
VeryfiLens.showEmail()
```

**TIP**: Collection email addresses can either exist on the veryfi.cc domain, or your own whitelisted domain. Contact support@veryfi.com for details on whitelabeling.

3. For all of the above features, with the exception of *showEmail()*, your app will need to communicate with Lens to handle user actions, various status changes and extraction results from Veryfi. See the [Communicating with Lens](/lens/docs/ios/#delegates-receipts-invoices) section below for details

---


#### 5. Communicate with Lens
1. Use the `VeryfiLens.setDelegate` function to define your delegate functions that will be responsible for handling events triggered by Veryfi Lens:
```js
VeryfiLens.setDelegate(object : VeryfiLensDelegate {
    override fun veryfiLensClose(json: JSONObject) {
        Log.d(TAG, json.toString(2)) // do something with the JSON response here
    }

    override fun veryfiLensError(json: JSONObject) {
        Log.d(TAG, json.toString(2)) // do something with the JSON response here
    }

    override fun veryfiLensSuccess(json: JSONObject) {
        Log.d(TAG, json.toString(2)) // do something with the JSON response here
    }

    override fun veryfiLensUpdate(json: JSONObject) {
        Log.d(TAG, json.toString(2)) // do something with the JSON response here
    }
})
```
#### Delegate Definitions
- `veryfiLensClose` - the Veryfi Lens camera has been closed, either as a result of submitting an image for processing, or the user closed the camera without submitting an image.

Sample data:
```json
{
    "status": "close",
    "queue_count": 1,
    "session_scan_count": 1,
    "framework-version": "1.4.0",
    "framework-build": "1"
}
```
**TIP**: In the object above, `queue_count` refers to the number of submitted documents 
that are currently in the processing queue. `session_scan_count` refers to the number 
of documents that were submitted in the most recent Lens camera session - if this 
is equal to 0 (zero) then the camera session was canceled without submitting anything.

- `veryfiLensUpdate` - during the processing of a document, this delegate will be fired multiple times. One time it will contain the thumbnail path for the submitted document and one time it will contain a full-size image path. In addition, multiple instances of this delegate will be fired containing status updates and the current upload progress percentage.

Sample *package created* data:
```json
{
    "status": "start",
    "package_id": "edc8653e4c2b4ef1"
}
```

Sample *thumbnail path* data:
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

Sample *upload progress percentage* data:
```json
{
    "status": "inprogress",
    "msg": "progress",
    "data": 68,
    "package_id": "edc8653e4c2b4ef1"
}
```

Sample *package removed* data:
```json
{
    "status": "removed",
    "msg": "clear_package",
    "package_id": "edc8653e4c2b4ef1"
}
```

- `veryfiLensSuccess` - this delegate fires once a document has finished processing, whether it was submitted via the camera, the gallery, or it was dictated or entered/typed manually. This delegate provides the response from the Veryfi API.

Sample data:
```json
{
  "status": "done",
  "data": {"account_number": "", "bill_to_address": "", "bill_to_name": "", "card_number": "", "category": "Meals & Entertainment", "created": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment_display_name": "", "payment_terms": "", "payment_type": "", "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "vat_number": "", "vendor_logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "vendor_type": ""}},
  "package_id": "edc8653e4c2b4ef1"
}
```

Sample *dictated expense* data:
```json
{
  "status": "done",
  "data": {"account_number": "", "bill_to_address": "", "bill_to_name": "", "card_number": "", "category": "Meals & Entertainment", "created": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment_display_name": "", "payment_terms": "", "payment_type": "", "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "vat_number": "", "vendor_logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "vendor_type": ""}},
  "package_id": "edc8653e4c2b4ef1",
  "type":"dictation"
}
```

- `veryfiLensError` - if an error occurs during uploading or processing a submitted document, an error object is sent. If a general exception or crash is caught in Veryfi Lens, an exception object is sent instead.

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
  "status": "exception",
  "package_id": "edc8653e4c2b4ef1",
  "exception": "java.lang.IllegalArgumentException: Cannot create enum from value!\n\tat com.amazonaws.regions.Regions.fromName(Regions.java:126)\n\tat com.veryfi.lens.helpers.RegionHelper.getRegion(RegionHelper.kt:28)\n\tat com.veryfi.lens.service.UploadDocumentsService.setAccelerateModeEnable(UploadDocumentsService.kt:94)\n\tat com.veryfi.lens.service.UploadDocumentsService.onUploadType(UploadDocumentsService.kt:186)\n\tat com.veryfi.lens.service.UploadDocumentsService.onStartCommand(UploadDocumentsService.kt:161)\n\tat android.app.ActivityThread.handleServiceArgs(ActivityThread.java:4236)\n\tat android.app.ActivityThread.access$1800(ActivityThread.java:231)\n\tat android.app.ActivityThread$H.handleMessage(ActivityThread.java:1925)\n\tat android.os.Handler.dispatchMessage(Handler.java:106)\n\tat android.os.Looper.loop(Looper.java:223)\n\tat android.app.ActivityThread.main(ActivityThread.java:7478)\n\tat java.lang.reflect.Method.invoke(Native Method)\n\tat com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:549)\n\tat com.android.internal.os.ZygoteInit.main(ZygoteInit.java:941)\n"
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