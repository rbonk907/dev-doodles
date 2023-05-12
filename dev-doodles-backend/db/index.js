const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    pool: pool,
}