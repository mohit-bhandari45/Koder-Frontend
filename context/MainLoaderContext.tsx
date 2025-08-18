"use client";

import { createContext, useContext, useState } from "react";

type MainLoaderContextType = {
    mainLoading: boolean;
    setMainLoading: (loading: boolean) => void;
}

const MainLoaderContext = createContext<MainLoaderContextType | undefined>(undefined);

export const MainLoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [mainLoading, setMainLoading] = useState(true);

    return (
        <MainLoaderContext.Provider value={{ mainLoading, setMainLoading }}>
            {children}
        </MainLoaderContext.Provider>
    )
}

export const useMainLoader = () => {
    const context = useContext(MainLoaderContext);
    if (!context) {
        throw new Error("useMainLoader must be used within a MainLoaderProvider");
    }
    return context;
}