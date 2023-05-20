"use client";

import { fetchUser } from "@/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsList } from "react-icons/bs";

import Modal from "react-modal";
Modal.setAppElement("#root");

export default function MobileMenu({ hasCookie }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [username, setUsername] = useState('');
    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        async function fetchUserData() {
            const user = await fetchUser();
            setUsername(user.name);
        }
        if (hasCookie) {
            fetchUserData();
        }
    }, []);
    
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
                { username ? (
                    <div>
                        <span className="block">Welcome back,</span>
                        <span className="font-bold">{username}! 👋</span>
                    </div>
                ) : (
                    <div>
                        <span className="block">Welcome! 👋</span>
                        <Link href="/login">Login </Link>
                        <span>or </span>
                        <Link href="/signup">Signup</Link>
                </div>
                )}
            </Modal>
        </div>
        
    );
}