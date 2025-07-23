import React from "react";
import { Button } from "../ui/button";
import { Code } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="relative z-10 px-6 py-4 border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold text-white">CodeCraft</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => router.push("/code-editor")}
            data-nprogress
          >
            Editor
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => router.push("/code-editor")}
            data-nprogress
          >
            Challenges
          </Button>
          <Button
            variant="ghost"
            data-nprogress
            className="text-white hover:text-gray-300 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
          <Button
            className="bg-white text-black hover:bg-gray-200 cursor-pointer border-none"
            onClick={() => router.push("/auth/signup")}
            data-nprogress
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
