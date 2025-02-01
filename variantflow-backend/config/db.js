const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'R@@t$2025',
    database: 'variantflow',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool.promise();
