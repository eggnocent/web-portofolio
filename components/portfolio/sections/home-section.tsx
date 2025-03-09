"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { fadeInUp, textLoadingVariants } from "@/constants/animations"
import type { ThemeColor, ColorMap } from "@/types/portfolio"

interface HomeSectionProps {
  isTextLoading: boolean
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
}

export default function HomeSection({ isTextLoading, colorMap, themeColor }: HomeSectionProps) {
  const [homeRef, homeInView] = useInView({ threshold: 0.3 })

  return (
    <motion.section
      id="home"
      className="py-20 text-center"
      ref={homeRef}
      initial="hidden"
      animate={homeInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <motion.p
        className={`mb-4 font-semibold ${colorMap[themeColor].tertiary}`}
        variants={textLoadingVariants}
        animate={isTextLoading ? "loading" : "loaded"}
      >
        Egi Wiratama
      </motion.p>
      <motion.h1
        className={`text-3xl md:text-5xl font-bold mb-6 ${colorMap[themeColor].primary}`}
        variants={textLoadingVariants}
        animate={isTextLoading ? "loading" : "loaded"}
      >
        Build, Optimize, and Secure
      </motion.h1>
      <motion.p
        className={`text-lg md:text-xl mb-8 ${colorMap[themeColor].secondary}`}
        variants={textLoadingVariants}
        animate={isTextLoading ? "loading" : "loaded"}
      >
        Empowering systems, optimizing performance,
        <br className="hidden md:block" />
        and ensuring security to create lasting impact. ✨
      </motion.p>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={homeInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-10"
      >
        <Image
          src="/profile/DSC_0904.jpg"
          alt="Profile"
          width={150}
          height={150}
          className={`rounded-full mx-auto border-4 ${colorMap[themeColor].border} shadow-lg`}
        />
      </motion.div>

      {/* Resume download button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <a
          href="/resume.pdf"
          download
          className={`inline-flex items-center gap-2 ${colorMap[themeColor].bg} ${colorMap[themeColor].bgHover} text-white px-6 py-3 rounded-full transition-all hover:shadow-lg`}
        >
          <ChevronDown className="w-5 h-5" />
          Download Resume
        </a>
      </motion.div>
    </motion.section>
  )
}
