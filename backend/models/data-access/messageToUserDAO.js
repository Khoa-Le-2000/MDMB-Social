const connection = require('./connection');
const messageToUser = require('../messageToUser');

function getOldMessage(fromAccount, toAccount, Callback) {
    var con = connection.createConnection();
    con.connect(function (err) {
        if (err) throw err;
        // console.log("Connected!");
        var sql = `SELECT * 
        FROM MessageToUser 
        Where (FromAccount=? and ToAccount=?) or (FromAccount=? and ToAccount=?)
        ORDER BY SendDate DESC
        LIMIT 20`;
        con.query(sql, [fromAccount, toAccount, toAccount, fromAccount],
            function (err, result) {
                connection.closeConnection(con);
                if (err) throw err;
                if (result.length > 0) {
                    var listMessage = [];
                    result.forEach(item => {
                        listMessage.push(new messageToUser.MessageToUser(item.MessageId, item.FromAccount, item.SendDate, item.Content, item.Type, item.ToAccount, item.SeenDate));
                    });
                    return Callback(listMessage);
                } else return Callback(false);
            });
    });
}

function getOlderMessage(fromAccount, toAccount, messageId, Callback) {
    var con = connection.createConnection();
    con.connect(function (err) {
        if (err) throw err;
        // console.log("Connected!");
        var sql = `SELECT *
        FROM MessageToUser
        Where ((FromAccount=? and ToAccount=?) or (FromAccount=? and ToAccount=?))
        and (MessageId < ?)
        ORDER BY SendDate DESC
        LIMIT 20`;
        con.query(sql, [fromAccount, toAccount, toAccount, fromAccount, messageId],
            function (err, result) {
                connection.closeConnection(con);
                if (err) throw err;
                if (result.length > 0) {
                    var listMessage = [];
                    result.forEach(item => {
                        listMessage.push(new messageToUser.MessageToUser(item.MessageId, item.FromAccount, item.SendDate, item.Content, item.Type, item.ToAccount, item.SeenDate));
                    });
                    return Callback(listMessage);
                } else return Callback(false);
            });
    });
}

function addMessage(fromAccount, toAccount, content, type, Callback) {
    var con = connection.createConnection();
    con.connect(function (err) {
        if (err) throw err;
        // console.log("Connected!");
        var sql = `SET TIME_ZONE = '+07:00';
        insert into MDMB.MessageToUser(FromAccount, ToAccount, Content, Type) values(?,?,?,?);`;
        con.query(sql, [fromAccount, toAccount, content, type],
            function (err, result) {
                connection.closeConnection(con);
                if (err) return Callback(false);
                else return Callback(true);
            });
    });
}

module.exports = {
    getOldMessage,
    getOlderMessage,
    addMessage
}