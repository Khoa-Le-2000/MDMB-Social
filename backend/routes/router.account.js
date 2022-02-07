const express = require('express');
const accountController = require('../controllers/accountController');
const api = express.Router();
const app= express()

api.route('/account').get((req,res)=>{
    accountController.login(req, res);
})

// api.post("/login", accountController.login);
module.exports = api;