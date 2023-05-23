"use client";

import { fetchUser, logout } from "@/api";
import { useContext, useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
import { LoginContext } from "./LoginProvider";

export default function UserIcon() {
    const [username, setUsername] = useState('');
    const { isAuth, setAuth } = useContext(LoginContext);

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
               
            }
        }

        if (isAuth) {
            fetchUserData();
        } else {
            setUsername('');
        }
    }, [isAuth]);
    
    return (
        <>
        { 
            username ? 
                <div className="hidden md:inline-block">
                    <BsPersonCircle className="w-7 h-7"/>
                    <button className="font-bold text-lg" onClick={handleLogout}>Logout</button>
                </div>
            : 
                <>
                    <Link className="hidden md:inline-block py-1 px-4 mx-2 font-bold text-lg hover:bg-gray-400 rounded-full" href="/login">Login</Link>
                    <Link className="hidden md:inline-block py-1 px-4 mr-2 font-bold text-lg hover:bg-gray-400 rounded-full" href="/signup">Signup</Link>
                </>
        }
        </>
    )
}