"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api, { GET_OWN_PROFILE_ENDPOINT } from "@/lib/api";
import User from "@/types/userTypes";
import { AxiosError } from "axios";

type UserContextType = {
  user: User | null;
  loading: boolean;
  error: AxiosError | null;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await api.get(GET_OWN_PROFILE_ENDPOINT);
      setUser(res.data.data);
      setError(null);
    } catch (error: unknown) {
      setUser(null);
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, error, refreshUser: fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
