var assert = require('assert'),
    request = require('request'),
    exec = require('child_process').exec,
    killCmd = require('../kill-cmd');

var i = 0;
function nextPort() {
  return 7000 + i++;
}

function getUrl(port) {
  return 'http://localhost:' + port + '/';
}

describe('redeployer', function () {
  var port, url, redeployUrl;

  beforeEach(function () {
    port = nextPort();
    url = getUrl(port);
    redeployUrl = url + 'redeploy';

    exec('node redeployer-sample.js ' + port);
  });

  it('redeploys application', function (done) {
    this.timeout(10000);

    setTimeout(function () {
      request(url, function (err, res, body) {
        assert.equal(err, null);
        assert.equal(body, '1');

        request(url, function (err, res, body) {
          assert.equal(err, null);
          assert.equal(body, '2');

          request(redeployUrl, function (err, res, body) {
            assert.equal(err, null);
            assert.equal(body, 'restarting server');

            setTimeout(function () {
              request(url, function (err, res, body) {
                assert.equal(err, null);
                assert.equal(body, '1');

                done();
              });
            }, 4000);
          });
        });
      });
    }, 1000);
  });

  afterEach(function () {
    exec(killCmd(port));
  });
});

