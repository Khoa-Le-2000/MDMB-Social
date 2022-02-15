const connection = require('./connection');
const Account = require('../account')

function getAccount(Username, Callback) {

  var con = connection.createConnection();
  con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
    var sql = `SELECT * FROM Account Where (Email=? or Phone =?)`;
    con.query(sql, [Username, Username],
      function (err, result) {
        connection.closeConnection(con);
        if (err) throw err;
        if (result.length > 0) {
          var acc = new Account.Account(result[0].AccountId, result[0].Password, result[0].Phone, result[0].Email, result[0].Name, result[0].Avatar, result[0].Birthday, result[0].Gender, result[0].CreatedDate);
          return Callback(acc);
        } else return Callback(false);
      });
  });
}
function getAccountByEmail(Email, Callback) {

  var con = connection.createConnection();
  con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
    var sql = `SELECT * FROM Account Where (Email=?)`;
    con.query(sql, [Email],
      function (err, result) {
        connection.closeConnection(con);
        if (err) throw err;
        if (result.length > 0) {
          var acc = new Account.Account(result[0].AccountId, result[0].Password, result[0].Phone, result[0].Email, result[0].Name, result[0].Avatar, result[0].Birthday, result[0].Gender, result[0].CreatedDate);
          return Callback(acc);
        } else return Callback(false);
      });
  });
}
function CreateAccount(Password, Phone, Email, Name, Avatar, Birthday, Gender, CreatedDate) {

  var con = connection.createConnection();
  con.connect(function (err) {
    if (err) throw err;
    var sql = `insert into MDMB.Account(Password, Phone, Email, Name, Avatar, Birthday, Gender, CreatedDate) values(?,?,?,?,?,?,?,?)`;
    con.query(sql, [Password, Phone, Email, Name, Avatar, Birthday, Gender, CreatedDate],
      function (err, result) {
        connection.closeConnection(con);
        if (err) throw err;
      });
  });
}
module.exports = {
  getAccount,
  getAccountByEmail,
  CreateAccount
}