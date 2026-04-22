"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Mode = "dark" | "light";
type Ctx = { mode: Mode; toggle: () => void; setMode: (m: Mode) => void };

const ThemeContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "td-onboarding-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as
      | Mode
      | null;
    if (stored === "dark" || stored === "light") setModeState(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.classList.toggle("light", mode === "light");
    root.dataset.theme = mode === "dark" ? "modus-modern-dark" : "modus-modern-light";
    root.dataset.mode = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
  }, [mode]);

  const setMode = (m: Mode) => setModeState(m);
  const toggle = () => setModeState((m) => (m === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ mode, toggle, setMode }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
