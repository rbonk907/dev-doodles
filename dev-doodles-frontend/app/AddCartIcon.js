"use client";

import { useContext, useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { CartContext } from "./CartProvider";
import { createCart, addItemToCart } from "@/api";

export default function AddCartIcon(props) {
    const { stickerId, stickerTitle, stickerPrice } = props;
    const { cartQty, setCartQty, cartSession, setCartSession } = useContext(CartContext);
    const [ isProcessing, setProcessing ] = useState(false);
    
    async function addToCart(qty, id, title, price) {
        setProcessing(true);
        if (!cartSession) {
            // a cart session hasn't been created yet
            const response = await createCart(parseFloat(price), qty, id);
            setCartSession(true);
        } else {
            const response = await addItemToCart(parseFloat(price), qty, id);
        }
        setProcessing(false);
        setCartQty(cartQty + qty);
    }

    return (
        <button 
        className="rounded-full bg-white w-fit p-2 absolute bottom-1 right-1 md:hover:scale-110 md:hover:shadow-md md:hover:shadow-blue-500/50 md:hover:disabled:shadow-none md:hover:disabled:transform-none disabled:bg-gray-300"
        onClick={() => addToCart(1, stickerId, stickerTitle, stickerPrice)}
        disabled={isProcessing} >
            
          <BsFillCartPlusFill className="w-4 h-4"/>
        </button>
    )
}