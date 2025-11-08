import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface ThemeContextType {
  themeColor: string;
  changeThemeColor: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [themeColor, setThemeColor] = useState<string>("#0472F0");

  useEffect(() => {
    const savedColor = localStorage.getItem("themeColor");
    if (savedColor) setThemeColor(savedColor);
  }, []);

  const changeThemeColor = (color: string) => {
    setThemeColor(color);
    localStorage.setItem("themeColor", color);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, changeThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};
