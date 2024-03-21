const mysql = require("mysql");
const express = require("express");
const path = require("path");

const app = express();
const port = https://subham7bxng.github.io/login_from---fullstack/;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Golu1234",
  database: "login_from",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

app.use(express.json());
app.use(express.urlencoded());

app.post("/log", (req, res) => {
  const { name, contact, mail } = req.body;
  

  // Insert user data into MySQL
  const sql = "INSERT INTO login_details (name, contact, mail) VALUES (?, ?, ?)";
  connection.query(sql, [name, contact, mail], (err, result) => {
    if (err) {
      console.error("Error inserting user: " + err.stack);
      res.status(500).json({ error: "Error inserting user" });
      return;
    }
    res.send("Thanku your details loged in");
    // console.log("User inserted with id: " + result.insertId);
    // res.status(201).json({ message: "User inserted successfully" });
  });
});

app.listen(https://subham7bxng.github.io/login_from---fullstack/, () => {
  console.log("The server is running on port: " + port);
});
