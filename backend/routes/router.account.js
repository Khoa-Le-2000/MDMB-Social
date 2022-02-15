const express = require('express');
const accountController = require('../controllers/accountController');
const passport = require('../middlewares/passport.middleware');
const api = express.Router();

api.post("/login", accountController.login);
api.post("/login-by-google", accountController.loginByGoogle);
api.get('/login-by-facebook', passport.authenticate('facebook', { scope: 'email' }),accountController.loginByFaceBook);

module.exports = api;