const socketUser = require('../models/socket.user');

function chat(io, socket) {
    socket.on('chat message', (msg, accountId, response) => {
        console.log("chat message: " + msg + " to accountId: " + accountId);
        let user = socketUser.getUserByAccountId(accountId);
        if (user) {
            user.socketId.forEach(socketId => {
                io.to(socketId).emit('chat message', msg);
            });
        }

        let userSend = socketUser.getUserBySocketId(socket.id);
        if (userSend.socketId.length > 1) {
            userSend.socketId.forEach(socketId => {
                if (socketId !== socket.id) {
                    io.to(socketId).emit('chat message yourself', msg);
                }
            });
        }
        response('ok');
    });

    socket.on('typing', (accountIdFrom, accountIdTo) => {
        console.log("typing: " + accountIdFrom + " to accountId: " + accountIdTo);
        let user = socketUser.getUserByAccountId(accountIdTo);
        if (user) {
            user.socketId.forEach(socketId => {
                io.to(socketId).emit('typing', accountIdFrom);
            });
        }
    });

    socket.on('stop typing', (accountIdFrom, accountIdTo) => {
        console.log("stop typing: " + accountIdFrom + " to accountId: " + accountIdTo);
        let user = socketUser.getUserByAccountId(accountIdTo);
        if (user) {
            user.socketId.forEach(socketId => {
                io.to(socketId).emit('stop typing', accountIdFrom);
            });
        }
    });
}

module.exports = chat;