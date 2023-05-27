import LoginProvider from "../LoginProvider";
import Navbar from "../Navbar";

export default function CartLayout({ children }) {
    return (
        <>
            <LoginProvider>
                <Navbar cartPage={true} />
            </LoginProvider>
            { children }
        </>
    )
}