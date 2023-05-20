import Link from "next/link";
import Image from "next/image";
import { BsCart2, BsList } from "react-icons/bs";
import Searchbar from "./Searchbar";
import MobileMenu from "./MobileMenu";
import UserIcon from "./UserIcon";
import { cookies } from "next/headers";
import { fetchUser } from "@/api";

export default function Navbar() {
    const hasCookie = cookies().has('devlDoodle');

    async function displayLogin() {
        if (hasCookie) {
            const user = await fetchUser();
            console.log(user);
            return (
                <p className="hidden md:inline-block py-1 px-4 mx-2 font-bold text-lg hover:bg-gray-400 rounded-full">
                    {user.username}
                </p>
            );
        }

        return (
            <>
                <Link className="hidden md:inline-block py-1 px-4 mx-2 font-bold text-lg hover:bg-gray-400 rounded-full" href="/login">Login</Link>
                <Link className="hidden md:inline-block py-1 px-4 mr-2 font-bold text-lg hover:bg-gray-400 rounded-full" href="/signup">Signup</Link>
            </>
        );
    }
    
    return (
        <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center md:order-2">
                <MobileMenu hasCookie={hasCookie} />
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
                {hasCookie ? <UserIcon /> : 
                <>
                    <Link className="hidden md:inline-block py-1 px-4 mx-2 font-bold text-lg hover:bg-gray-400 rounded-full" href="/login">Login</Link>
                    <Link className="hidden md:inline-block py-1 px-4 mr-2 font-bold text-lg hover:bg-gray-400 rounded-full" href="/signup">Signup</Link>
                </>}
                <Link className="rounded-full p-2 hover:bg-gray-400" href="/cart">
                    <BsCart2 size="2rem" />
                </Link>
            </div>
        </div>
    );
}

