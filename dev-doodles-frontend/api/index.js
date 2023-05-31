const API_ENDPOINT = 'https://backend-dev-doodles.onrender.com';

// async function responseHandler(res, status) {

// }

export async function fetchStickers() {
    const response = await fetch(`${API_ENDPOINT}/stickers`);
    const stickers = await response.json();
    console.log(stickers);
    return stickers;
}

export async function fetchUser() {
    const response = await fetch(`${API_ENDPOINT}/user`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        return null;
    }
    
    const user = await response.json();
    return user;
}

export async function logout() {
    const response = await fetch(`${API_ENDPOINT}/logout`, {
        method: "POST",
        credentials: "include",
    });
    return response;
}

export async function getCart() {
    const response = await fetch(`${API_ENDPOINT}/shop/cart`, {
        method: "GET",
        credentials: "include",
    });
    const cart = await response.json();
    return cart;
}

export async function createCart(total, qty, id) {
    console.log(`qty: ${typeof qty}`);
    console.log(`price: ${typeof total}`);
    
    const response = await fetch(`${API_ENDPOINT}/shop/cart`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            total: total,
            qty: qty,
            stickerId: id
        }),
    });
    return response;
}

export async function addItemToCart(price, qty, id) {
    console.log(`qty: ${qty}`);
    console.log(`price: ${typeof price}`);
    
    const response = await fetch(`${API_ENDPOINT}/shop/cart/item`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            price: price,
            qty: qty,
            stickerId: id
        }),
    });
    return response;
}

export async function editCartItem(price, qty, id) {
    const response = await fetch(`${API_ENDPOINT}/shop/cart`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            price: price,
            qty: qty,
            stickerId: id
        }),
    });
    return response;
}

export async function deleteCartItem(price, id) {
    const response = await fetch(`${API_ENDPOINT}/shop/cart/item`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            price: price,
            stickerId: id,
        })
    });
    return response;
}