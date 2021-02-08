const express = require('express');

function getExpressMiddleware() {
  return (req, res, next) => {
    req['correlation-id'] = req.headers['correlation-id'];
    req['service-agent'] = req.headers['service-agent'];
    next();
  };
}

function getID(req) {
  return req['correlation-id'];
}

function getAgent(req) {
  return req['service-agent'];
}

const app = express();

app.use(getExpressMiddleware());

app.get('/', (req, res) => {
  res.json({
    id: getID(req),
    agent: getAgent(req),
  });
});

app.listen(3000, () => {
  console.log(`Running on http://localhost:3000/`);
});
