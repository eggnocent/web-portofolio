"use client"

import Image from "next/image"
import type { SkillItem } from "@/types/portfolio"

interface SkillLogoProps {
  skill: SkillItem
  setIsTopRowPaused: (isPaused: boolean) => void
  setIsBottomRowPaused: (isPaused: boolean) => void
}

export function SkillLogo({ skill, setIsTopRowPaused, setIsBottomRowPaused }: SkillLogoProps) {
  return (
    <div
      className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 mx-2 md:mx-4 relative group"
      onClick={(e) => {
        e.stopPropagation()
        // Prevent animation disruption when clicking
        setIsTopRowPaused(true)
        setIsBottomRowPaused(true)

        // Use setTimeout to allow user to see the skill name
        setTimeout(() => {
          setIsTopRowPaused(false)
          setIsBottomRowPaused(false)
        }, 1500)
      }}
    >
      <Image
        src={skill.image || "/placeholder.svg"}
        alt={skill.name}
        width={80}
        height={80}
        className="rounded-lg transition-transform duration-300 group-hover:scale-110 dark:bg-gray-800 dark:p-1"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        {skill.name}
      </div>
    </div>
  )
}
