const express = require('express');
const db = require('../db');

const stickers = express.Router();

stickers.get('/', function(request, response) {
    db.query('SELECT * FROM stickers ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
});

stickers.get('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    db.query('SELECT * FROM stickers WHERE id = $1', [ id ], (error, results) => {
        if (error) { throw error; }
        response.status(200).json(results.rows);
    });
});

stickers.post('/', function(request, response) {
    const { title, price, qty } = request.body;

    db.query('INSERT INTO stickers (title, price, qty_in_stock) VALUES ($1, $2, $3) RETURNING *', [
        title,
        price,
        qty
    ], (error, results) => {
        if (error) { throw error; }
        response.status(201).send(`Sticker added with ID: ${results.rows[0].id}`);
    });
});

stickers.put('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    const { title, price, qty } = request.body;

    db.query('UPDATE stickers SET title = $1, price = $2, qty_in_stock = $3 WHERE id = $4', [
        title,
        price,
        qty,
        id
    ], (error, results) => {
        if (error) { throw error; }
        response.status(200).send(`Sticker updated with ID: ${id}`);
    });
});

stickers.delete('/:id', function(request, response) {
    const id = parseInt(request.params.id);

    db.query('DELETE FROM stickers WHERE id = $1', [ id ], (error, results) => {
        if (error) { throw error; }
        response.status(200).send(`Sticker deleted with ID: ${id}`);
    });
});

module.exports = stickers;