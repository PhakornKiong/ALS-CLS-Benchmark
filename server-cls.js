const express = require('express');
const createNamespace = require('cls-hooked').createNamespace;
const ns = createNamespace('ns');

function getExpressMiddleware() {
  return (req, res, next) => {
    ns.bindEmitter(req);
    ns.bindEmitter(res);
    ns.run(() => {
      ns.set('correlation-id', req.headers['correlation-id']);
      ns.set('service-agent', req.headers['service-agent']);
      next();
    });
  };
}

function getID() {
  return ns.get('correlation-id');
}

function getAgent() {
  return ns.get('service-agent');
}

const app = express();

app.use(getExpressMiddleware());

app.get('/', (req, res) => {
  res.json({
    id: getID(),
    agent: getAgent(),
  });
});

app.listen(3000, () => {
  console.log(`Running on http://localhost:3000/`);
});
