"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

export const LoginContext = createContext({isAuth: false, setAuth: () => {}});

export default function LoginProvider({ children }) {
    const cookies = new Cookies();
    const [isAuth, setAuth] = useState((cookies.get("isAuth") === "true") || false);
    
    useEffect(() => {
        cookies.set("isAuth", isAuth.toString(), { path: '/', secure: true, sameSite: 'strict' });
    }, [isAuth]);

    return (
        <LoginContext.Provider value={{isAuth, setAuth}}>
            { children }
        </LoginContext.Provider>
    );
}