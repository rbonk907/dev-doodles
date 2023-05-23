"use client";

import LoginProvider from "../LoginProvider";
import LoginForm from "./LoginForm";

export default function Page() {
    
    function handleGoogleLogin() {
        window.open("http://localhost:3001/login/federated/google", "_self");
    }
    
    return (
        <div className="min-h-screen">
            <LoginProvider>
                <LoginForm />
            </LoginProvider>
            <span className="block">or</span>
            <button onClick={handleGoogleLogin}>Sign in with Google</button>
        </div>
    );
}