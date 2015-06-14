var request = require('request'),
    sh = require('shelljs');

var i = 0;
function nextPort() {
  return 5000 + i++;
}

function getUrl(port) {
  return 'http://localhost:' + port + '/';
}

function test(url, result, next) {
  request(url, function (err, res, body) {
    if (body === result) next();
  });
}

describe('redeployer', function () {
  it('redeploys application', function (done) {
    var port = nextPort(),
        url = getUrl(port),
        redeployUrl = url + 'redeploy';

    sh.exec('node sample.js ' + port);
    test(url, '1', function () {
      test(url, '2', function () {
        test(redeployUrl, 'restarting server', function () {
          setTimeout(function () {
            test(url, '1', done);
          }, 4000);
        });
      });
    });
  });
});

