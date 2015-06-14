var express = require('express'),
    redeployer = require('./'),
    killCmd = require('./kill-cmd');

var port = process.argv[2];

var app = express();
var command = killCmd(port) +
  ' && node redeployer-sample.js ' + port;
app.use('/redeploy', redeployer(command));

var i = 1;
app.get('/', function (req, res) {
  res.send(String(i++));
});
app.listen(port);

module.exports = app;

