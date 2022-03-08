const mysql = require('mysql');
const config = require('../../config/db.config');

function createConnection(){
    return mysql.createConnection({
        host: config.HOST,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DATABASE,
        timezone: 'utc'
    });
}

async function setTimeZone(connection){
    let sql = 'SET time_zone = "+07:00"';
    await connection.query(sql, function(err, result){
        if(err) throw err;
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
    closeConnection,
    setTimeZone
}
