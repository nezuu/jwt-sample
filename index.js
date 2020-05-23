const express = require('express');
const app = express();
const port = 5000;
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());

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

// ユーザー一覧取得
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

// ユーザー登録
app.post('/api/auth/register/', (req, res) => {
  const insert = 'INSERT INTO USERS (name, email, password) VALUES (?,?,?)'
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    db.run(insert, [req.body.name,req.body.email,hash],(err) => {
      if (err) {
        return res.status(400).json({"error":err.message});
      }
      return res.json({
        "message": "create User successfully",
        "data": [req.body.name, req.body.email]
      })
    })
  })
})

// ユーザー認証
app.post('/api/auth/login/',(req,res) => {
  const sql = 'select * from users where email = ?'
  const params = [req.body.email]
  db.get(sql, params, (err, user) => {
    if (err) {
      return res.status(400).json({"error":err.message});
    }
    if(!user){
      return res.json({"message": "email not found"})
    }
    bcrypt.compare(req.body.password, user.password, (err,result) => {
      if (err) {
        return res.status(400).json({"error":err.message});
      }
      if (!result) {
        return res.json({"message" : "password is not correct"})
      }
      return res.json({"message" : "password is correct"})
    })
  })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));