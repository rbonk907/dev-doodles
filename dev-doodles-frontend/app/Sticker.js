
import { BsFillImageFill, BsFillCartPlusFill } from "react-icons/bs";
import AddCartIcon from "./AddCartIcon";
import CartProvider from "./CartProvider";

export default function Sticker(props) {
    const { stickerId, stickerTitle, stickerPrice, stickerQty } = props;

    return (
        <div className="min-w-[250px] mb-5 relative z-0">
            <div className="py-16 px-10 bg-gray-400">
                <BsFillImageFill className="w-16 h-16 text-white mx-auto" />
            </div>
            <h3 className="font-bold py-2 text-sm">{stickerTitle}</h3>
            <p className="font-bold text-base py-1">From ${stickerPrice}</p>
            {/* <p><span className="font-bold">Qty:</span> {stickerQty}</p> */}
           
            <AddCartIcon stickerId={stickerId} stickerTitle={stickerTitle} stickerPrice={stickerPrice} />
            
        </div>
    )
}