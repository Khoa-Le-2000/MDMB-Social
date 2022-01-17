const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");

const PORT = process.env.PORT || 4444;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

function getConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "TestDatabase",
    insecureAuth: true,
  });
}

app.get("/", (req, res) => {
  res.render("index", { users: [] });
});

app.get("/connect", (req, res) => {
  const conn = getConnection();
  conn.connect((err) => {
    if (err) {
      console.error("Error connection");
      return;
    }
    conn.query("select * from users", (error, records, fields) => {
      if (error) throw error;
      res.render("index", { users: records });
      conn.end;
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
