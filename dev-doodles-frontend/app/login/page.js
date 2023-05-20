"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    useEffect(() => {
        router.prefetch('/')
    })

    async function handleSubmit(event) {
        event.preventDefault();
        
        const response = await fetch(`http://localhost:3001/login/password`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (response.ok) {
            router.push('/');
        }
        // const jsonResponse = await response.json();
        // console.log(jsonResponse);
    }
    
    return (
        <div className="min-h-screen">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                name="username"
                required
                onChange={(e) => {setUsername(e.target.value)}}
                ></input>
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => {setPassword(e.target.value)}}
                ></input>
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}