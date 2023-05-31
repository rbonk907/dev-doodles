"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { LoginContext } from "../LoginProvider";
import { BsGoogle } from "react-icons/bs";

export default function SignupForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const { isAuth, setAuth } = useContext(LoginContext);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("handling submit...");
        const response = await fetch(`http://localhost:3001/signup`, {
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
        console.log(response);
        if (response.ok) {
            setAuth(true);
            router.push('/');
        }
    }

    function handleGoogleLogin() {
        window.open("http://localhost:3001/login/federated/google", "_self");
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center px-6 py-12 w-full md:w-3/4 max-w-xl h-auto md:rounded-2xl md:shadow-xl shadow-slate-300 bg-white">
            <section className="mb-6 w-full max-w-md">
                <label htmlFor="username" className="block font-bold">Username</label>
                <input 
                id="username" 
                name="username" 
                type="email" 
                placeholder="anonymous@example.com"
                className="px-4 py-3 rounded-full w-full bg-gray-100" 
                onChange={(e) => {setUsername(e.target.value)}}
                required />
            </section>
            <section className="mb-12 w-full max-w-md">
                <label htmlFor="new-password" className="block font-bold">Password</label>
                <input 
                id="new-password" 
                name="password" 
                type="password"
                className="px-4 py-3 rounded-full w-full bg-gray-100" 
                onChange={(e) => {setPassword(e.target.value)}}
                required />
            </section>
            <button type="submit" className="px-6 py-4 mb-6 rounded-full w-full max-w-md bg-blue-500 text-white font-bold ">Sign up</button>
            <span className="w-full mb-6 border-b"></span>
            <section className="w-full max-w-md">
                <button onClick={handleGoogleLogin} className="grid grid-cols-[24px_minmax(0,_3fr)] justify-items-center px-6 py-4 rounded-full w-full max-w-md bg-red-500 text-white font-bold">
                    <BsGoogle className="w-6 h-6 justify-self-start"/>
                    <span className="justify-self-center w-full">Sign up with Google</span>
                </button>
            </section>
        </form>
    );
}