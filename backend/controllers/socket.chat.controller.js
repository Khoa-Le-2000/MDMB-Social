const socketUser = require('../models/socket.user');
const messageToUserDAO = require('../models/data-access/messageToUserDAO');

function chat(io, socket) {
    socket.on('chat message', async (msg, accountId, response) => {
        console.log("chat message: " + msg + " to accountId: " + accountId);

        messageToUserDAO.addMessage(socket.accountId, accountId, msg, 0, async (res, messageId) => {
            if (res) {
                let user = await socketUser.getUserByAccountId(accountId);
                if (user) {
                    user.socketId.forEach(socketId => {
                        io.to(socketId).emit('chat message', msg, messageId);
                    });
                }

                let userSend = await socketUser.getUserBySocketId(socket.id);
                if (userSend.socketId.length > 1) {
                    userSend.socketId.forEach(socketId => {
                        if (socketId !== socket.id) {
                            io.to(socketId).emit('chat message yourself', msg, messageId);
                        }
                    });
                }
                console.log("chat message sent");
                response('ok', messageId);
            } else {
                console.log("chat message not sent");
                response('failed');
            }
        });
    });

    socket.on('typing', async (accountIdTo) => {
        console.log("typing: " + socket.accountId + " to accountId: " + accountIdTo);
        let user = await socketUser.getUserByAccountId(accountIdTo);
        if (user) {
            user.socketId.forEach(socketId => {
                io.to(socketId).emit('typing', socket.accountId);
            });
        }
    });

    socket.on('stop typing', async (accountIdTo) => {
        console.log("stop typing: " + socket.accountId + " to accountId: " + accountIdTo);
        let user = await socketUser.getUserByAccountId(accountIdTo);
        if (user) {
            user.socketId.forEach(socketId => {
                io.to(socketId).emit('stop typing', socket.accountId);
            });
        }
    });

    socket.on('seen message', async (messageId) => {
        console.log("seen message: " + messageId);
        let res = await messageToUserDAO.seenMessage(messageId);
        if (res) {
            let messageToUser = await messageToUserDAO.getMessageById(messageId);
            let socketIds = await socketUser.getUserByAccountId(messageToUser.FromAccount);
            if (socketIds) {
                socketIds.socketId.forEach(socketId => {
                    console.log('OLA ' + socketId);
                    io.to(socketId).emit('seen message', messageId);
                });
            }
        }
    });
}

module.exports = chat;