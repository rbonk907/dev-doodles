const express = require('express');
const db = require('../db');
const shortUUID = require('short-uuid');
const merge = require('utils-merge');

const shop = express.Router();

// ================ Cart Routes =====================================
// post request to create a cart
shop.post('/cart', (request, response) => {
    if (!request.session.cart) {
        const cartId = shortUUID.generate();
        const prevSession = request.session;
        // regenerate session to protect against session fixation
        request.session.regenerate(function(err) {
            if (err) { throw err; }

            db.query('INSERT INTO cart_session (cart_id, total) VALUES ($1, $2)', [
                cartId,
                0.00
            ], (error, results) => {
                if (error) { throw error; }

                request.session.cart = { id: cartId, total: 0.00 };
                // merge previous session to maintain log-in info
                merge(request.session, prevSession);

                request.session.save(function(err) {
                    if (err) { throw err; }
                    response.status(200).send(`Cart created with ID: ${cartId}`);
                });
            });
        }); 
    } else {
        console.log(request.session);
        response.send('Cart already exists...');
    }
});

shop.get('/cart', (request, response) => {
    if (!request.session.cart) {
        console.log(request.session);
        return response.status(200).send('Cart is empty...');
    }
    const queryString = 'SELECT cart.qty, stickers.id AS sticker_id, stickers.title, stickers.price ' +
                        'FROM cart_stickers AS cart INNER JOIN stickers ' +
                        'ON cart.sticker_id = stickers.id ' +
                        'WHERE cart.cart_id = $1';
    const cartId = request.session.cart.id;
    const cart = { id: cartId, total: request.session.cart.total };

    db.query(queryString, [ cartId ], (error, results) => {
        if (error) { throw error; }
        cart.items = results.rows;
        response.status(200).json(cart);
    })
});

shop.delete('/cart', (request, response) => {
    if (request.session.cart) {
        const prevCartId = request.session.cart.id;
        db.query('DELETE FROM cart_session WHERE cart_id = $1', [ prevCartId ], (error, results) => {
            if (error) { throw error; }
            
            delete request.session.cart;
        });
    }
    request.session.save(function(err) {
        if (err) { throw err; }
        const prevSession = request.session;

        // regenerate to protect against session fixation
        request.session.regenerate(function(err) {
            if (err) { throw err; }
            // merge with previous session to maintain log-in info
            merge(request.session, prevSession);
            return response.status(204).send();
        });
    });
});

// put request to update items in shopping cart
shop.put('/cart', (request, response) => {
    const { cartId, total, item } = request.body;
    // either update quantity or delete row from table cart_stickers
    if (item.qty) {
        db.query('UPDATE cart_stickers SET qty = $1 WHERE sticker_id = $2 AND cart_id = $3', [
            item.qty,
            item.sticker_id,
            cartId
        ], (error, results) => {
            if (error) { throw error; }
        });
    } else {
        db.query('DELETE FROM cart_stickers WHERE sticker_id = $1 AND cart_id = $2', [
            item.sticker_id,
            cartId
        ]);
    }
    // then update cart total in cart_session
    db.query('UPDATE cart_session SET total = $1 WHERE cart_id = $2', [
        total,
        cartId
    ], (error, results) => {
        if (error) { throw error; }
        return response.status(200).send();
    });
});

// ================ Order Routes =====================================





module.exports = shop;