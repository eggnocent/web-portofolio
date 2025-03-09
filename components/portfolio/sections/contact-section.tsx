"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { fadeInUp, textLoadingVariants } from "@/constants/animations"
import type { ThemeColor, ColorMap } from "@/types/portfolio"

interface ContactSectionProps {
  isTextLoading: boolean
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
}

export default function ContactSection({ isTextLoading, colorMap, themeColor }: ContactSectionProps) {
  const [contactRef, contactInView] = useInView({ threshold: 0.3 })

  return (
    <motion.section
      id="contact"
      className="py-16 md:py-24 px-4 relative overflow-hidden"
      ref={contactRef}
      initial="hidden"
      animate={contactInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {/* Reduced opacity for gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[themeColor].gradient} opacity-40 rounded-lg`}>
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* More transparent decorative elements */}
      <div
        className={`absolute top-10 left-10 w-20 h-20 ${colorMap[themeColor].bgLight} rounded-full opacity-20 blur-xl`}
      />
      <div
        className={`absolute bottom-20 right-20 w-32 h-32 ${colorMap[themeColor].bgLight} rounded-full opacity-15 blur-xl`}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        <motion.h2
          className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 ${colorMap[themeColor].primary} leading-tight`}
          variants={textLoadingVariants}
          animate={isTextLoading ? "loading" : "loaded"}
        >
          Every question is an opportunity to learn and grow together
        </motion.h2>

        <motion.p
          className={`${colorMap[themeColor].secondary} mb-8 max-w-xl`}
          variants={textLoadingVariants}
          animate={isTextLoading ? "loading" : "loaded"}
        >
          Have a question or want to discuss something? Im here to help you find the answers youre looking for.
        </motion.p>

        <motion.a
          href="https://linktr.ee/egiwiratama?utm_source=linktree_admin_share"
          target="_blank"
          rel="noopener noreferrer"
          className={`${colorMap[themeColor].bg} ${colorMap[themeColor].bgHover} text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg flex items-center gap-2 group`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 group-hover:animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Ask Me Anything
        </motion.a>

        <motion.div
          className="mt-16 flex items-center gap-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } },
          }}
        >
          <Image
            src="/profile/gitemozie.png?height=60&width=60"
            alt="Avatar"
            width={60}
            height={60}
            className={`rounded-full border-2 ${colorMap[themeColor].border} shadow-md`}
          />
          <div className="text-left">
            <p className={`font-medium ${colorMap[themeColor].primary}`}>Ready to assist you</p>
            <p className={`text-sm ${colorMap[themeColor].tertiary}`}>Usually responds within 24 hours</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
