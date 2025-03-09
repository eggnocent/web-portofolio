"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { staggerContainer, itemFadeIn, textLoadingVariants } from "@/constants/animations"
import type { ThemeColor, ColorMap, SelectedItemType } from "@/types/portfolio"
import { exploreItems } from "@/data/portfolio-data"

interface LearnSectionProps {
  isTextLoading: boolean
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
  setSelectedItem: (item: SelectedItemType) => void
}

export default function LearnSection({ isTextLoading, colorMap, themeColor, setSelectedItem }: LearnSectionProps) {
  const [learnRef, learnInView] = useInView({ threshold: 0.3 })

  return (
    <motion.section
      id="learn"
      className="py-20"
      ref={learnRef}
      initial="hidden"
      animate={learnInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <motion.h2
          className={`text-4xl font-extrabold ${colorMap[themeColor].primary}`}
          variants={textLoadingVariants}
          animate={isTextLoading ? "loading" : "loaded"}
        >
          Explore with Egi
        </motion.h2>
        <a
          href="#learn"
          className={`${colorMap[themeColor].tertiary} hover:${colorMap[themeColor].secondary} transition-colors mt-4 md:mt-0`}
        >
          View all
        </a>
      </div>
      <motion.p
        className={`text-lg mb-10 ${colorMap[themeColor].secondary}`}
        variants={textLoadingVariants}
        animate={isTextLoading ? "loading" : "loaded"}
      >
        Explore my in-depth tutorials and specialized courses crafted to boost your expertise in backend development,
        covering everything from API design to database management.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exploreItems.map((item, index) => (
          <motion.div
            key={index}
            className="elegant-card rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
            variants={itemFadeIn}
            onClick={() => setSelectedItem({ ...item, type: "explore" })}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-semibold text-lg ${colorMap[themeColor].primary}`}>{item.title}</h3>
                <span className={`${colorMap[themeColor].tag} text-xs px-2 py-1 rounded-full`}>{item.difficulty}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
