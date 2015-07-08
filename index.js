var sh = require('shelljs');
module.exports = function (command, cwd) {
  if (cwd) sh.cd(cwd);

  return function (req, res) {
    var output = '',
        result;

    result = sh.exec('git pull');
    output += result.output + '\n\n';
    if (result.code !== 0) return res.send(output);

    result = sh.exec('npm install --unsafe-perm');
    output += result.output + '\n\n';
    if (result.code !== 0) return res.send(output);

    setTimeout(function () {
      sh.exec(command);
      //if (sh.error()) sh.error().to('err.txt');
    }, 1000);

    res.send('Success:\n' + output);
  };
};

