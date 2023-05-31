"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../LoginProvider";
import { BsGoogle } from "react-icons/bs";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const router = useRouter();
    const { isAuth, setAuth } = useContext(LoginContext);

    async function handleSubmit(event) {
        event.preventDefault();
        
        const response = await fetch(`https://backend-dev-doodles.onrender.com/login/password`, {
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
    }

    function handleGoogleLogin() {
        window.open("https://backend-dev-doodles.onrender.com/login/federated/google", "_self");
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center px-6 py-12 w-full md:w-3/4 max-w-xl h-auto md:rounded-2xl md:shadow-xl shadow-slate-300 bg-white">
            <section className="mb-6 w-full max-w-md"> 
                <label htmlFor="username" className="block font-bold">Username</label>
                <input
                type="text"
                id="username"
                name="username"
                className="px-4 py-3 rounded-full w-full bg-gray-100" 
                required
                onChange={(e) => {setUsername(e.target.value)}}
                ></input>
            </section>
            <section className="mb-6 w-full max-w-md">  
                <label htmlFor="password" className="block font-bold">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                className="px-4 py-3 rounded-full w-full bg-gray-100" 
                required
                onChange={(e) => {setPassword(e.target.value)}}
                ></input>
            </section> 
            <button type="submit" className="px-6 py-4 mb-6 rounded-full w-full max-w-md bg-blue-500 text-white font-bold">Sign in</button>
            <span className="w-full mb-6 border-b"></span>
            <section className="w-full max-w-md">
                <button onClick={handleGoogleLogin} className="grid grid-cols-[24px_minmax(0,_3fr)] justify-items-center px-6 py-4 rounded-full w-full max-w-md bg-red-500 text-white font-bold">
                    <BsGoogle className="w-6 h-6 justify-self-start"/>
                    <span className="justify-self-center w-full">Sign in with Google</span>
                </button>
            </section>
        </form>
    )
}