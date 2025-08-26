"use client"
import {
  Bell,
  Code,
  Menu,
  Search
} from "lucide-react";
import { useState } from "react";
import AvatarDropdown from "./AvatarDropdown";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  if (!user) return null;

  return (
    <nav className="bg-black border-b border-gray-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href={"/"} className="flex items-center gap-2">
              <Code className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold text-white">Koder</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href={"/problems"} className="text-gray-300 hover:text-white transition-colors font-medium cursor-pointer">Problems
            </Link>
            <Link href={"/code-editor"} className="text-gray-300 hover:text-white transition-colors font-medium cursor-pointer">Editor
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            <AvatarDropdown profilepicture={user.profilepicture} username={user.username} />


            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-2 space-y-2">
            <Link href={"/problems"} className="block cursor-pointer text-gray-300 hover:text-white py-2">Problems
            </Link>
            <Link href={"/code-editor"} className="block cursor-pointer text-gray-300 hover:text-white py-2">Editor
            </Link>
          </div>
        </div>
      )}
    </nav>

  );
}

export default Navbar;
