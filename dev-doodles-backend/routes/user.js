const express = require('express');
const db = require('../db');

const user = express.Router();

user.get('/', (request, response) => {
    db.query('SELECT * FROM users', (error, results) => {
        if (error) { throw error; }

        response.status(200).json(results.rows);
    });
});

user.get('/:username', (request, response) => {
    const username = request.params.username;
    
    db.query('SELECT * FROM users WHERE username = $1', [ username ], (error, results) => {
        if (error) { throw error; }

        response.status(200).json(results.rows[0]);
    });
});

user.put('/:username', (request, response) => {
    const username = request.params.username;
    const { name } = request.body;

    db.query('UPDATE users SET name = $1 WHERE username = $2', [ name, username ], (error, results) => {
        if (error) { throw error; }
        return response.status(200).send('User updated');
    });
});

module.exports = user;