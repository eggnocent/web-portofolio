"use client"

import { createContext, useEffect, useState, type ReactNode } from "react"
import type { ThemeContextType, ThemeMode, ThemeColor } from "@/types/portfolio"

// Theme color mapping
const colorMap = {
  emerald: {
    primary: "text-emerald-800 dark:text-emerald-200",
    secondary: "text-emerald-700 dark:text-emerald-300",
    tertiary: "text-emerald-600 dark:text-emerald-400",
    accent: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-600 dark:bg-emerald-600",
    bgHover: "hover:bg-emerald-700 dark:hover:bg-emerald-500",
    bgLight: "bg-emerald-100 dark:bg-gray-800/80",
    border: "border-emerald-300 dark:border-emerald-800",
    gradient: "from-white via-emerald-100/50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
    gradientAccent:
      "from-pink-400 via-purple-500 to-indigo-500 dark:from-emerald-900 dark:via-teal-800 dark:to-emerald-900",
    tag: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
  },
  blue: {
    primary: "text-blue-800 dark:text-blue-200",
    secondary: "text-blue-700 dark:text-blue-300",
    tertiary: "text-blue-600 dark:text-blue-400",
    accent: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-600 dark:bg-blue-600",
    bgHover: "hover:bg-blue-700 dark:hover:bg-blue-500",
    bgLight: "bg-blue-100 dark:bg-gray-800/80",
    border: "border-blue-300 dark:border-blue-800",
    gradient: "from-white via-blue-100/50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
    gradientAccent: "from-cyan-400 via-blue-500 to-indigo-500 dark:from-blue-900 dark:via-indigo-800 dark:to-blue-900",
    tag: "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200",
  },
  purple: {
    primary: "text-purple-800 dark:text-purple-200",
    secondary: "text-purple-700 dark:text-purple-300",
    tertiary: "text-purple-600 dark:text-purple-400",
    accent: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-600 dark:bg-purple-600",
    bgHover: "hover:bg-purple-700 dark:hover:bg-purple-500",
    bgLight: "bg-purple-100 dark:bg-gray-800/80",
    border: "border-purple-300 dark:border-purple-800",
    gradient: "from-white via-purple-100/50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
    gradientAccent:
      "from-pink-400 via-purple-500 to-indigo-500 dark:from-purple-900 dark:via-fuchsia-800 dark:to-purple-900",
    tag: "bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200",
  },
  amber: {
    primary: "text-amber-800 dark:text-amber-200",
    secondary: "text-amber-700 dark:text-amber-300",
    tertiary: "text-amber-600 dark:text-amber-400",
    accent: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-600 dark:bg-amber-600",
    bgHover: "hover:bg-amber-700 dark:hover:bg-amber-500",
    bgLight: "bg-amber-100 dark:bg-gray-800/80",
    border: "border-amber-300 dark:border-amber-800",
    gradient: "from-white via-amber-100/50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
    gradientAccent:
      "from-orange-400 via-amber-500 to-yellow-500 dark:from-amber-900 dark:via-orange-800 dark:to-amber-900",
    tag: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200",
  },
  rose: {
    primary: "text-rose-800 dark:text-rose-200",
    secondary: "text-rose-700 dark:text-rose-300",
    tertiary: "text-rose-600 dark:text-rose-400",
    accent: "text-rose-500 dark:text-rose-400",
    bg: "bg-rose-600 dark:bg-rose-600",
    bgHover: "hover:bg-rose-700 dark:hover:bg-rose-500",
    bgLight: "bg-rose-100 dark:bg-gray-800/80",
    border: "border-rose-300 dark:border-rose-800",
    gradient: "from-white via-rose-100/50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
    gradientAccent: "from-rose-400 via-pink-500 to-purple-500 dark:from-rose-900 dark:via-pink-800 dark:to-rose-900",
    tag: "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200",
  },
}

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  themeColor: "emerald",
  setThemeMode: () => {},
  setThemeColor: () => {},
  colorMap,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")
  const [themeColor, setThemeColor] = useState<ThemeColor>("emerald")

  // Theme effects - Apply theme to document
  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Store theme preference
    localStorage.setItem("themeMode", themeMode)
  }, [themeMode])

  // Update the useEffect for theme initialization to be more robust
  // Load saved theme on initial render
  useEffect(() => {
    // Function to apply theme
    const applyTheme = (mode: ThemeMode) => {
      if (mode === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      setThemeMode(mode)
    }

    // Try to get theme from localStorage first
    const savedThemeMode = localStorage.getItem("themeMode") as ThemeMode | null

    if (savedThemeMode) {
      // Use saved preference
      applyTheme(savedThemeMode)
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // If no saved preference, use system preference
      applyTheme("dark")
    } else {
      // Default to light mode
      applyTheme("light")
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      // Only apply if no saved preference
      if (!localStorage.getItem("themeMode")) {
        applyTheme(e.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <ThemeContext.Provider value={{ themeMode, themeColor, setThemeMode, setThemeColor, colorMap }}>
      {children}
    </ThemeContext.Provider>
  )
}
