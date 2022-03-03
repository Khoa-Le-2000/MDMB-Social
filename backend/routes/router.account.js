const express = require('express');
const accountController = require('../controllers/accountController');
const passport = require('../middlewares/passport.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const api = express.Router();

api.post("/login", accountController.login);
api.post("/login-by-google", accountController.loginByGoogle);
api.get('/login-by-facebook', passport.authenticate('facebook', { scope: 'email' }), accountController.loginByFaceBook);
api.post("/register", accountController.register);
api.post("/register-by-google", authMiddleware.verifyToken, accountController.registerByGoogle);
api.post("/update", authMiddleware.verifyToken, accountController.update);
api.get("/verify", accountController.verifyEmail)
api.get("/list-friend", authMiddleware.verifyToken, accountController.getListFriend);
api.get("/list-friend-with-last-message", authMiddleware.verifyToken, accountController.getListFriendWithLastMessage);
module.exports = api;