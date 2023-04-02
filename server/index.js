const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

// database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "W3nnm4rk09125@",
  database: "crud",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// displayData
app.get("/api/get", (req, res) => {
  const sqlGet = "Select * FROM crud_contact";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

// createData
app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "INSERT INTO crud_contact (name, email, contact) values (?, ?, ?)";
  db.query(sqlInsert, [name, email, contact], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

//Delete data

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.body;
  const sqlRemove = "DELETE FROM crud_contact WHERE id = ?";
  db.query(sqlRemove, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

//Selecting the data wanna update
app.get("/api/get/:id", (req, res) => {
  const sqlGet = "Select * FROM crud_contact WHERE id = ?";
  db.query(sqlGet, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// put method
app.put("/api/put/:id", (req, res) => {
  const { id } = req.params;
  const {name, email, contact} = req.body;
  const sqlUpdate = "Update crud_contact SET name = ?, email = ?, contact = ? WHERE id = ?"
  const sqlGet = "Select * FROM crud_contact WHERE id = ?";
  db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("Wenn Mark Recopelacion");
});


// port
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
