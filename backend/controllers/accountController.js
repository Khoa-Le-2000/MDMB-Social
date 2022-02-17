const Account = require("../models/account");
const AccountDAO = require("../models/data-access/accountDAO");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

function login(req, res) {
  var Username = req.body.Username;
  var Password = req.body.Password;
  AccountDAO.getAccount(Username, (Account) => {
    if (Account == false) res.status(401).send({ result: 'login failure' });
    else {
      let acccount = Account;
      bcrypt.compare(Password, acccount.Password, function (err, result) {
        // result == true
        if (result == true) {
          sendToken(req, res, Account);
        } else res.status(401).send({ result: 'login failure' });
      })
    }
  });
}
function loginByGoogle(req, res) {
  let token = req.body.token;
  if (token) {
    const client = new OAuth2Client(process.env.CLIENT_ID);

    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.clientID,
      }, (err, ticket) => {
        if (err) {
          // console.log(err);
          return res.status(401).send({ result: 'Invalid token' });
        } else {
          const payload = ticket.getPayload();
          const Email = payload['email'];
          AccountDAO.getAccountByEmail(Email, (Account) => {
            if (Account == false) {
              res.status(200).send({ result: "login failure" })
              //create account
              // let Name = payload['name'];
              // let Avatar = payload['picture'];
              // let CreatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
              // AccountDAO.CreateAccount(null, null, Email, Name, Avatar, null, null, CreatedDate);
              // AccountDAO.getAccountByEmail(Email, (Account) => {
              //   sendToken(req, res, Account);
              // })
            }
            else {
              sendToken(req, res, Account);
            }
          });
        }
      });
    }
    verify().catch(console.error);
  } else {
    res.status(401).send({ result: 'No token provided' });
  }
}
function loginByFaceBook(req, res) {
  let user = req.user;
  if (user) {
    let Email = user.emails[0].value;
    AccountDAO.getAccountByEmail(Email, (Account) => {
      if (Account == false) {
        res.status(401).send({ result: "login failure" });
        // let Name = user.displayName;
        // let Gender = user.gender;
        // let Avatar = user.photos[0].value;
        // let CreatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        // AccountDAO.CreateAccount(null, null, Email, Name, Avatar, null, Gender, CreatedDate);
        // AccountDAO.getAccountByEmail(Email, (Account) => {
        //   sendToken(req, res, Account);
        // })
      } else {
        sendToken(req, res, Account);
      }
    })
  }
  else {
    res.status(401).send({ result: 'No token provided' });
  }

}
function sendToken(req, res, Account) {
  let accessToken = jwt.sign({ id: Account.AccountId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  let refreshToken = jwt.sign({ id: Account.AccountId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
  res.status(200).send({
    accessToken: accessToken,
    refreshToken: refreshToken
  });
}

module.exports = {
  login,
  loginByGoogle,
  loginByFaceBook
}
