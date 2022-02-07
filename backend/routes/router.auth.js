const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const express = require('express');
const api = express.Router();

api.post('/refresh-token', authMiddleware.verifyRefreshToken, authController.refreshToken);

module.exports = api;