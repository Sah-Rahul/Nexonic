import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [themeColor, setThemeColor] = useState("#0472F0");

  useEffect(() => {
    const savedColor = localStorage.getItem("themeColor");
    if (savedColor) setThemeColor(savedColor);
  }, []);

  const changeThemeColor = (color) => {
    setThemeColor(color);
    localStorage.setItem("themeColor", color);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, changeThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
