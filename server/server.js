const express = require('express');
const path = require('path');
const MongoStore = require("connect-mongo");
const token = require('./controller/utils/token');
const session = require('express-session')
const routes = require('./controller');
const mongoose = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
  secret: 'Super secret secret',
  cookie: {maxAge: 1000*60*10},
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
    dbName: "arcade-sweet",
    collectionName: "sessions",
    stringify: false,
    autoRemove: "interval",
    autoRemoveInterval: 1
    })
};

token.setKey();
app.use(session(sess));

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