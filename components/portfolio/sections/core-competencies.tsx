"use client"

import { motion } from "framer-motion"
import type { ThemeColor, ColorMap } from "@/types/portfolio"
import { coreCompetencies } from "@/data/portfolio-data"

interface CoreCompetenciesProps {
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
}

export default function CoreCompetencies({ colorMap, themeColor }: CoreCompetenciesProps) {
  return (
    <motion.section
      className="py-12 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {coreCompetencies.map((competency, index) => (
          <motion.div
            key={index}
            className="elegant-card rounded-xl p-6"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`${colorMap[themeColor].bgLight} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 ${colorMap[themeColor].tertiary}`}
            >
              {competency.icon}
            </div>
            <h3 className={`font-bold text-lg mb-2 ${colorMap[themeColor].primary}`}>{competency.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{competency.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
