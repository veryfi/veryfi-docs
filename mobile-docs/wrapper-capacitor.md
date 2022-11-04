#### Table of Content

1. [Add Lens Framework to your project](/lens/docs/capacitor/#add-lens)
2. [Add Capacitor to your project (Optional if you already did it)](/lens/docs/capacitor/#add-capacitor)
3. [Platform-specific Configuration: iOS](/lens/docs/capacitor/#configuration-ios)
4. [Platform-specific Configuration: Android](/lens/docs/capacitor/#configuration-android)
5. [Initialize Lens](/lens/docs/capacitor/#init)
6. [Communicating with Lens](/lens/docs/capacitor/#communicating)
7. [Launching Lens](/lens/docs/capacitor/#launching-lens)
8. [Key security best practices](/lens/docs/capacitor/#key-security)

> Keys: an access key is required to use this service. If you do not have one, you can [generate a key](/api/settings/keys/) now.

---

### 1. Adding Lens SDK to your project.

Go to your project’s root folder and install the Lens SDK:

1. Configure the npm registry location and credentials.
   
Replace `[NPM_USERNAME]` and `[NPM_PASSWORD]` with your npm credentials.

```shell
npm config set @veryfi:registry https://nexus.veryfi.com/repository/npm/
npm config set _auth $(echo -n '[NPM_USERNAME]:[NPM_PASSWORD]' | openssl base64 -A) --registry=https://nexus.veryfi.com/repository/npm/
```

2. Add the plugin to your Capacitor project:
```shell
npm i @veryfi/veryfi-lens-capacitor@[VERSION]
```

**NOTE:** Replace `[VERSION]` with the actual version of the plugin you wish to add to your project, e.g. `2.0.0`

---

### 2. Add Capacitor to your project (optional if this has already been done)
Install Capacitor dependency and init Capacitor:
```shell
npm install @capacitor/cli @capacitor/core
npx cap init
```
Install the native platforms you want to support:
```shell
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```


---

### 3. Platform-specific Configuration: iOS
1. Run the following command on the root folder of your project to build the project and fetch the iOS dependencies:
```shell
npm run build
npx cap sync
```

2. Go to the generated iOS folder → Open App folder and edit the iOS Podfile.

Add these sources to be able to fetch the iOS dependencies:
```shell
source 'https://repo.veryfi.com/shared/lens/veryfi-lens-podspec.git'
source 'https://github.com/CocoaPods/Specs.git'
```
Add these pod dependencies:
```shell
pod 'VeryfiLens'
pod 'AWSS3'
```
**NOTE**: You need valid credentials to pull the Lens SDK from Veryfi's private repository. You can manage your credentials [here](/api/settings/keys/#package-managers-container).

You can store your credentials with the `git credential` tool, so you don’t need to log in each time you install or update Lens. Here's one example of using this tool (replace `USERNAME` and `PASSWORD` with your credentials):

```shell
git credential approve <<EOF
protocol=https
host=repo.veryfi.com
path=shared/lens/veryfi-lens-podspec.git
username=USERNAME
password=PASSWORD

EOF
```

3. Run this command on the iOS App folder to fetch the iOS dependencies:
```shell
pod install --repo-update
```

4. Run this command from the root folder of the project to sync the native app with the project files:
```shell
npx cap sync
```

5. Go to the generated iOS folder → Open App -> Open the Runner.xcworkspace, select the Pods project go to:

Targets > VeryfiLens > Build Settings, scroll down to the Build Options section, and configure the following:


Go to iOS folder and add this to your Info.plist file:

```xml
<key>NSCameraUsageDescription</key>
<string>Scan Documents</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Helps to identify places around you</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Helps to identify places around you</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Access Photo Gallery for Document Backups</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Access Photo Gallery for Document Uploads</string>
<key>NSContactsUsageDescription</key>
<string>Add your ___@veryfi.cc assigned email address for reference</string>
<key>NSCalendarsUsageDescription</key>
<string>Enrich your data with business meetings and events from your Calendar</string>
```

---

###  4. Platform-specific Configuration: Android
1. Add [your credentials](/api/settings/keys/) as environment variables (Replace XXXX with your credentials):
```js
export MAVEN_VERYFI_USERNAME=XXXX
export MAVEN_VERYFI_PASSWORD=XXXX
```

2. Add the following lines to the build.gradle on the repositories sections:
```js
maven {
  url "https://nexus.veryfi.com/repository/maven-releases/"
  credentials {
    username = System.getenv("MAVEN_VERYFI_USERNAME")
    password = System.getenv("MAVEN_VERYFI_PASSWORD")
  }
  authentication {
    basic(BasicAuthentication)
  }
}
```
3. Go to the Android folder and update the following lines on the app/build.gradle:

Update the minSdkVersion to 23 inside the defaultConfig of the android section:
```js
android {
  defaultConfig {
    minSdkVersion 23
  }
}
```

Enable data binding:
```js
android {
  buildFeatures { viewBinding = true }
}
```

Add Android Lens dependency:
```js
implementation 'com.veryfi.lens:veryfi-lens-sdk:[VERSION]'
```

**NOTE**: Replace `[VERSION]` with the actual version of the Android Lens you wish to add to your project, e.g. `2.0.0`

---
### 5. Initialize Lens

1. Import required symbols from Lens SDK:
```js
import '@veryfi/veryfi-lens-capacitor';
import { VeryfiLensCapacitor } from '@veryfi/veryfi-lens-capacitor';
```

2. Configure your authentication credentials:
```js
const veryfiLensCredentials = {
    "clientId": "XXXX", // replace XXXX with your assigned Client Id
    "userName": "XXXX", // replace XXXX with your assigned Username 
    "apiKey": "XXXX", // replace XXXX with your assigned API Key 
    "url": "XXXX" // replace XXXX with your assigned Endpoint URL
};
```

3. Configure your Lens settings:
```js
const veryfiLensSettings = {
    "blurDetectionIsOn": true,
    "autoLightDetectionIsOn": false,
};
```
4. Initialize Lens:
```js
const options = {
      credentials: veryfiLensCredentials,
      settings: veryfiLensSettings
};
VeryfiLensCapacitor.veryfiInitLens(options)
```

---

### 6. Communicating with Lens
1. Veryfi Lens provides a camera experience that allows users to capture and submit documents for data extraction and enrichment. Lens communicates the activities performed by the user, the various progress stages and status updates, and also the final results of the data extraction process asynchronously, with the help of events.

To capture all events from Lens, your app will need to listen to the four-event types defined below.
```js
veryfiLensClose
veryfiLensError
veryfiLensSuccess
veryfiLensUpdate
```
The following example simply logs all data received from all Lens events. This implementation will need to be adapted to do something that is more meaningful to your app's users.

```js
//Set the events delegate.
VeryfiLensCapacitor.setLensEventDelegate();
//Do something with the response and event types.
VeryfiLensCapacitor.addListener("veryfiLensClose", (data: Object) => {
      console.log("veryfiLensClose");
      console.log(data);
});
VeryfiLensCapacitor.addListener("veryfiLensError", (data: Object) => {
      console.log("veryfiLensError");
      console.log(data);
});
VeryfiLensCapacitor.addListener("veryfiLensSuccess", (data: Object) => {
      console.log("veryfiLensSuccess");
      console.log(data);
});
VeryfiLensCapacitor.addListener("veryfiLensUpdate", (data: Object) => {
      console.log("veryfiLensUpdate");
      console.log(data);
});
```

#### Available Event Types
- **veryfiLensClose**

  The Veryfi Lens camera has been closed, either as a result of submitting an image for processing, or the user closed the camera without submitting an image.

Sample data:
```json
{
  "status": "close",
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

- **veryfiLensUpdate**
  
During the processing of a document, this delegate will be fired multiple times. One time it will contain the thumbnail path for the submitted document and one time it will contain a full-size image path. In addition, multiple instances of this delegate will be fired containing the current upload progress percentage.

Sample package created notification:
```json
{
  "status": "start",
  "package_id": "edc8653e4c2b4ef1"
}
```
Sample thumbnail path notification:

```json
{
  "status": "inprogress",
  "msg": "img_thumbnail_path",
  "data": "\/var\/mobile\/Containers\/Data\/Application\/687bce06-bd62-4c\/Documents\/thumbnail.jpg",
  "package_id": "edc8653e4c2b4ef1"
}
```

Sample full-size image path data:

```json
{
  "status": "inprogress",
  "msg": "img_original_path",
  "data": "\/var\/mobile\/Containers\/Data\/Application\/687bce06-bd62-4c\/Documents\/image.jpg",
  "package_id": "edc8653e4c2b4ef1"
}
```

Sample upload progress percentage data:
```json
{
  "status": "inprogress",
  "msg": "progress",
  "data": 68,
  "package_id": "edc8653e4c2b4ef1"
}
```

Sample package removed notification data:
```json
{
  "status": "removed",
  "msg": "clear_package",
  "package_id": "edc8653e4c2b4ef1"
}
```

- **veryfiLensError**

If an error occurs during uploading or processing a submitted document, an error object is sent. If a general exception or crash is caught in Veryfi Lens, an exception object is sent instead.

Sample error data:

```json
{
  "status": "error",
  "package_id": "edc8653e4c2b4ef1",
  "error": "{\"status\":\"error\",\"message\":\"Failed to initialize AWS\",\"uploadId\":\"0921a75550504d2e\",\"code\":\"301\"}"
}
```

Sample exception data:

```json
{
  "status": "error",
  "package_id": "edc8653e4c2b4ef1",
  "exception": "java.lang.IllegalArgumentException: Cannot create enum from value!\n\tat com.amazonaws.regions.Regions.fromName(Regions.java:126)\n\tat com.veryfi.lens.helpers.RegionHelper.getRegion(RegionHelper.kt:28)\n\tat com.veryfi.lens.service.UploadDocumentsService.setAccelerateModeEnable(UploadDocumentsService.kt:94)\n\tat com.veryfi.lens.service.UploadDocumentsService.onUploadType(UploadDocumentsService.kt:186)\n\tat com.veryfi.lens.service.UploadDocumentsService.onStartCommand(UploadDocumentsService.kt:161)\n\tat android.app.ActivityThread.handleServiceArgs(ActivityThread.java:4236)\n\tat android.app.ActivityThread.access$1800(ActivityThread.java:231)\n\tat android.app.ActivityThread$H.handleMessage(ActivityThread.java:1925)\n\tat android.os.Handler.dispatchMessage(Handler.java:106)\n\tat android.os.Looper.loop(Looper.java:223)\n\tat android.app.ActivityThread.main(ActivityThread.java:7478)\n\tat java.lang.reflect.Method.invoke(Native Method)\n\tat com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:549)\n\tat com.android.internal.os.ZygoteInit.main(ZygoteInit.java:941)\n"
}
```

- **veryfiLensSuccess**

This delegate fires once a document has finished processing, whether it was submitted via the camera, the gallery, or it was dictated or entered/typed manually. This delegate provides the response from the Veryfi API.

Sample data:

```json
{
  "status": "done",
  "package_id": "edc8653e4c2b4ef1",
  "data": {"account_number": "", "bill_to": {"address": "", "name": "",}, "card_number": "", "category": "Meals & Entertainment", "created_date": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment": {"card_number": "", "display_name": "No Payment,", "type": "no_payment,"}, "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "type": "", "vat_number": ""}},
}
```

Sample dictated expense data:
```json
{
  "status": "done",
  "package_id": "edc8653e4c2b4ef1",
  "data": {"account_number": "", "bill_to": {"address": "", "name": "",}, "card_number": "", "category": "Meals & Entertainment", "created_date": "2021-01-14 05: 19: 51", "currency_code": "USD", "date": "2021-01-14 05: 19: 51", "delivery_date": "", "discount": 0, "due_date": "", "external_id": "", "id": 31428417, "img_file_name": "xxxxxxxxx.png", "img_thumbnail_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx_t.png", "img_url": "https: \/\/cdn.veryfi.com\/partner-receipts\/xxxxxxxxx.png", "incoterms": "", "insurance": "", "invoice_number": "", "line_items": [], "notes": "", "ocr_text": "starbucks 23.4", "order_date": "", "payment": {"card_number": "", "display_name": "No Payment,", "type": "no_payment,"}, "phone_number": "", "purchase_order_number": "", "reference_number": "VBDEC-0000", "service_end_date": "", "service_start_date": "", "ship_date": "", "shipping": 0, "subtotal": 23.4, "tags": [], "tax": 0, "tip": 0, "total": 23.4, "total_weight": "", "vendor": {"abn_number": "", "address": "", "fax_number": "", "logo": "https: \/\/cdn.veryfi.com\/logos\/us\/910419611.png", "name": "Starbucks", "phone_number": "", "raw_name": "Starbucks", "type": "", "vat_number": ""}},
  "type":"dictation"
}
```
---

#### 7. Launching Lens

This function call launches the Veryfi Lens camera experience to allow users to capture and submit documents.
```js
VeryfiLensCapacitor.showCamera();
```

---
#### 8.  Key security best practices
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
