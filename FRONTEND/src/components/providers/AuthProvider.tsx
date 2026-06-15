"use client";

import { useEffect } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { useUserStore } from "@/store/user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/user/me", { withCredentials: true });

        setUser(res.data.data); // ✅ restore user
      } catch {
        clearUser(); // ❌ not logged in
      }
    };

    fetchUser();
  }, []);

  return <>{children}</>;
}
