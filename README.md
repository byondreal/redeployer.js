# redeployer.js
Express middleware for redeploying Node.js app

# What's it do?
Redeploy a running Node.js app by just hitting a URL exposed by the app

# Usage
```js
var express = require('express'),
    redeployer = require('@byondreal/redeployer');

var app = express();

app.use(redeployer('/redeploy', 'forever restartall'));

app.listen(5000);
```
