const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'classified_info',
    password: 'krillEunuch5!',
    port: 5432,
})

module.exports = pool;