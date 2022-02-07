const mysql = require('mysql');
const config = require('../../config/db.config');

function createConnection(){
    return mysql.createConnection({
        host: config.HOST,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DATABASE
    });
}

module.exports = {
    createConnection
}
