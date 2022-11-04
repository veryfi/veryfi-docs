#### Table of Content

1. [Add Lens Framework to your project](/lens/docs/xamarin/#add)
2. [Platform-specific Configuration: iOS](/lens/docs/xamarin/#configuration-ios)
3. [Platform-specific Configuration: Android](/lens/docs/xamarin/#configuration-android)
4. [Initialize Lens](/lens/docs/xamarin/#init)
5. [Working with Lens](/lens/docs/xamarin/#launch)
6. [Key security best practices](/lens/docs/xamarin/#key-security)

> Keys: an access key is required to use this service. If you do not have one, you can [generate a key](/api/settings/keys/) now.

---

### 1. Add Lens Framework to your project

The Xamarin wrapper for Veryfi Lens is available via a private NuGet repository. You will need to configure access to this repository:

1. Navigate to the package manager access key page [here](/api/settings/keys/#package-managers-container)
2. Scroll down to the **Lens: Xamarin (iOS + Android)** section and generate your access credentials.

Next, add the Lens plugin to your Xamarin project:

1. With your Xamarin project open in Visual Studio, right-click on your project's **Packages** and select **Manage NuGet Packages...**

2. From the **Package source** dropdown, select **Configure Sources...** and then click **Add** to add Veryfi's private NuGet repository

3. On the new package source form, use the following:
- **Name**: Veryfi
- **Location**: https://nexus.veryfi.com/repository/nuget/
- **Username and password**: use the credentials that you configured above

4. Once you have added Veryfi's package source, you can import the Lens plugin:
- For **Android** add the **VeryfiLensAndroidXamarinBinding** package to your project.
- For **iOS** add **VeryfiLensiOSXamarinBinding**

---

### 2. Platform-specific Configuration: iOS

#### App Permissions
Add the following to your `Info.plist` file:

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

#### App Entitlements
Add the following to your `Entitlements.plist` file and enable Sandbox for the app:
```xml
<dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.device.camera</key>
    <true/>
    <key>com.apple.security.network.client</key>
    <true/>
    <key>com.apple.security.personal-information.addressbook</key>
    <true/>
    <key>com.apple.security.personal-information.calendars</key>
    <true/>
    <key>com.apple.security.personal-information.location</key>
    <true/>
    <key>com.apple.security.personal-information.photos-library</key>
    <true/>
</dict>
```

#### Build Settings
- Bitcode is disabled by default and will need to remain disabled.

- Use default SDK version (12). The latest (15.2) may result in compatibility issues.

---

###  3. Platform-specific Configuration: Android
#### Additional Packages

1. Add the **Xamarin.Kotlin.StdLib** package from the main NuGet source (nuget.org)
   
Note: This requirement will be removed in a future version

#### Configuration
1. In *Project Options > Build > General*, set the **Target Framework** to **Android 12 (S)**

2. In *Project Options > Build > Android Application*, set **Target Android Version** to **Android 12.0 (API level 31)**

3. Open *AndroidManifest.xml* with Source Code Editor and make the following changes:


- *(Optional)*: if your app's `manifest` uses the `android:allowBackup` tag, add `tools:replace="android:allowBackup"`

- Set the minimum SDK version to 23 or higher, e.g. `android:minSdkVersion="23"`

- Add `tools:overrideLibrary="androidx.security"` to the `uses-sdk`. This will also require adding `xmlns:tools="http://schemas.android.com/tools"` to the `manifest` tag

- After making the above changes, your manifest may look similar to this:
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest 
    xmlns:android="http://schemas.android.com/apk/res/android" 
    xmlns:tools="http://schemas.android.com/tools"
    android:versionCode="1"
    android:versionName="1.0"
    package="com.veryfi.bindingapp">
	<uses-sdk android:minSdkVersion="23" android:targetSdkVersion="31" tools:overrideLibrary="androidx.security" />
	<application android:allowBackup="true" tools:replace="android:allowBackup" android:icon="@mipmap/ic_launcher" android:label="@string/app_name" android:roundIcon="@mipmap/ic_launcher_round" android:supportsRtl="true" android:theme="@style/AppTheme"></application>
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
	<uses-permission android:name="android.permission.INTERNET" />
</manifest>
```

---

### 4. Initialize Lens

1. import required symbols from Lens SDK
- **iOS:**
```js
using VeryfiLensiOS;
```
- **Android**:
```js
using Com.Veryfi.Lens;
using Com.Veryfi.Lens.Models;
using Org.Json;
```

2. Configure your [authentication credentials](/api/settings/keys/):
```js
const String CLIENT_ID = "XXX"; // replace XXX with your assigned Client Id
const String USERNAME = "XXX";  // replace XXX with your assigned Username
const String API_KEY = "XXX";   // replace XXX with your assigned API Key
const String URL = "XXX";       // replace XXX with your assigned Endpoint URL

var veryfiLensCredentials = new VeryfiLensCredentials
{
   ClientId = CLIENT_ID,
           Username = USERNAME,
           ApiKey = API_KEY,
           Url = URL
};
```
Please read our recommendations on how to secure your credentials [here](/lens/docs/flutter/#key-security)

3. Configure your Lens settings. Refer to the [full list](/lens/docs/flutter/#all-settings) of available settings later in this section.
```js
VeryfiLensSettings veryfiLensSettings = new VeryfiLensSettings
{
   AutoLightDetectionIsOn = false,
           BlurDetectionIsOn = true,
           ShowDocumentTypes = true
};
```

4. Initialize Lens:

- **iOS**: 
```js
VeryfiLens.Shared().ConfigureWithCredentials(veryfiLensCredentials, veryfiLensSettings);
```

- **Android**:
```js
VeryfiLens.Configure(Application, veryfiLensCredentials, veryfiLensSettings);
```

#### Available settings:
- `AutoCropGalleryIsOn`: forces document detection and auto cropping on documents imported from the image gallery (default: *false*)
- `AutoDeleteAfterProcessing`: if on, scanned files will be deleted once processing has completed (default:* false*)
- `AutoDocDetectionAndCropIsOn`: detects, highlights and crops documents automatically during camera image capture (default: *true*)
- `AutoLightDetectionIsOn`: if on the room ambience controls light to illuminate the document. Turn OFF for manual controls (default: *true*)
- `AutoRotateIsOn`: automatically rotates image so the contained document is correctly oriented (default: *false*)
- `BackupDocsToGallery`: uses photo gallery to backup each scans -- NOTE: must ask user for permission (default: *true*)
- `BlurDetectionIsOn`: checks if a picture captured has 20% or more blur - blurred receipts don't process well (default: *true*)
- `BoostModeIsOn`: flag that tells Veryfi whether boost mode should be enabled (default: *false*)
- `BoundingBoxesIsOn`: returns coordinates for where fields are located on the document (default: *false*)
- `BrowseIsOn`: enables/disables the browse option for submitting images from local or cloud storage connected to the device (default: *true*)
- `Categories`: optional list of custom categories for Veryfi to use for categorizing submitted documents (default: *null*)
- `ChecksBackIsOn`: enables/disables the capture of checks back side after front side is taken (default: *false*)
- `CloseCameraOnSubmit`: after submitting an image, the Lens camera view will be closed and user returned to the host app (default: *true*)
- `ConfidenceDetailsIsOn`: enable some scores about the confidence level of the inference (default: *false*)
- `DetectBlurResponseIsOn`: enables is_blurry which represents the model's assessment about whether the document is blurred or not (default: *false*)
- `DictateIsOn`: enables/disables the "Add by voice" option (default: *true*)
- `DocDetectFillUIColor`: document detection rectangle fill color (default: "*#9653BF8A"*)
- `DocDetectStrokeUIColor`: document detection rectangle stroke color (default: *null*)
- `EmailCCDomain`: the domain name used to power emailed documents (default: *"veryfi.cc"*)
- `EmailCCIsOn`: enables/disables the email cc view inside settings (default: *true*)
- `ExternalId`: a pass-through field to add a unique reference identifier for a scan which can be used to map back to your system (default: *""*)
- `GalleryIsOn`: enables/disables the photo gallery feature (default: *true*)
- `LocationServicesIsOn`: enables/disables location services to grab user's lat & lng (default: *true*)
- `ManualCropIsOn`: (Android only) toggles the option to manually crop an image before submitting it for processing (default: *true*)
- `MoreMenuIsOn`: enables/disables the showing of the more menu (default: *true*)
- `MoreSettingsMenuIsOn`: enables/disables the showing of the More > Settings option. NOTE: When this is FALSE all Settings come from the app, not the user (default: *true*)
- `MultipleDocumentsIsOn`: enables/disables processing multiple stitched images as different transactions, this requires stitchIsOn (default: *true*)
- `OriginalImageMaxSizeInMB`: maximum size in MB applied when producing images. Valid range is: 0.2 to 2.5 (default: *2.5*)
- `ReturnStitchedPDF`: provides path of stitched PDF (when multiple images are stitched for a single document) in the veryfiLensUpdate delegate function (default: *false*)
- `RotateDocIsOn`: enables option to rotate (on each press) a document by 90 degree clockwise (default: *true*)
- `SaveLogsIsOn`: stores logs on device. Recommended to be enabled to aid with debugging if required (default: *true*)
- `ShareLogsIsOn`: enables option on preview screen to share logs for debugging. Recommended to be disabled in production (default: *false*)
- `ShieldProtectionIsOn`: adds shield icon to capture button and adds an menu option inside More > What is Shield? (default: *true*)
- `ShowDocumentTypes`: enables/disables the documentTypes setting. When disabled, the default camera experience will be used and all documents will be treated as either a receipt, invoice or bill (auto-detected) (default: *false*)
- `StitchIsOn`: enables/disables the option to combine multiple receipts together into a PDF (default: *true*)
- `StitchedPDFPixelDensityMultiplier`: multiplier for the image resolution being drawn on the PDF. Valid range is: 1.0 to 5.0 (default: *2.0*)
- `SubmitButtonBackgroundColor`: color used for submit button background (default: *#005AC1*)
- `SubmitButtonBorderColor`: color used for submit button border (default: *#005AC1*)
- `SubmitButtonCornerRadius`: number used to set submit button corner radius (default: *30*)
- `SubmitButtonFontColor`: color used for submit button text (default: *#FFFFFF*)
- 
**NOTE**: In the case when the settings menu is disabled for the user (`moreSettingsMenuIsOn` is set to *false*), Lens will use the settings that it is initialized with. If the settings menu is enabled, the user will by default be presented with the configured values, but will be able to change these within the settings menu.

---

### 5. Working with Lens
1. Define event callbacks. Refer to the [full list](/lens/docs/xamarin/#all-events) of events available in the event handler later in this section.

- **iOS**:
```js
private class VeryfiLensDelegateListener : VeryfiLensDelegate
{
   public override void VeryfiLensClose(NSDictionary<NSString, NSObject> json)
   {
      System.Console.WriteLine("VeryfiLensClose: " + json.ToString());
   }

   public override void VeryfiLensError(NSDictionary<NSString, NSObject> json)
   {
      System.Console.WriteLine("VeryfiLensError: " + json.ToString());
   }

   public override void VeryfiLensSuccess(NSDictionary<NSString, NSObject> json)
   {
      System.Console.WriteLine("VeryfiLensSuccess: " + json.ToString());
   }

   public override void VeryfiLensUpdate(NSDictionary<NSString, NSObject> json)
   {
      System.Console.WriteLine("VeryfiLensUpdate: " + json.ToString());
   }
}
```

- **Android**:
```js
private class VeryfiLensDelegateListener : Java.Lang.Object, IVeryfiLensDelegate
{
    void IVeryfiLensDelegate.VeryfiLensClose(JSONObject json)
    {
        System.Console.WriteLine("VeryfiLensClose: " + json.ToString());
    }

    void IVeryfiLensDelegate.VeryfiLensError(JSONObject json)
    {
        System.Console.WriteLine("VeryfiLensError: " + json.ToString());
    }

    void IVeryfiLensDelegate.VeryfiLensSuccess(JSONObject json)
    {
        System.Console.WriteLine("VeryfiLensSuccess: " + json.ToString());
    }

    void IVeryfiLensDelegate.VeryfiLensUpdate(JSONObject json)
    {
        System.Console.WriteLine("VeryfiLensUpdate: " + json.ToString());
    }
}
```

2. Assign your event handler in Veryfi Lens:
- **iOS**:
```js
VeryfiLens.Shared().ShowCameraInViewController(this);
```
We recommend calling `ConfigureWithCredentials` and defining `VeryfiLensDelegate`
in the `ViewDidLoad` method and calling the `ShowCameraInViewController` on a user 
initiated action so Lens has time to set up.

- **Android**:
```js
VeryfiLens.ShowCamera();
```

#### Available events

Following are all the events that are communicated via the event handler assigned in `Verfyi.setDelegate()`.

- `VeryfiLensClose`: Fired when the Veryfi Lens camera has been closed, either as a result of submitting an image for processing, or the user closed the camera without submitting an image.

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

- `VeryfiLensUpdate`: during the processing of a document, this event will be raised multiple times. One time it will contain the thumbnail path for the submitted document, one time it will contain the original (submitted) image path and optionally, one time it will contain the stitched PDF path, if the user submitted more than one image for a document. In addition, multiple instances of this event will be fired containing the current upload progress percentage and other status updates.


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

- `VeryfiLensError`: if an error occurs during uploading or processing a submitted document, an error object is sent. If a general exception or crash is caught in Veryfi Lens, an exception object is sent instead.

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

- `VeryfiLensSuccess`: this event fires once a document has finished processing, whether it was submitted via the camera, the gallery, or it was dictated or entered/typed manually. This delegate provides the response from the Veryfi API.

Sample data:

```json
{
   "status": "done",
   "package_id": "edc8653e4c2b4ef1",
   "data": {"account_number": "", "bill_to_address": "", "bill_to_name": "", "card_number": "", "category": "Meals & Entertainment", "created": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment_display_name": "", "payment_terms": "", "payment_type": "", "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "vat_number": "", "vendor_logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "vendor_type": ""}}
}
```

Sample *dictated expense* data:
```json
{
   "status": "done",
   "package_id": "edc8653e4c2b4ef1",
   "data": {"account_number": "", "bill_to_address": "", "bill_to_name": "", "card_number": "", "category": "Meals & Entertainment", "created": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment_display_name": "", "payment_terms": "", "payment_type": "", "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "vat_number": "", "vendor_logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "vendor_type": ""}},
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
