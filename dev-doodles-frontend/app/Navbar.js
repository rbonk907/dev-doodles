import Link from "next/link";
import Image from "next/image";
import { BsCart2, BsList } from "react-icons/bs";
import Searchbar from "./Searchbar";
import MobileMenu from "./MobileMenu";
import UserIcon from "./UserIcon";
import { cookies } from "next/headers";
import { fetchUser } from "@/api";
import LoginProvider from "./LoginProvider";
import CartIcon from "./CartIcon";
import CartProvider from "./CartProvider";

export default function Navbar({ cartPage }) {
    // const hasCookie = cookies().has('devDoodle');
    
    return (
        <div className="flex items-center justify-between w-full py-2 px-2 md:px-4">
            <div className="flex items-center md:order-2 md:w-full md:max-w-2xl">
                
                <MobileMenu />
                
                { cartPage ? '' : <Searchbar />}
            </div>
            
            <div className="pr-3 md:pr-0 md:shrink-0 md:order-1">
                <Link href="/">
                    <Image
                        src="/dev-doodles-high-resolution-logo.svg"
                        width={300}
                        height={300}
                        alt="Dev Doodle logo" />
                </Link>
            </div>
            
            <div className="flex items-center md:order-3">
                <div className="mr-4">
                    <UserIcon />
                </div>
                <CartIcon />
            </div>
        </div>
    );
}

