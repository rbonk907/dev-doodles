"use client";

import { fetchUser } from "@/api";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";

export default function UserIcon() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        async function fetchUserData() {
            const user = await fetchUser();
            setUsername(user.name);
        }
        fetchUserData();
    }, []);
    
    return (
        <div className="hidden md:inline-block">
            <BsPersonCircle />
        </div>
    )
}