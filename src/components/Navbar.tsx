import Link from "next/link";

const Navbar = () => {
    return (
        <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full top-0">
        <h1 className="container">
            <Link href="/">
                Logo
            </Link>
        </h1>
        </div>
    );
}

export default Navbar;