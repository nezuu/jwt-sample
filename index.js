const express = require('express');
const app = express();
const port = 5000;

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 1;

const db = new sqlite3.Database('./database/database.sqlite3',
(err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

// const insert = 'INSERT INTO USERS (name, email, password) VALUES (?,?,?)'

// bcrypt.hash("password", saltRounds, (err, hash) => {
//   db.run(insert, ["higa", "higa@example.com", hash])
// });

app.get('/', (request, response) => response.send('こんにちは！せかい！'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));