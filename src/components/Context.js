import { createContext, useState, useEffect } from "react";
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const clickDarkMode = (e) => {
    if (document.documentElement.classList.contains("dark")) {
      e.target.classList.add("rotate-180");
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      e.target.classList.remove("rotate-180");
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  useEffect(() => {}, [darkMode]);
  return <GlobalContext.Provider value={{ darkMode, clickDarkMode }}>{children}</GlobalContext.Provider>;
}
