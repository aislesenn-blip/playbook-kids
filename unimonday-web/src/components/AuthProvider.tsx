
"use client";
import { useEffect } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // initAuth was removed because we don't need Supabase auth for this prototype
    // It's handled entirely client-side using Zustand
  }, []);

  return <>{children}</>;
}
