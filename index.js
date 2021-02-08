'use strict';

const autocannon = require('autocannon');
let id = 0;

function setHeader(client) {
  client.setHeaders({
    'correlation-id': id++,
    'service-agent': 'Chrome',
  });
}

const instance = autocannon(
  {
    url: 'http://localhost:3000',
    connections: 10,
    pipelining: 1,
    duration: 10,
    setupClient: setHeader,
  },
  (err, res) => {
    console.log(res);
  }
);

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
  instance.stop();
});

// just render results
autocannon.track(instance, { renderProgressBar: true });
