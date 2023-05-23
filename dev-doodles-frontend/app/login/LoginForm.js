"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../LoginProvider";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const router = useRouter();
    const { isAuth, setAuth } = useContext(LoginContext);

    async function handleSubmit(event) {
        event.preventDefault();
        
        const response = await fetch(`http://localhost:3001/login/password`, {
            method: "POST",
            credentials: "include", // on successful login, express will pass a cookie containing the sessionID
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (response.ok) {
            setAuth(true);
            router.push('/');
        }
        // const jsonResponse = await response.json();
        // console.log(jsonResponse);
    }

    return (
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
    )
}