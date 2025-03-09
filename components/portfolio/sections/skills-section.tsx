"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { fadeInUp, textLoadingVariants } from "@/constants/animations"
import type { ThemeColor, ColorMap } from "@/types/portfolio"
import { skills, skillCategories } from "@/data/portfolio-data"
import { SkillLogo } from "@/components/portfolio/ui/skill-logo"
import { useSkillsCarousel } from "@/hooks/portfolio/use-skills-carousel"

interface SkillsSectionProps {
  isTextLoading: boolean
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
}

export default function SkillsSection({ isTextLoading, colorMap, themeColor }: SkillsSectionProps) {
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 })
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("all")
  const [isTopRowPaused, setIsTopRowPaused] = useState(false)
  const [isBottomRowPaused, setIsBottomRowPaused] = useState(false)

  const { topRowRef, bottomRowRef } = useSkillsCarousel(isTopRowPaused, isBottomRowPaused)

  // Filter skills based on selected category
  const filteredSkills =
    activeSkillCategory === "all" ? skills : skills.filter((skill) => skill.category === activeSkillCategory)

  return (
    <motion.section
      id="skills"
      className="py-20"
      ref={skillsRef}
      initial="hidden"
      animate={skillsInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <motion.h2
        className={`text-3xl font-bold text-center mb-6 ${colorMap[themeColor].primary}`}
        variants={textLoadingVariants}
        animate={isTextLoading ? "loading" : "loaded"}
      >
        My Skills
      </motion.h2>

      {/* Skills Categories Tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {skillCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveSkillCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeSkillCategory === category.id
                ? `${colorMap[themeColor].bg} text-white`
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Categorized Skills View - Show when a specific category is selected */}
      {activeSkillCategory !== "all" && (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={skill.image || "/placeholder.svg"}
                alt={skill.name}
                className="w-16 h-16 mb-3 rounded-lg dark:bg-gray-700 dark:p-1"
              />
              <p className="text-sm font-medium text-center">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Animated Skills Carousel - Show for "All Skills" */}
      {activeSkillCategory === "all" && (
        <div className="overflow-hidden">
          <div
            ref={topRowRef}
            className="flex mb-8"
            onMouseEnter={() => setIsTopRowPaused(true)}
            onMouseLeave={() => setIsTopRowPaused(false)}
            style={{
              width: "200%",
              transform: "translateX(0)",
              transition: "transform 0.5s ease-out",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">
                {skills.map((skill) => (
                  <SkillLogo
                    key={`${skill.name}-${i}`}
                    skill={skill}
                    setIsTopRowPaused={setIsTopRowPaused}
                    setIsBottomRowPaused={setIsBottomRowPaused}
                  />
                ))}
              </div>
            ))}
          </div>
          <div
            ref={bottomRowRef}
            className="flex"
            onMouseEnter={() => setIsBottomRowPaused(true)}
            onMouseLeave={() => setIsBottomRowPaused(false)}
            style={{
              width: "200%",
              transform: "translateX(-50%)",
              transition: "transform 0.5s ease-out",
            }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">
                {skills.map((skill) => (
                  <SkillLogo
                    key={`${skill.name}-${i}`}
                    skill={skill}
                    setIsTopRowPaused={setIsTopRowPaused}
                    setIsBottomRowPaused={setIsBottomRowPaused}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  )
}
