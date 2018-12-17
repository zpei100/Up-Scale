const cluster = require('cluster');
const cpuCount = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', function() {
    cluster.fork();
  });
} else {
  require('./index.js');
}
