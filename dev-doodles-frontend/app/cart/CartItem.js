import { editCartItem, deleteCartItem } from "@/api";
import { BsFillImageFill, BsTrashFill } from "react-icons/bs";

export default function CartItem(props) {
    const { qty, price, id, title, cartQty, setCartQty } = props;

    async function changeQty(newQty) {
        if (qty + newQty <= 0) { return; }
        
        const response = await editCartItem(parseFloat(price), newQty, id);
        if (response.ok) {
            setCartQty(cartQty + newQty);
        }
    }

    async function handleDelete() {
        const response = await deleteCartItem(parseFloat(price) * qty, id);
        if (response.ok) {
            setCartQty(cartQty - qty);
        }
    }
    
    return (
            <div className="flex py-4 justify-between gap-x-2 w-full">
                <div className="p-10 bg-gray-400 w-32 h-32">
                    <BsFillImageFill className="w-12 h-12 text-white" />
                </div>
                <div className="flex flex-wrap justify-between w-3/4">
                    <h3 className="font-bold">{title}</h3>
                    <div>
                        <button 
                        className="bg-gray-300 rounded-full w-8 h-8 leading-none font-bold text-lg"
                        onClick={() => changeQty(-1)}>
                            -
                        </button>
                        <span className="bg-white px-5 py-2 rounded-md border-2 border-gray-400 mx-1">{qty}</span>
                        <button 
                        className="bg-gray-300 rounded-full w-8 h-8 leading-none font-bold text-lg"
                        onClick={() => changeQty(1)}>
                            +
                        </button>
                    </div>
                    
                </div>
                <div className="flex flex-wrap justify-center md:w-full md:justify-evenly shrink-[2]">
                    <button className="bg-gray-300 rounded-full w-8 h-8 md:order-2" onClick={handleDelete}>
                        <BsTrashFill className="text-red-500 mx-auto"/>
                    </button>
                    <span className="font-bold px-2 md:order-1 md:mt-1">{new Intl.NumberFormat("en-US", {style: "currency", currency: "USD" }).format(parseFloat(price) * qty)}</span>
                </div>
                
            </div>
    )
}