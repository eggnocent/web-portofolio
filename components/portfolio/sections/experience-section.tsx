"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { staggerContainer, itemFadeIn, textLoadingVariants } from "@/constants/animations"
import type { ThemeColor, ColorMap, SelectedItemType } from "@/types/portfolio"
import { experienceItems } from "@/data/portfolio-data"

interface ExperienceSectionProps {
  isTextLoading: boolean
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
  setSelectedItem: (item: SelectedItemType) => void
}

export default function ExperienceSection({
  isTextLoading,
  colorMap,
  themeColor,
  setSelectedItem,
}: ExperienceSectionProps) {
  const [experienceRef, experienceInView] = useInView({ threshold: 0.3 })

  return (
    <motion.section
      id="experience"
      className="py-20"
      ref={experienceRef}
      initial="hidden"
      animate={experienceInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.h2
        className={`text-4xl font-extrabold text-center mb-10 ${colorMap[themeColor].primary}`}
        variants={textLoadingVariants}
        animate={isTextLoading ? "loading" : "loaded"}
      >
        My Experience
      </motion.h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 flex-wrap">
        {experienceItems.map((item, index) => (
          <motion.div
            key={index}
            className="elegant-card rounded-lg overflow-hidden transition-transform hover:scale-105 w-full md:w-72 cursor-pointer"
            variants={itemFadeIn}
            onClick={() => setSelectedItem({ ...item, type: "experience" })}
          >
            <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Image
                src={item.logo || "/placeholder.svg"}
                alt="Company Logo"
                width={150}
                height={100}
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className={`font-semibold mb-2 text-lg ${colorMap[themeColor].primary}`}>{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.period}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
