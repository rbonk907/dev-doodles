"use client";

import { fetchStickers } from "@/api";
import { useEffect, useState } from "react";
import Sticker from "./Sticker";

export default function StickerList() {
    const [stickers, setStickers] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const stickerData = await fetchStickers();
            setStickers(stickerData);
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-6 mt-6">
            {stickers.map((sticker) => {
                return (
                    <Sticker
                    key={sticker.id}
                    stickerId={sticker.id}
                    stickerTitle={sticker.title}
                    stickerPrice={sticker.price}
                    stickerQty={sticker.qty_in_stock}
                    />
                );
            })}
        </div>
    );
}