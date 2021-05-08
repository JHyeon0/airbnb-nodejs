const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 8000;

const startServer = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}.`));
  } catch (err) {
    console.error(err);
  }
};

startServer();
