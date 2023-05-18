"use client";

import Link from "next/link";
import { useState } from "react";
import { BsList } from "react-icons/bs";

import Modal from "react-modal";
// Modal.setAppElement("#root");

export default function MobileMenu() {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }
    
    return (
        <div className="relative">
            <div className="p-2 md:hidden" onClick={toggleMenu}>
                <BsList size="2rem"/>
            </div>
            <Modal
                isOpen={menuOpen}
                onRequestClose={toggleMenu}
                className="fixed top-0 left-0 bottom-0 w-3/4 bg-white focus:outline-none"
                overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-slate-400/75"
            >
                <div>
                    <span className="block">Welcome! 👋</span>
                    <Link href="/login">Login </Link>
                    <span>or </span>
                    <Link href="/signup">Signup</Link>
                </div>
            </Modal>
        </div>
        
    );
}