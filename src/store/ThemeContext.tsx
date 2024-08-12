import React, { createContext, useState } from "react";
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

type Props = {
  children: React.ReactNode;
};

export const themeContext = createContext<ThemeContextType>(
 { theme: 'light',
  toggleTheme: () => {},
}
);

export const ThemeContextProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };
  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};
