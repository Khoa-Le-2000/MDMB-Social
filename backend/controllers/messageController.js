const messageToUserDAO = require('../models/data-access/messageToUserDAO');
const chatDao = require('../models/data-access/chatDao');
const jwt = require('jsonwebtoken');

function getOldMessage(req, res) {
    console.log("get old message");

    let fromAccount = req.query.accountId;
    let toAccount = req.query.friendId;

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
    console.log("get older message");

    let fromAccount = req.query.accountId;
    let toAccount = req.query.friendId;
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
function getChatList(req, res) {
    const token = req.headers['authorization'];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        let AccountId = req.query.AccountId;
        if(decoded!=AccountId) return res.status(401).send({result: `Uncorrect token for AccountId: ${AccountId}`})

        chatDao.getAccountReceived(AccountId, (AccountReceived) => {
            if (!AccountReceived) return res.status(401).send({ result: "No messenger found" })
            var List = []
            for (let i = 0; i < AccountReceived.length; i++) {
                chatDao.getChatList(AccountId, AccountReceived[i], (ChatList) => {
                    List.push(ChatList);
                    if (AccountReceived.length == List.length) {
                        List.sort((a, b) => {
                            return Date.parse(b.SentDate) - Date.parse(a.SentDate);
                        })
                        return res.status(200).send(List)
                    }
                })
            }
        })
    })

}

module.exports = {
    getOldMessage,
    getOlderMessage,
    getChatList
};