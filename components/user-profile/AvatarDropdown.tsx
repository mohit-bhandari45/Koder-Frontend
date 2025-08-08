"use client";

import { useRef, useState, useEffect } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type Props = {
  avatarUrl: string;
  username: string;
};

export default function AvatarDropdown({ avatarUrl, username }: Props) {
  const router=useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async ()=>{
    console.log("logged out")
    const res=await api.post('http://localhost:4000/auth/logout');
    if(res.status==200){
      alert("Logged out successfully");
      router.push('/auth/login')
    }
  }

  // Close on outside click
  useClickOutside(dropdownRef, () => setOpen(false));

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <img
          src={avatarUrl}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-neutral-800">
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="text-white font-medium">{username}</div>
              <div className="text-sm text-gray-400 cursor-pointer hover:underline">
                View profile
              </div>
            </div>
          </div>
          <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-neutral-800 hover:text-white transition cursor-pointer" onClick={()=>router.push("/settings")}>
            Settings
          </button>
          <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-neutral-800 hover:text-white transition cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
