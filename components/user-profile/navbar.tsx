
import {
  Bell,
  Code,
  Menu,
  Search
} from "lucide-react";
import { useState } from "react";


function Navbar({user}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Code className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold text-white">LeetCode</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Explore
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Problems
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Contest
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Discuss
            </a>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                Interview
              </button>
            </div>
            <div className="relative group">
              <button className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
                Store
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <div className="text-orange-500 font-semibold">0</div>
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            </div>
            <span className="text-yellow-400 font-semibold">Premium</span>
            
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
            <a href="#" className="block text-gray-300 hover:text-white py-2">Explore</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Problems</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Contest</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Discuss</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Interview</a>
            <a href="#" className="block text-yellow-400 hover:text-yellow-300 py-2">Store</a>
          </div>
        </div>
      )}
    </nav>
   
  );
}

export default Navbar;
