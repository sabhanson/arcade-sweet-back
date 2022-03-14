const express = require('express');
const path = require('path');
const routes = require('./controller');
const mongoose = require('./config/connection');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

console.log("PORT = "+process.env.PORT);
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