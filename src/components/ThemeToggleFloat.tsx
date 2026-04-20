"use client";

import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggleFloat() {
  const { mode, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="glass-bare fixed bottom-6 left-6 z-40 w-10 h-10 grid place-items-center rounded-full text-[var(--color-fg)] hover:bg-[var(--glass-highlight)] transition"
    >
      {mode === "dark" ? (
        <Sun size={18} weight="duotone" />
      ) : (
        <Moon size={18} weight="duotone" />
      )}
    </button>
  );
}
