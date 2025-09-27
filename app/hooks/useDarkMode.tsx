"use client";
import { useState, useEffect } from "react";

export default function useDarkMode() {
  // Par défaut : dark
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Applique la classe dark par défaut au chargement
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Ajoute ou retire la classe 'dark' sur <html>
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return { theme, toggleTheme };
}
