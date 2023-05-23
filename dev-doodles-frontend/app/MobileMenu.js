"use client";

import { fetchUser, logout } from "@/api";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import { BsList } from "react-icons/bs";

import Modal from "react-modal";
import { LoginContext } from "./LoginProvider";
Modal.setAppElement("#root");

export default function MobileMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const { isAuth, setAuth } = useContext(LoginContext);
    
    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    async function handleLogout() {
        const response = await logout();
        console.log(response);
        if (response.ok) {
            setAuth(false);
            // setIsLoggedIn(false);
        }
    }

    useEffect(() => {
        async function fetchUserData() {
            const user = await fetchUser();
            if (user) {
                setUsername(user.name);
                // setIsLoggedIn(true);
            } 
        }
        if (isAuth) {
            fetchUserData();
        } else {
            setUsername('');
        }
    }, [isAuth]);
    
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
                        <button className="block" onClick={handleLogout}>Log out</button>
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