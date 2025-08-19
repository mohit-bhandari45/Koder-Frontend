"use client";

import api, { GET_OWN_PROFILE_ENDPOINT } from "@/lib/api.lib";
import User from "@/types/user.types";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMainLoader } from "./MainLoaderContext";
import { UNPROTECTED_PATHS } from "@/utils/unprotectedpaths.util";

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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const pathname = usePathname();
  const { setMainLoading } = useMainLoader();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(GET_OWN_PROFILE_ENDPOINT);
      const currUser: User = res.data.data;
      setUser(currUser);
     
      if (!currUser.isVerified) {
        router.replace(`/auth/verify-email`);
        return;
      }

      if (!currUser.username) {
        router.replace(`/auth/username`);
        return;
      }

      if (
        UNPROTECTED_PATHS.some(
          (path) =>
            path === pathname || (path !== "/" && pathname.startsWith(path))
        )
      ) {
        router.replace(`/u/${currUser.username}`);
        return;
      }
      
      setError(null);
    } catch (error: unknown) {
      setMainLoading(false);
      setUser(null);
      setError(error as AxiosError);
      if (
        error instanceof AxiosError &&
        (error.response?.status === 404 || error.response?.status === 401)
      ) {
        if (!UNPROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
          router.push("/auth/login");
        }
      }
    } finally {
      setLoading(false);
    }
  }, [pathname, router, setMainLoading]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
