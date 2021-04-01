const express = require('express');
const CLS = require('alscontext').CLS;

const cls = new CLS();

const requestIdMiddleware = (req, res, next) => {
  cls.run(new Map(), () => {
    cls.getStore().set('correlation-id', req.headers['correlation-id']);
    cls.getStore().set('service-agent', req.headers['service-agent']);
    next();
  });
};

function getAsyncID() {
  return cls.getStore().get('correlation-id');
}

function getAsyncgent() {
  return cls.getStore().get('service-agent');
}

const app = express();

app.use(requestIdMiddleware);

app.get('/', (req, res) => {
  res.json({
    id: getAsyncID(),
    agent: getAsyncgent(),
  });
});

app.listen(3000, () => {
  console.log(`Running on http://localhost:3000/`);
});
