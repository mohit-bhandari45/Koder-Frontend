"use client";

import LeftSidebar from '@/components/settings/leftsidebar';
import { RightSidebar } from '@/components/settings/rightsidebar';
import React, { useState } from 'react';

const SettingsPage = () => {
  const [content, setContent] = useState("Profile Details");
  
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 min-h-[calc(100vh-4rem)]">
          <LeftSidebar content={content} setContent={setContent} />
          <div className="min-w-0"> {/* Prevents flex child from overflowing */}
            <RightSidebar content={content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
