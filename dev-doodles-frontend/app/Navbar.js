import Link from "next/link";
import Image from "next/image";
import { BsCart2, BsList } from "react-icons/bs";
import Searchbar from "./Searchbar";
import MobileMenu from "./MobileMenu";
import UserIcon from "./UserIcon";
import { cookies } from "next/headers";
import { fetchUser } from "@/api";
import LoginProvider from "./LoginProvider";

export default function Navbar() {
    // const hasCookie = cookies().has('devDoodle');
    
    return (
        <div className="flex items-center justify-between w-full py-2 px-2 md:px-4">
            <div className="flex items-center md:order-2">
                
                <MobileMenu />
                
                <Searchbar />
            </div>
            
            <div className="pr-3 md:pr-0 md:shrink-0 md:order-1">
                <Image
                    src="/dev-doodles-high-resolution-logo.svg"
                    width={300}
                    height={300}
                    alt="Dev Doodle logo" />
            </div>
            
            <div className="flex items-center md:order-3">
                
                <UserIcon />
                
                
                <Link className="rounded-full p-2 hover:bg-gray-400" href="/cart">
                    <BsCart2 className="w-8 h-8" />
                </Link>
            </div>
        </div>
    );
}

