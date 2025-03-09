"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { ThemeColor, ColorMap } from "@/types/portfolio"

interface ScrollToTopButtonProps {
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
}

export function ScrollToTopButton({ colorMap, themeColor }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={scrollToTop}
          className={`fixed bottom-6 left-6 z-40 ${colorMap[themeColor].bg} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
          aria-label="Scroll to top"
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
