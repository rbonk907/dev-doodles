"use client";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartProvider";
import { getCart } from "@/api";
import CartItem from "./CartItem";

export default function Page() {
    const { cartQty, setCartQty } = useContext(CartContext);
    const [ cart, setCart ] = useState({});
    const [ total, setTotal ] = useState(0.00);
    const formattedTotal = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD" }).format(total);

    useEffect(() => {
        async function getCartData() {
            const cartData = await getCart();
            console.log(cartData);

            setCart( cart => ({
                ...cart,
                ...cartData
            }));
        }
        
        if (cartQty) {
            getCartData()
        }
    }, [cartQty]);

    useEffect(() => {
        let sum = 0;
        if (cart.items) {
            cart.items.forEach(item => sum = sum + (parseFloat(item.price) * item.qty));
        }
        
        setTotal(sum);
    }, [cart])
    
    return (
        <>
        { cartQty ?
            <div className="min-h-screen p-4 max-w-md md:max-w-6xl mx-auto">
                <div className="py-4 w-full flex flex-col items-center md:flex-row">
                    <h1 className="text-2xl font-bold md:mr-4">Shopping Cart</h1>
                    <div className="text-gray-600 font-light py-3">
                        <span>{cartQty} item{cartQty > 1 ? 's': ''}</span>
                        <span className="text-gray-400 mx-3">|</span>
                        <span>{formattedTotal}</span>
                    </div>
                </div>
                <div className="md:flex md:gap-x-16">
                    <div className="w-full border-y border-gray-400">
                        {
                            cart.items && cart.items.map((item) => {
                                return (
                                    <CartItem
                                    key={item.sticker_id}
                                    qty={item.qty}
                                    price={item.price}
                                    id={item.sticker_id}
                                    title={item.title}
                                    cartQty={cartQty}
                                    setCartQty={setCartQty} />
                                );
                            })
                        }
                    </div>
                    <div className="w-full py-4 md:max-w-sm md:shadow-md md:rounded-md md:px-4 md:bg-white">
                        <p className="font-bold py-2">Order Summary</p>
                        <div className="flex justify-between py-1">
                            <span>Subtotal</span>
                            <span>{formattedTotal}</span>
                        </div>
                        <div className="flex justify-between py-1">
                            <span>Standard shipping</span>
                            <span>$0.00</span>
                        </div>
                        <div className="flex justify-between text-xl py-2">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold">{formattedTotal}</span>
                        </div>
                        <button className="bg-blue-500 w-full rounded-full py-4 mt-6 font-extrabold text-white">
                            Checkout {formattedTotal}
                        </button>
                    </div>
                </div>
            </div>
            :
            <div className="min-h-screen p-6 flex flex-col justify-center">
                <h1 className="font-bold text-4xl h-full mx-auto text-center">Your Shopping Cart is Empty</h1>
            </div>
        }
        </>
    )
}