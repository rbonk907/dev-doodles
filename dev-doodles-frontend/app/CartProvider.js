"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({ 
    cartQty: 0, 
    setCartQty: () => {},
    cartSession: false,
    setCartSession: () => {},  
});

export default function CartProvider({ children }) {
    const [cartQty, setCartQty] = useState(0);
    const [cartSession, setCartSession] = useState(false);

    useEffect(() => {
        setCartQty(parseInt(localStorage.getItem("cartQty")) || 0);
        setCartSession(localStorage.getItem("cartSession") === "true" || false);
    }, []);
    
    useEffect(() => {
        localStorage.setItem("cartQty", cartQty);
    }, [cartQty]);

    useEffect(() => {
        localStorage.setItem("cartSession", cartSession);
    }, [cartSession]);

    return (
        <CartContext.Provider value={{cartQty, setCartQty, cartSession, setCartSession}}>
            { children }
        </CartContext.Provider>
    );
}