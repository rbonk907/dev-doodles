import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import Searchbar from "./Searchbar";

export default function Navbar() {
    return (
        <div>
            <h1>This is the Navbar</h1>
            <Searchbar />
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
            <Link href="/cart"><BsCart2 /></Link>
        </div>
    )
}