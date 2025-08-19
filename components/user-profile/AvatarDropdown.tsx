"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import api,{LOGOUT_ENDPOINT} from "@/lib/api.lib";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

type Props = {
  profilepicture?: string ;
  username: string;
};

export default function AvatarDropdown({ profilepicture, username }: Props) {
  const router=useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async ()=>{
    const res=await api.post(LOGOUT_ENDPOINT);
    if(res.status==200){
      router.push('/auth/login')
    }
  }

  // Close on outside click
  useClickOutside(dropdownRef, () => setOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 focus:outline-none "
      >
        {profilepicture ? (
          <img
            src={profilepicture}
            alt= "profilepicture"
            width={32}
            height={32}
            className="aspect-square w-[32px] rounded-full object-cover cursor-pointer"
          />
        ) : (
          <User className="text-white cursor-pointer"/>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-neutral-800">
            {profilepicture ? (
              <img
              src={profilepicture}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            ):(
              <User className="w-10 h-10 text-white bg-gray-800 rounded-full p-2" />
            )}
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
