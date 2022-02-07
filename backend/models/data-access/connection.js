var mysql = require('mysql');

var con = mysql.createConnection({
  host: "54.169.145.140",
  user: "admin",
  password: "qwer1234",
  database: "MDMB",
  insecureAuth: true,
});
module.exports = con;