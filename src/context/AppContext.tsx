import { useState, createContext, useContext, useEffect } from "react";

interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe ser usado dentro de un AppProvider");
  }
  return context;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  // ✅ Detectar localStorage o preferencia del sistema
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      );
    }
    return "light";
  });

  const [language, setLanguageState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "es";
    }
    return "es";
  });

  // ✅ Aplicar modo oscuro en el <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Guardar idioma en localStorage
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  const value = { theme, toggleTheme, language, setLanguage };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
