import { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../context/theme-context.js";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-900/10 bg-white px-3 text-sm text-slate-800 transition-colors hover:border-teal-700 hover:text-teal-800 dark:border-white/15 dark:bg-ink-900 dark:text-slate-100 dark:hover:border-teal-300 dark:hover:text-teal-200"
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "light"}
      onClick={toggleTheme}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      <span className="hidden sm:inline">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}