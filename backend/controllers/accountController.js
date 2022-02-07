const Account = require('../models/account');
const AccountDAO = require('../models/data-access/accountDAO');
const express = require('express')
const app = express()
const con = require('../models/data-access/connection')
var mysql = require('mysql');
const { json } = require('express/lib/response');

function login(req, res) {
  AccountDAO.getAccounts(req, res);
}

module.exports = {
  login
}