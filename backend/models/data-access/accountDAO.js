const connection = require('./connection');
const Account = require('../account')

function getAccounts(Username, Callback) {

  var con = connection.createConnection();
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `SELECT * FROM Account Where (Email=? or Phone =?)`;
    con.query(sql, [Username, Username],
      function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          var acc = new Account.Account(result[0].AccountId, result[0].Password, result[0].Phone, result[0].Email, result[0].Name, result[0].Avatar, result[0].Birthday, result[0].Gender, result[0].CreatedDate);
          return Callback(acc);
        } else return Callback(false);
      });
  });
}

module.exports = {
  getAccounts
}