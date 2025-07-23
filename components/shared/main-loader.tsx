"use client";

import React from 'react'

const MainLoader = ({ text }: { text?: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black bg-opacity-80">
      <div className="w-24 h-24 border-8 border-gray-300 border-t-black rounded-full animate-spin"></div>
      <span className="text-white text-2xl font-semibold">{text || "Loading..."}</span>
    </div>
  )
}

export default MainLoader