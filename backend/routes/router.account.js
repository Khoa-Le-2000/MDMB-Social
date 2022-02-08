const express = require('express');
const accountController = require('../controllers/accountController');
const api = express.Router();

api.post("/login", accountController.login);

module.exports = api;