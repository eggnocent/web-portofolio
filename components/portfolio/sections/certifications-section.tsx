"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { staggerContainer, itemFadeIn, textLoadingVariants } from "@/constants/animations"
import type { ThemeColor, ColorMap, SelectedItemType } from "@/types/portfolio"

interface CertificationsSectionProps {
  isTextLoading: boolean
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
  setSelectedItem: (item: SelectedItemType) => void
}

export default function CertificationsSection({
  isTextLoading,
  colorMap,
  themeColor,
  setSelectedItem,
}: CertificationsSectionProps) {
  const [certificationsRef, certificationsInView] = useInView({ threshold: 0.3 })

  const certifications = [
    { name: "Cyber Jawara Certificate", src: "/certificate/cyberjawaracertificate.jpeg" },
    { name: "Dicoding AWS Certificate", src: "/certificate/dicodingaws.jpeg" },
    { name: "BDD Certificate", src: "/certificate/bdd.jpg" },
  ]

  return (
    <motion.section
      id="certifications"
      className="py-20"
      ref={certificationsRef}
      initial="hidden"
      animate={certificationsInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.h2
        className={`text-3xl font-bold text-center mb-10 ${colorMap[themeColor].primary}`}
        variants={textLoadingVariants}
        animate={isTextLoading ? "loading" : "loaded"}
      >
        My Certifications
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg elegant-card"
            variants={itemFadeIn}
          >
            <Image
              src={cert.src || "/placeholder.svg"}
              alt={cert.name}
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
              className={`bg-white text-gray-800 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedItem({
                  title: cert.name,
                  description: "Certification in Backend Development & System Engineering", // ✅ Tambahkan deskripsi
                  imageUrl: cert.src,
                  fullDescription: `This is my ${cert.name} that demonstrates my expertise and commitment to professional growth.`,
                  technologies: ["Backend Development", "System Engineering"],
                  type: "portfolio",
                })
              }}
            >
              View Details
            </button>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div className="mt-8 mx-auto max-w-2xl" variants={itemFadeIn}>
        <div className="relative group overflow-hidden rounded-lg shadow-lg elegant-card">
          <Image
            src="/certificate/ccna.png"
            alt="CCNA Certificate"
            width={800}
            height={600}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
            className={`bg-white text-gray-800 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem({
                title: "CCNA Certificate",
                description: "A professional certification for networking fundamentals.", // ✅ Tambahkan deskripsi di sini
                imageUrl: "/certificate/ccna.png",
                fullDescription:
                  "This CCNA certification validates my knowledge of networking fundamentals, including network access, IP connectivity, security basics, and automation and programmability.",
                technologies: ["Networking", "Cisco", "IT Infrastructure"],
                type: "portfolio",
              });
            }}
          >
            View Details
          </button>

            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
