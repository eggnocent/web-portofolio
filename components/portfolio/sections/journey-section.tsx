"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { fadeInUp, textLoadingVariants } from "@/constants/animations"
import type { ThemeColor, ColorMap } from "@/types/portfolio"

interface JourneySectionProps {
  isTextLoading: boolean
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
}

export default function JourneySection({ isTextLoading, colorMap, themeColor }: JourneySectionProps) {
  const [journeyRef, journeyInView] = useInView({ threshold: 0.3 })

  return (
    <motion.section
      id="journey"
      className="py-20 flex flex-col md:flex-row items-center justify-between"
      ref={journeyRef}
      initial="hidden"
      animate={journeyInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <motion.div
        className="md:w-1/2 mb-10 md:mb-0"
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
        }}
      >
        <Image
          src="/profile/emogie.png?height=400&width=400"
          alt="About Me"
          width={400}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
      <motion.div
        className="md:w-1/2 md:pl-10"
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
        }}
      >
        <motion.h2
          className={`text-3xl font-bold mb-6 ${colorMap[themeColor].primary}`}
          variants={textLoadingVariants}
          animate={isTextLoading ? "loading" : "loaded"}
        >
          My Journey to Backend Engineering 🚀
        </motion.h2>
        <motion.p
          className={`mb-6 ${colorMap[themeColor].secondary}`}
          variants={textLoadingVariants}
          animate={isTextLoading ? "loading" : "loaded"}
        >
          Driven by curiosity from the early days of watching friends play Point Blank in internet cafes, I dreamt of
          owning my own PC and creating something impactful. This journey started with HTML, CSS, and JS, building basic
          websites and experimenting with code.
        </motion.p>
        <motion.p
          className={`mb-6 ${colorMap[themeColor].secondary}`}
          variants={textLoadingVariants}
          animate={isTextLoading ? "loading" : "loaded"}
        >
          Today, I specialize as a backend engineer, focusing on building scalable, efficient, and secure systems that
          power the technology behind the scenes. From optimizing databases to ensuring security, I thrive on solving
          complex problems and driving the core functionality of applications.
        </motion.p>
      </motion.div>
    </motion.section>
  )
}
