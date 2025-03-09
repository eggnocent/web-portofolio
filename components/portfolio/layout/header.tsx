"use client"

import type React from "react"

import type { ThemeColor, ColorMap } from "@/types/portfolio"

interface HeaderProps {
  isScrolled: boolean
  activeSection: string
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
}

export default function Header({ isScrolled, activeSection, scrollToSection, colorMap, themeColor }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 flex justify-center mx-auto px-4 py-4 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
    >
      <nav
        className={`inline-flex flex-wrap justify-center gap-2 text-xs sm:text-sm font-medium bg-white/80 dark:bg-gray-900/90 backdrop-blur-md py-2 px-3 rounded-full shadow-lg ${isScrolled ? "shadow-md" : "shadow-lg"}`}
      >
        {["home", "journey", "skills", "portfolio", "certifications", "experience", "learn", "contact"].map(
          (section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => scrollToSection(e, section)}
              className={`transition-colors px-2 ${
                activeSection === section
                  ? colorMap[themeColor].accent
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ),
        )}
      </nav>
    </header>
  )
}
