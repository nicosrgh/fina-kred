const mysql = require('mysql')

async function connectionDB() {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin123',
        database: 'db_employee'
    })

    return conn
}

module.exports = connectionDB