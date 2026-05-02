"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store/app-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useAppStore.getState().initAuth();
  }, []);

  return <>{children}</>;
}
