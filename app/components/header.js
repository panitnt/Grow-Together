"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Hamburger icons
// import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  // const router = useRouter()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const handleSignOut = async() => {
  //   await signOut({ redirect: false });
  //   // router.push("/");
  // };

  return (
    <nav className="bg-white border-b shadow-md dark:bg-gray-900 fixed w-full z-10 top-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-bold dark:text-white">
            Grow Together
          </span>
        </a>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-900 dark:text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center space-x-6">
          <Link href="#" className="text-gray-900 dark:text-white hover:text-blue-500">
            About
          </Link>
          <Link href="#" className="text-gray-900 dark:text-white hover:text-blue-500">
            Services
          </Link>
          <Link href="#" className="text-gray-900 dark:text-white hover:text-blue-500">
            Pricing
          </Link>

          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-900 dark:text-white font-medium">
                Hi, {session.user.username}
              </span>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 text-black hover:bg-red-500 hover:text-white rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1 text-black hover:bg-blue-500 hover:text-white rounded "
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 shadow-lg rounded-b-lg">
          <ul className="flex flex-col items-start p-4 space-y-4">
            <li>
              <Link href="#" className="block text-gray-900 dark:text-white hover:text-blue-500">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="block text-gray-900 dark:text-white hover:text-blue-500">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="block text-gray-900 dark:text-white hover:text-blue-500">
                Pricing
              </Link>
            </li>

            {session ? (
              <li className="flex items-center space-x-4">
                <span className="text-gray-900 dark:text-white">
                  Hi, {session.user.username}
                </span>
                <button
                  onClick={()=> signOut}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
