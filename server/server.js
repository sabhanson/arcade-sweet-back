const express = require('express');
const path = require('path');
// const MongoStore = require("connect-mongo");
// const session = require('express-session')
const routes = require('./controller');
const mongoose = require('./config/connection');
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});