const http = require("http");

const mysql = require("mysql2");
const PORT = process.env.PORT || 4444;

function getConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "TestDatabase",
    insecureAuth: true,
  });
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  var url = req.url;

  if (url === "/") {
    res.end(`<h1>Hello, World!</h1>
      <br>
      <a href="connect">Test Connection</a>
    `);
    res.end();
  } else if (url === "/connect") {
    const conn = getConnection();
    conn.connect((err) => {
      if (err) {
        console.error("Error connection");
        return;
      }

      conn.query("select * from users", (error, records, fields) => {
        if (error) throw error;
        console.log(records);
        res.end(`<pre>${JSON.stringify(records)}</pre>`);
        conn.end;
      });
    });
  } else {
    res.end("<h1>End, World!</h1>");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
