const express = require('express');
const db = require('../db');
const shortUUID = require('short-uuid');
const merge = require('utils-merge');

const shop = express.Router();

// ================ Cart Routes =====================================
// post request to create a cart
shop.post('/cart', (request, response) => {
    console.log(request.body);
    const { total, qty, stickerId } = request.body;
    
    console.log(`total: ${typeof total}`);
    console.log(`qty: ${typeof qty}`);
    console.log(`stickerId: ${typeof stickerId}`);

    if (!request.session.cart) {
        const cartId = shortUUID.generate();
        const prevSession = request.session;
        // regenerate session to protect against session fixation
        request.session.regenerate(function(err) {
            if (err) { throw err; }

            db.query('INSERT INTO cart_session (cart_id, total) VALUES ($1, $2)', [
                cartId,
                total,
            ], (error, results) => {
                if (error) { throw error; }

                db.query('INSERT INTO cart_stickers (qty, sticker_id, cart_id) VALUES ($1, $2, $3)', [
                    qty,
                    stickerId,
                    cartId,
                ], (error, results) => {
                    if (error) { throw error; }

                    request.session.cart = { id: cartId };
                    // merge previous session to maintain log-in info
                    merge(request.session, prevSession);

                    request.session.save(function(err) {
                        if (err) { throw err; }
                        console.log(`Cart created with ID: ${cartId}`);
                        response.status(200).send();
                    });
                });
            });
        }); 
    } else {
        console.log(request.session);
        response.send('Cart already exists...');
    }
});

shop.post('/cart/item', (request, response) => {
    if (!request.session.cart) {
        return response.status(401).send();
    }
    const cartId = request.session.cart.id;
    const {price, qty, stickerId } = request.body;
    

    db.query('SELECT qty FROM cart_stickers WHERE cart_id = $1 AND sticker_id = $2', [
        cartId,
        stickerId,
    ], (error, results) => {
        if (error) { throw error; }
        
        if (!results.rows.length) {
            db.query('INSERT INTO cart_stickers (qty, sticker_id, cart_id) VALUES ($1, $2, $3)', [
                qty,
                stickerId,
                cartId
            ], (error, results) => {
                if (error) { throw error; }
            });
        } else {
            // row already exists in cart_stickers, so update qty
            db.query('UPDATE cart_stickers SET qty = qty + $1 WHERE sticker_id = $2 AND cart_id = $3', [
                qty,
                stickerId,
                cartId
            ], (error, results) => {
                if (error) { throw error; }
            });
        }
    });

    db.query('UPDATE cart_session SET total = total + $1 WHERE cart_id = $2', [
        (price * qty),
        cartId
    ], (error, results) => {
        if (error) { throw error; }

        return response.status(200).send();
    })
})

shop.get('/cart', (request, response) => {
    if (!request.session.cart) {
        console.log(request.session);
        return response.status(204); // empty cart so return no content status
    }
    const queryString = 'SELECT cart.qty, stickers.id AS sticker_id, stickers.title, stickers.price ' +
                        'FROM cart_stickers AS cart INNER JOIN stickers ' +
                        'ON cart.sticker_id = stickers.id ' +
                        'WHERE cart.cart_id = $1 ' +
                        'ORDER BY sticker_id ASC';
    const cartId = request.session.cart.id;
    const cart = { id: cartId };

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
    if (!request.session.cart) {
        // user should not be allowed to edit a cart if one does not exist in the session
        return response.status(401).send();
    }
    
    const { price, qty, stickerId } = request.body;
    const cartId = request.session.cart.id;

    // update quantity from table cart_stickers
    db.query('UPDATE cart_stickers SET qty = qty + $1 WHERE sticker_id = $2 AND cart_id = $3', [
        qty,
        stickerId,
        cartId
    ], (error, results) => {
        if (error) { throw error; }
        // then update cart total in cart_session
        db.query('UPDATE cart_session SET total = total + $1 WHERE cart_id = $2', [
            (qty * price),
            cartId
        ], (error, results) => {
            if (error) { throw error; }
            return response.status(200).send();
        });
    });
    
});

shop.delete('/cart/item', (request, response) => {
    if (!request.session.cart) {
        return response.status(401).send();
    }

    const { price, stickerId } = request.body;
    const cartId = request.session.cart.id;

    // delete row from table cart_stickers
    db.query('DELETE from cart_stickers WHERE sticker_id = $1 AND cart_id = $2', [
        stickerId,
        cartId
    ], (error, results) => {
        if (error) { throw error; }
        // then update cart total in cart_session
        db.query('UPDATE cart_session SET total = total - $1 WHERE cart_id = $2', [
            price,
            cartId
        ], (error, results) => {
            if (error) { throw error; }
            return response.status(200).send();
        });
    });
});

// ================ Order Routes =====================================
shop.get('/orders', (request, response) => {
    db.query('SELECT * FROM orders ORDER BY order_id ASC', (error, results) => {
        if (error) { throw error; }

        response.status(200).json(results.rows);
    })
});

shop.post('/orders', (request, response) => {
    const { cart, addressId } = request.body;

    db.query('INSERT INTO orders (status, address_id) VALUES ($1, $2) RETURNING order_id', [
        'pending',
        addressId
    ], (error, results) => {
        if (error) { throw error; }
        const orderId = results.rows[0].order_id;
        cart.items.forEach((item) => {
            db.query('INSERT INTO orders_stickers (sticker_id, qty, order_id) VALUES ($1, $2, $3)', [
                item.sticker_id,
                item.qty,
                orderId
            ], (error, results) => {
                if (error) { throw error; }
                return response.status(201).send(`Order submitted with order ID: ${orderId}`);
            });
        });
    });
});

shop.get('/orders/:orderId', (request, response) => {
    const orderId = parseInt(request.params.orderId);
    const queryString = 'SELECT o.qty, s.id, s.title, s.price ' +
                        'FROM orders INNER JOIN orders_stickers AS o ' +
                        'ON orders.order_id = o.order_id ' +
                        'INNER JOIN stickers AS s ' +
                        'ON o.sticker_id = s.id ' +
                        'WHERE orders.order_id = $1';
    
    db.query(queryString, [ orderId ], (error, results) => {
        if (error) { throw error; }
        response.status(200).json(results.rows);
    });
});

shop.delete('/orders/:orderId', (request, response) => {
    const orderId = parseInt(request.params.orderId);
    db.query('DELETE from orders_stickers WHERE order_id = $1', [ orderId ], (error, results) => {
        if (error) { throw error; }
        db.query('DELETE from orders WHERE order_id = $1', [ orderId ], (error, results) => {
            if (error) { throw error; }
            response.status(200).send('Order deleted');
        });
    });
});


module.exports = shop;