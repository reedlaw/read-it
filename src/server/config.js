// @flow
// www.andrewsouthpaw.com/2015/02/08/environment-variables/
import nconf from 'nconf';

// Use less-terrible separator character, stackoverflow.com/questions/25017495
nconf.env('__');

// For local development, we can override defaults easily. Rename
// src/common/_config.json to src/common/config.json and uncomment next line.
// nconf.file('src/common/config.json');

// Remember, never put secrets in the source code. Use environment variables for
// production or src/common/config.json for development instead.
nconf.defaults({
  appName: require('../../package.json').name,
  // Use appVersion defined in gulp env task or Heroku dyno metadata.
  appVersion: process.env.appVersion || process.env.HEROKU_SLUG_COMMIT,
  defaultLocale: 'en',
  firebase: {
    // To get the config, just click Add web app from the overview page.
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  },
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  isProduction: process.env.NODE_ENV === 'production',
  locales: ['en'],
  port: process.env.PORT || 3000,
  // Enable hot reload on remote device. Note it prevents offline testing,
  // because it depends on ip.address(), which doesn't work with disabled wifi.
  // How do we access a website running on localhost from mobile browser?
  // stackoverflow.com/questions/3132105
  remoteHotReload: true,
  sentryUrl: 'https://f297cec9c9654088b8ccf1ea9136c458@app.getsentry.com/77415',
});

export default nconf.get();
