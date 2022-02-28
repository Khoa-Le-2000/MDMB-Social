const socketUser = require('../models/socket.user');

function status(io, socket) {
    socket.on('get online', (listAccountId, response) => {
        console.log("get online: " + listAccountId);
        let listOnline = [];
        listAccountId.forEach(accountId => {
            let user = socketUser.getUserByAccountId(accountId);
            if (user) {
                listOnline.push(accountId);
            }
        });
        response(listOnline);
    });
}

module.exports = status;