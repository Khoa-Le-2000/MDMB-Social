const socketUser = require('../models/socket.user');
const messageController = require('../models/data-access/messageToUserDAO');

function chat(io, socket) {
    socket.on('chat message', async (msg, accountId, response) => {
        console.log("chat message: " + msg + " to accountId: " + accountId);

        messageController.addMessage(socket.accountId, accountId, msg, 0, async (res) => {
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
                response('ok');
            } else {
                response('failed');
            }
        });
    });

    socket.on('typing', async (accountIdFrom, accountIdTo) => {
        console.log("typing: " + accountIdFrom + " to accountId: " + accountIdTo);
        let user = await socketUser.getUserByAccountId(accountIdTo);
        if (user) {
            user.socketId.forEach(socketId => {
                io.to(socketId).emit('typing', accountIdFrom);
            });
        }
    });

    socket.on('stop typing', async (accountIdFrom, accountIdTo) => {
        console.log("stop typing: " + accountIdFrom + " to accountId: " + accountIdTo);
        let user = await socketUser.getUserByAccountId(accountIdTo);
        if (user) {
            user.socketId.forEach(socketId => {
                io.to(socketId).emit('stop typing', accountIdFrom);
            });
        }
    });
}

module.exports = chat;