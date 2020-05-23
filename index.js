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

app.get("/api/users", (req, res, next) => {
    const sql = "select * from users"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          return res.status(400).json({"error":err.message})
        }
        return res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));