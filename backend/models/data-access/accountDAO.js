const con = require('./connection');
const Account = require('../account')

function getAccounts(req, res) {
  var Accounts = [];
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM Account;", function (err, result) {
      if (err) throw err;
      for (i = 0; i < result.length; i++) {
        let acc = new Account.Account(result[i].AccountId, result[i].Password, result[i].Phone, result[i].Email, result[i].Name, result[i].Avatar, result[i].Birthday, result[i].Gender, result[i].CreatedDate);
        Accounts.push(acc);
      }
      var data = JSON.stringify(Accounts);
      res.status(200).send(data);
    });
  });
}

module.exports = {
  getAccounts
}