const Account = require('../models/account');
const AccountDAO = require('../models/data-access/accountDAO');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');

function login(req, res) {
  var Username = req.body.Username;
  var Password = req.body.Password;
  AccountDAO.getAccount(Username, (Account) => {
    if (Account == false) res.send({ result: 'login failure' });
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
        } else res.send({ result: 'login failure' });
      })
    }
  });
}
function loginByGoogle(req, res) {
  let token = req.body.token;
  if (token) {
    const client = new OAuth2Client(process.env.clientID);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.clientID,
      });
      const payload = ticket.getPayload();
      const Email = payload['email'];
      AccountDAO.getAccountByGoogleEmail(Email, (Account) => {
        if (Account == false) res.send({ result: 'login failure' });
        else {
          let accessToken = jwt.sign({ id: Account.AccountId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
          let refreshToken = jwt.sign({ id: Account.AccountId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
          res.send({
            accessToken: accessToken,
            refreshToken: refreshToken
          });
        }
      })
    }
    verify().catch(console.error);
  } else {
    res.send({ result: 'No token provided' });
  }
}
module.exports = {
  login,
  loginByGoogle
}