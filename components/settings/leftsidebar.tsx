"use client";

import { Settings, Shield, User, LogOut } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import api,{LOGOUT_ENDPOINT} from '@/lib/api.lib';

interface LeftSidebarProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const menuItems = [
  { label: "Profile Details", icon: User },
  { label: "Security Settings", icon: Shield },
  { label: "General Settings", icon: Settings }
];

const LeftSidebar: React.FC<LeftSidebarProps> = ({ content, setContent }) => {
  const router=useRouter();

   const handleLogout = async ()=>{
      console.log("logged out")
      const res=await api.post(LOGOUT_ENDPOINT);
      if(res.status==200){
        router.push('/auth/login')
      }
    }

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex flex-col h-full">
        <div className="text-white flex gap-3 mb-6 font-semibold text-2xl items-center">
          <Settings className="w-6 h-6 text-blue-400" />
          <h1>Settings</h1>
        </div>

        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = content === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setContent(item.label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 
                  ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto border-t border-gray-800 pt-4">
          <button 
            onClick={handleLogout} 
            className="flex cursor-pointer items-center gap-2 w-full text-white font-medium px-4 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default LeftSidebar;
