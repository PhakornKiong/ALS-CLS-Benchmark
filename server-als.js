const express = require('express');
const { AsyncLocalStorage } = require('async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();

const requestIdMiddleware = (req, res, next) => {
  asyncLocalStorage.run(new Map(), () => {
    asyncLocalStorage
      .getStore()
      .set('correlation-id', req.headers['correlation-id']);
    asyncLocalStorage
      .getStore()
      .set('service-agent', req.headers['service-agent']);
    next();
  });
};

function getAsyncID() {
  return asyncLocalStorage.getStore().get('correlation-id');
}

function getAsyncgent() {
  return asyncLocalStorage.getStore().get('service-agent');
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
