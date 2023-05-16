"use client";

import { BsSearchHeart } from "react-icons/bs";

export default function Searchbar() {
    function onSubmit(e) {
        e.preventDefault();
        console.log("search submitted")
    }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="flex bg-white rounded-lg border-2 border-cyan-500 pl-4 py-3 pr-2 ">
                    <input 
                        type="search" 
                        id="search" 
                        name="search" 
                        placeholder="Search stickers..."
                        className="text-lg"></input>
                    <button type="submit" className="p-2 ml-2 bg-white rounded-full hover:bg-gray-300"><BsSearchHeart size="1.5rem"/></button>
                </div>
            </form>
        </div>
    )
}