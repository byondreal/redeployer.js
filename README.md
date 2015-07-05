# redeployer.js
Express middleware for redeploying Node.js app

## What's it do?
Redeploy a running Node.js app by just hitting
a URL exposed by the app.

## Requirements
The app must be running from a git repository,
and `git pull` must be sufficient to pull new code.

## Usage
```js
var express = require('express'),
    redeployer = require('@byondreal/redeployer');

var app = express();

app.use('/redeploy', redeployer('forever restartall'));

app.listen(5000);
```
