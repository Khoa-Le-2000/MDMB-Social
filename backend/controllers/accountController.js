const Account = require('../models/account');
const AccountDAO = require('../models/data-access/accountDAO');
const jwt = require('jsonwebtoken');
const base64url = require('base64url')

function login(req, res) {
  var Username = req.body.Username;
  var Password = req.body.Password;
  AccountDAO.getAccounts(Username, (Account) => {
    if (Account == false) res.send('login failure');
    else {
      let acccount = Account;
      bcrypt.compare(Password, acccount.Password, function (err, result) {
        // result == true
        if (result == true) {
          let accessToken = jwt.sign({ id: acccount.AccountId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
          let refreshToken = jwt.sign({ id: acccount.AccountId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
          res.send({
            accessToken: accessToken,
            refreshToken: refreshToken
          });
        } else res.send('login failure');
      })
    }
  });
}
module.exports = {
  login
}