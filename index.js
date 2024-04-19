const mysql = require("mysql");
const express = require("express");
const path = require("path");

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

const connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
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
    res.send("Thanku your details loged in");;
  });
});

app.listen(4000, () => {
  console.log("The server is running on port: " + port);
});
