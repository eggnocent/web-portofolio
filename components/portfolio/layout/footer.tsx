"use client"

import { Github, ChevronDown } from "lucide-react"
import type { ThemeColor, ColorMap } from "@/types/portfolio"

interface FooterProps {
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
}

export default function Footer({ colorMap, themeColor }: FooterProps) {
  return (
    <footer className="py-8 px-4 border-t dark:border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className={`text-sm ${colorMap[themeColor].secondary}`}>
              © {new Date().getFullYear()} Egi Wiratama. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className={`${colorMap[themeColor].tertiary} hover:${colorMap[themeColor].secondary}`}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className={`${colorMap[themeColor].tertiary} hover:${colorMap[themeColor].secondary}`}
              aria-label="LinkedIn"
            >
              <ChevronDown className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className={`${colorMap[themeColor].tertiary} hover:${colorMap[themeColor].secondary}`}
              aria-label="Twitter"
            >
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
