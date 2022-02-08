const Account = require('../models/account');
const AccountDAO = require('../models/data-access/accountDAO');
const jwt = require('jsonwebtoken');
const base64url = require('base64url')

function login(req, res) {
  var Username = req.body.Username;
  var Password = req.body.Password;
  AccountDAO.getAccounts(Username, Password, (Account) => {
    //login by email/phone
    if (Account == -1) res.send('Account not registed');
    if (Account == false) res.send('login failure');
    else {
      let payload = Account;
      let token = jwt.sign(JSON.stringify(payload), "secret");
      res.send(token);
    }
  });
}
module.exports = {
  login
}