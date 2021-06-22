const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'classified_info',
    password: 'topsecret',
    port: 5432,
})

module.exports = pool;