"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { CartContext } from "./CartProvider";

export default function CartIcon() {
    const { cartQty } = useContext(CartContext);
    const [ cartBubble, setCartBubble ] = useState(cartQty);

    useEffect(() => {
        setCartBubble(cartQty);
    }, [cartQty]);



    return (
            <Link className="rounded-full p-2 hover:bg-gray-400 relative" href="/cart">
                <BsCart2 className="w-8 h-8" />
                { cartQty ? 
                <div className="rounded-full bg-red-400 text-white text-xs absolute -top-[1px] right-0 py-[2px] px-[6px] z-40">
                    { cartBubble }
                </div> : <div></div> }
            </Link>
    )
}