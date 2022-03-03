const messageToUserDAO = require('../models/data-access/messageToUserDAO');

function getOldMessage(req, res) {
    // console.log("get old message");

    let accountId = req.query.accountId;
    let friendId = req.query.friendId;
    
    messageToUserDAO.getOldMessage(accountId, friendId, (listMessage) => {
        if (listMessage) {
            res.status(200).json(listMessage);
        } else {
            res.status(200).json({
                message: "No message found"
            });
        }
    });
}

function getOlderMessage(req, res) {
    // console.log("get older message");

    let accountId = req.query.accountId;
    let friendId = req.query.friendId;
    let messageId = req.query.messageId;

    messageToUserDAO.getOlderMessage(accountId, friendId, messageId, (listMessage) => {
        if (listMessage) {
            res.status(200).json(listMessage);
        } else {
            res.status(200).json({
                message: "No message found"
            });
        }
    });
}

module.exports = {
    getOldMessage,
    getOlderMessage
};