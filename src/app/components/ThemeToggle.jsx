// src/app/components/ThemeToggle.jsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="h-9 w-9 flex items-center justify-center rounded-full text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
    >
      {isDark ? (
        <Sun className="h-4.5 w-4.5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="h-4.5 w-4.5 text-zinc-700 hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}