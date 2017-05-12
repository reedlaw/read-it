## Read It

### Running

Create a `.env` file with the following:

```
FIREBASE_API_KEY=***
FIREBASE_AUTH_DOMAIN=***
FIREBASE_DATABASE_URL=***
FIREBASE_MESSAGING_SENDER_ID=***
FIREBASE_PROJECT_ID=***
FIREBASE_STORAGE_BUCKET=***
NODE_ENV=development
```

If you're deploying to Heroku create all the same vars except `NODE_ENV` and with the addition of `GOOGLE_ANALYTICS_ID`.

`yarn install`.

Run with `export $(cat .env | xargs) && gulp`

## About

- Initially cloned from [este](https://github.com/este/este)@[dd6e3c289c1ce2cb03dcc157af2c80277cb9eeac](https://github.com/este/este/commit/dd6e3c289c1ce2cb03dcc157af2c80277cb9eeac)
