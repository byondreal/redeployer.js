module.exports = function (port) {
  return 'kill -2 `' +
  'ps aux | ' +
  'grep \'node redeployer-sample.js ' + port + '\' | ' +
  'grep -v \'kill\' | ' +
  'grep -v \'bin.sh\' | ' +
  'head -n -1 | ' +
  'awk \'{ print $2 }\' | ' +
  'paste -s -d" " -' +
  '`';
};

