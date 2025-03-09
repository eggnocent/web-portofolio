"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/portfolio/use-theme"

export function ThemeSelector() {
  const { themeMode, setThemeMode, themeColor, colorMap } = useTheme()

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
        className={`${colorMap[themeColor].bg} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}
        aria-label="Toggle theme"
      >
        {themeMode === "light" ? (
          <Moon className="w-5 h-5 transition-transform hover:rotate-12" />
        ) : (
          <Sun className="w-5 h-5 transition-transform hover:rotate-12" />
        )}
      </button>
      <div className="absolute -top-10 right-0 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {themeMode === "light" ? "Switch to Dark" : "Switch to Light"}
      </div>
    </div>
  )
}
