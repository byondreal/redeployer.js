var express = require('express'),
    redeployer = require('./');

var port = process.argv[2];

var app = express();
var command = 'kill -2 `' +
  'ps aux | ' +
  'grep \'node redeployer-sample.js ' + port + '\' | ' +
  'grep -v \'kill\' | ' +
  'head -1 | ' +
  'awk \'{ print $2 }\'' +
  '` && node redeployer-sample.js ' + port;
app.use('/redeploy', redeployer(command));

var i = 0;
app.get('/', function (req, res) {
  res.send(String(++i));
});
app.listen(port);

module.exports = app;

