var sh = require('shelljs');
module.exports = function (command) {
  return function (req, res, next) {
    sh.exec('git pull');
    sh.exec('npm install --unsafe-perm');
    setTimeout(function () {
      sh.exec(command);
    }, 2000);
    res.send('restarting server');
  });
};

