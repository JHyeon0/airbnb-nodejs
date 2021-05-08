const express = require('express');
const routes = require('./routes');
const logger = require('morgan')('dev');

const app = express();

app.use(express.json());
app.use(logger);
app.use(routes); // Route 에 의존성을 가집니다.

app.use((err, req, res, next) => {
  const { status, message } = err;
  console.error(err);
  res.status(status || 500).json({ message });
});

module.exports = app;
