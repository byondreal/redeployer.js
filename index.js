var sh = require('shelljs');
module.exports = function (command, cwd) {
  if (cwd) sh.cd(cwd);

  return function (req, res) {
    sh.exec('git pull');
    if (sh.error()) return res.send(sh.error());

    sh.exec('npm install --unsafe-perm');
    if (sh.error()) return res.send(sh.error());

    setTimeout(function () {
      sh.exec(command);
      //if (sh.error()) sh.error().to('err.txt');
    }, 1000);

    res.send('restarting server');
  };
};

