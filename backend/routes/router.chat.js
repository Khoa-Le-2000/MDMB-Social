const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const messageController = require('../controllers/messageController');
const api = express.Router();

api.get('/old-message', authMiddleware.verifyToken, messageController.getOldMessage);
api.get('/older-message', authMiddleware.verifyToken, messageController.getOlderMessage);

module.exports = api;