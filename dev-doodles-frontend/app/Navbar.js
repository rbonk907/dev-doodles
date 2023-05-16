import Link from "next/link";
import Image from "next/image";
import { BsCart2 } from "react-icons/bs";
import Searchbar from "./Searchbar";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between w-full p-2">
            <div>
                <Image
                    src="/dev-doodles-high-resolution-logo.svg"
                    width={300}
                    height={300}
                    alt="Dev Doodle logo" />
            </div>
            <Searchbar />
            <div className="flex items-center">
                <Link className="p-2 font-bold text-lg" href="/login">Login</Link>
                <Link className="p-2 font-bold text-lg" href="/signup">Signup</Link>
                <Link href="/cart">
                    <BsCart2 size="2rem" />
                </Link>
            </div>
        </div>
    )
}