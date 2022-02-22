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
          return res.status(401).send({ result: 'Invalid token' });
        } else {
          const payload = ticket.getPayload();
          const Email = payload['email'];
          AccountDAO.getAccountByEmail(Email, (Account) => {
            if (Account == false) {
              res.status(200).send({ result: "login failure" })
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
      } else {
        sendToken(req, res, Account);
      }
    })
  }
  else {
    res.status(401).send({ result: 'No token provided' });
  }

}
//send Token
function sendToken(req, res, Account) {
  let accessToken = jwt.sign({ id: Account.AccountId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  let refreshToken = jwt.sign({ id: Account.AccountId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
  res.status(200).send({
    accessToken: accessToken,
    refreshToken: refreshToken
  });
}
//register
function register(req, res) {
  let Name = req.body.Name;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let Password = req.body.Password;

  //regex
  let regName = /^((?![0-9\~\!\@\#\$\%\^\&\*\(\)\_\+\=\-\[\]\{\}\;\:\"\\\/\<\>\?]).){2,45}/;
  let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,45}))$/;
  let regPhone = /(84|0[3|5|7|8|9])+([0-9]{8})$/;
  let regPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,60})$/

  if (!Name || !Email || !Phone || !Password || Name.trim() == null || Email.trim() == null || Password.trim() == null || Phone.trim() == null) {
    res.status(401).send({
      result: "incorrect format for: empty value",
      description: `Not allow empty value for${(!Name || Name.trim() == null) ? " Name" : ""}${(!Email || Email.trim() == null) ? " Email" : ""}${(!Password || Password.trim() == null) ? " Password" : ""}${(!Phone || Phone.trim() == null) ? " Phone" : ""}`
    })
    return;
  }

  if (!regName.test(Name)) {
    res.status(401).send({
      result: "incorrect format for: Name",
      description: 2 <= Name.length && Name.length <= 45 ? "Valid name not contain special character such as @-!#..." : "Name length not valid: at least 2 char"
    })
    return;
  }
  if (!regEmail.test(Email)||Email.length>45) {
    res.status(401).send({
      result: "incorrect format for: Email",
      description: Email.length <= 45 ? "Valid Email look like this: 123@gmail.com" : "Email length < 45"
    })
    return;
  }
  if (!regPhone.test(Phone)) {
    res.status(401).send({
      result: "incorrect format for: Phone",
      description: `${(10 == Phone.length) ? "Valid Phone look like this: 098333****" : "Phone length 10 char"}`
    })
    return;
  }
  if (!regPass.test(Password)) {
    res.status(401).send({
      result: "incorrect format for: Password",
      description: `${6 <= Password.length && Password.length <= 45 ? "Valid Password must contains a Uppercase, a lowercase, and a number" : "Password length 6-45 char"}`
    })
    return;
  }
  AccountDAO.getAccountId( Email,Phone, (result) => {
    console.log(result)
    if (result) res.status(401).send({ result: 'account existed', description: "account existed" })
    else {
      Email=Email.toLowerCase();
      bcrypt.hash(Password, 10).then((hash) => {
        AccountDAO.createAccount(hash, Phone.trim(), Email.trim(), Name.trim(), (rs) => {
          if (rs) res.status(200).send({ result: 'register succesful',description:'register succesful' });
          else res.status(401).send({ result: 'register failed', description: "must be some error..." })
        })
      })
    }
  })
}
function update(req, res) {
  let Name = req.body.Name;
  let Email = req.body.Email;
  let Phone = req.body.Phone;
  let Password = req.body.Password;
  let Avatar = req.body.Avatar;
  let Birthday = req.body.Birthday;
  let Gender = req.body.Gender;

  //regex
  let regName = /^((?![0-9\~\!\@\#\$\%\^\&\*\(\)\_\+\=\-\[\]\{\}\;\:\"\\\/\<\>\?]).){1,45}/;
  let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,45}))$/;
  let regPhone = /(84|0[3|5|7|8|9])+([0-9]{8,9})$/;
  let regPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,45})$/;
  let regLink = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  let regBirthday = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
  let regGender = /^\d$/;

  if ((!Name || regName.test(Name)) && (!Email || regEmail.test(Email)) && (!Phone || regPhone.test(Phone)) && (!Password || regPass.test(Password)) && (!Avatar || regLink.test(Avatar)) && (!Birthday || regBirthday.test(Birthday)) && (!Gender || regGender.test(Gender))) {
    AccountDAO.getAccountId(Email ? Email.trim() : null, Phone ? Phone.trim() : null, (AccountId) => {
      if (!AccountId) res.status(401).send({ result: "user not found" });
      else {
        if (Password) bcrypt.hash(Password, 10, function (err, hash) {
          AccountDAO.updateAccount(AccountId, Password ? hash : null, Phone ? Phone.trim() : null, Email ? Email.trim() : null, Name ? Name.trim() : null, Avatar ? Avatar.trim() : null, Birthday ? Birthday.trim() : null, Gender ? Gender.trim() : null, (result) => {
            if (result) res.status(200).send({ result: 'update succesful' });
            else res.status(401).send({ result: 'update failure' });
          })
        })
        else {
          AccountDAO.updateAccount(AccountId, Password ? Password : null, Phone ? Phone.trim() : null, Email ? Email.trim() : null, Name ? Name.trim() : null, Avatar ? Avatar.trim() : null, Birthday ? Birthday.trim() : null, Gender ? Gender.trim() : null, (result) => {
            if (result) res.status(200).send({ result: 'update succesful' });
            else res.status(401).send({ result: 'update failure' });
          })
        }

      }
    })
  } else res.status(401).send({ result: 'incorrect regex' })
}

module.exports = {
  login,
  loginByGoogle,
  loginByFaceBook,
  register,
  update
}
