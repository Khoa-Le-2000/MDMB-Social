const socketUser = require('../models/socket.user');
const messageToUserDAO = require('../models/data-access/messageToUserDAO');

function chat(io, socket) {
    socket.on('chat message', async (msg, accountId, response) => {
        console.log("chat message: " + msg + " to accountId: " + accountId);

        messageToUserDAO.addMessage(socket.accountId, accountId, msg, 0, async (res) => {
            if (res) {
                let user = await socketUser.getUserByAccountId(accountId);
                if (user) {
                    user.socketId.forEach(socketId => {
                        io.to(socketId).emit('chat message', msg);
                    });
                }

                let userSend = await socketUser.getUserBySocketId(socket.id);
                if (userSend.socketId.length > 1) {
                    userSend.socketId.forEach(socketId => {
                        if (socketId !== socket.id) {
                            io.to(socketId).emit('chat message yourself', msg);
                        }
                    });
                }
                console.log("chat message sent");
                response('ok');
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
}

module.exports = chat;