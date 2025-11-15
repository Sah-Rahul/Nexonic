import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(initialDark);

    if (initialDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);

    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleDark}
      className="hover:text-gray-300 transition relative"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun size={22} className="animate-in spin-in-180 duration-300" />
      ) : (
        <Moon size={22} className="animate-in spin-in-180 duration-300" />
      )}
    </button>
  );
};

export default DarkToggle;
