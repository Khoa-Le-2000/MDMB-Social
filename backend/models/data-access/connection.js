const mysql = require('mysql');
const config = require('../../config/db.config');

function createConnection(){
    return mysql.createConnection({
        host: config.HOST,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DATABASE,
        timezone: '+07:00'
    });
}

function closeConnection(connection){
    connection.end(function(err){
        if(err) throw err;
        // console.log('Close connection');
    });
}

module.exports = {
    createConnection,
    closeConnection
}
