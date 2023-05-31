"use client";

import { BsSearchHeart } from "react-icons/bs";
import { useState, useEffect } from 'react';
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Searchbar() {
    const [searchModal, setSearchModal] = useState(false);

    function toggleMobileModal() {
        setSearchModal(!searchModal);
    }


    
    function onSubmit(e) {
        e.preventDefault();
        console.log("search submitted")
    }
    
    return (
            <div className="relative md:w-full max-w-2xl">
                <div className="md:grow md:w-full max-w-2xl">
                    
                    <form onSubmit={onSubmit} className="hidden md:inline-block pl-6 w-full">
                        <div className="flex bg-white rounded-lg border-2 border-cyan-500 pl-4 py-3 pr-2 ">
                            <input 
                                type="search" 
                                id="search" 
                                name="search" 
                                placeholder="Search stickers..."
                                className="text-lg w-full focus:outline-none"
                            ></input>
                            <button type="submit" className="p-2 ml-2 bg-white rounded-full hover:bg-gray-300"><BsSearchHeart size="1.5rem"/></button>
                        </div>
                    </form>
                    
                    <button onClick={toggleMobileModal} className="p-2 pl-0 rounded-full hover:bg-gray-300 md:hidden"><BsSearchHeart size="1.5rem"/></button>
                </div>

                <Modal
                isOpen={searchModal}
                onRequestClose={toggleMobileModal}
                className="absolute top-0 left-0 right-0 bottom-0 m-auto w-5/6 h-3/4 rounded-md md:w-full max-w-2xl shadow-2xl bg-white focus:outline-none"
                overlayClassName="fixed top-0 left-0 right-0 bottom-0"
                shouldCloseOnOverlayClick={true}
                >
                    
                        <div className="flex bg-white border-b-2 border-cyan-500">
                            <input
                                type="search"
                                id="mobileSearch"
                                name="mobileSearch"
                                placeholder="Search stickers..."
                                className="text-lg w-full pl-2 focus:outline-none"
                            ></input>
                        </div>
                    
                </Modal>
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