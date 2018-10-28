# Honeybadger for Google Apps Scripts
A [Honeybadger](https://www.honeybadger.io/) client for Google Apps Scripts.

## Setup

### Add the library to your script

This library is already published as an Apps Script, making it easy to include in your project. To add it to your script, do the following in the Apps Script code editor:

Click on the menu item "Resources > Libraries..."
In the "Find a Library" text box, enter the script ID M4hoogS1IHPlDGE3VXDWwuTI3yRUM8Pyy and click the "Select" button.
Choose a version in the dropdown box (usually best to pick the latest version).
Click the "Save" button.

### Add script.external_request scope (optional)

If you are setting explicit scopes in your manifest file, ensure that the following scope is included:

https://www.googleapis.com/auth/script.external_request

### Add Honeybadger to `urlFetchWhitelist` key in `appscript.json` file (optional)

If you're whitelisting URLs accessible by UrlFetchApp make sure you add `"https://api.honeybadger.io/"` to `urlFetchWhitelist` key.

## Usage

### Initialize client

```javascript
Honeybadger.configure({
  apiKey: '[ YOUR API KEY HERE ]',
  // Honeybadger will use scriptLock (https://developers.google.com/apps-script/reference/lock/lock-service#getscriptlock) to prevent race conditions when multiple instances of script throw the same error.
  // Pass false if you care about performance
  lockToNotify: true,
});
```

### Send error notifications to Honeybadger

Unfortunately Google App Scripts don't provide a way to catch all unhandled exception, so you will need to wrap your function's code in try-catch like this:

```javascript
function yourFunction() {
  try {
    // Your code
  } catch(e) {
    Honeybadger.notify(e);
  }
}
```

You can also pass additional options to `notify` function:
```javascript
Honeybadger.notify(error, {
  fingerprint: 'custom_fingerprint' // Override default fingerprint
});
```

### Add execution context

You can pass additional context that will be sent alongside your notifications.
E.g.:
```javascript
Honeybadger.context({
  user_id: Session.getTemporaryActiveUserKey(),
  user_locale: Session.getActiveUserLocale(),
  user_email: Session.getActiveUser().getEmail()
});
```

## Tech Stack
- [google/clasp](https://github.com/google/clasp)
- [webpack](https://webpack.js.org/)
- [TypeScript](http://www.typescriptlang.org/)
- [TSLint](https://palantir.github.io/tslint/)
- [Prettier](https://prettier.io/)
- [Jest](https://facebook.github.io/jest/)

## Prerequisites
- [Node.js](https://nodejs.org/)
- [google/clasp](https://github.com/google/clasp)

## Development

### Clone the repository
```
git clone https://github.com/Bajena/honeybadger-gas.git <project_name>
```

### Install dependencies
```
cd <project_name>
npm install
yarn
```

### Configuration
#### Open `.clasp.json`, change scriptId
What is scriptId ? https://github.com/google/clasp#scriptid-required
```
{
  "scriptId": <your_script_id>,
  "rootDir": "dist"
}
```

### Development and build project
```
npm run build
```

### Push
```
clasp push
```

## License
This software is released under the MIT License, see LICENSE.txt.
