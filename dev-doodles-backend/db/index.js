const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = process.env.NODE_ENV === "production" ? { connectionString: process.env.PG_URI} 
    : {
        user: process.env.PG_USER,
        host: process.env.HOST,
        database: process.env.DB,
        password: process.env.PASSWORD,
        port: process.env.PORT,
    };

const pool = new Pool(dbConfig);

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    pool: pool,
}