# ![swagger-logo](./images/swagger-48x48.png) chrome-swagger-ui

Swagger UI packaged as a Chrome extension

Currently this extension allows the following:

- Download Open API specifications from a protected URL (using a `Bearer` token)
- Tests the API endpoints from CORS-enabled servers (by removing the `Origin` header from calls)

This extension is not published in the Chrome Web Store, but you can install it manually.

## How to install via packed crx file (not available for Windows and Mac)

1. Download the latest release from [here](https://github.com/rubensa/chrome-swagger-ui/releases).
2. Open Chrome, go to [chrome://extensions/](chrome://extensions/).
3. Drag and drop the downloaded file into the extensions page.

## How to install from source

1. `git clone https://github.com/rubensa/chrome-swagger-ui.git`
2. Open Chrome, go to [chrome://extensions/](chrome://extensions/).
3. Enable developer mode (checkbox on the top right).
4. Click on "Load unpacked extension...".
5. Select the project root directory.

## How to use

Once installed click in the extension icon and set the URL of the Open API specification.

If the specification is protected by a `Bearer` token, you can set it by clicking the "Authorize Spec" button near the "Explore" button in the top of the page.
If you leave it empty (or press "Cancel") it will be cleared and not used in any further specification requests.