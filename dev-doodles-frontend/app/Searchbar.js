"use client";

import { BsSearchHeart } from "react-icons/bs";
import { useState, useEffect } from 'react';

export default function Searchbar() {
    const {width, height} = useWindowSize();
    
    function onSubmit(e) {
        e.preventDefault();
        console.log("search submitted")
    }
    
    return (
            <div className="md:grow">
                
                <form onSubmit={onSubmit} className="hidden md:inline-block pl-6 w-full max-w-xl">
                    <div className="flex bg-white rounded-lg border-2 border-cyan-500 pl-4 py-3 pr-2 ">
                        <input 
                            type="search" 
                            id="search" 
                            name="search" 
                            placeholder="Search stickers..."
                            className="text-lg w-full"></input>
                        <button type="submit" className="p-2 ml-2 bg-white rounded-full hover:bg-gray-300"><BsSearchHeart size="1.5rem"/></button>
                    </div>
                </form>
                
                <button type="submit" className="p-2 pl-0 rounded-full hover:bg-gray-300 md:hidden"><BsSearchHeart size="1.5rem"/></button>
            </div>
    );
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}