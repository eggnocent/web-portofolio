"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { X, ExternalLink, Github } from "lucide-react"
import type { SelectedItemType, ThemeColor, ColorMap } from "@/types/portfolio"

interface DetailModalProps {
  item: SelectedItemType
  onClose: () => void
  type: "portfolio" | "experience" | "explore"
  colorMap: Record<ThemeColor, ColorMap>
  themeColor: ThemeColor
}

export function DetailModal({ item, onClose, colorMap, themeColor }: DetailModalProps) {
  if (!item) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border ${colorMap[themeColor].border}`}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
        <Image
          src={
            "imageUrl" in item ? item.imageUrl :
            "logo" in item ? item.logo :
            "image" in item ? item.image : "/placeholder.png"
          }
          alt={item.title}
          width={800}
          height={400}
          className="w-full h-48 md:h-64 object-cover rounded-t-xl"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
        >
          <X className="h-5 w-5" />
        </button>
      </div>


        <div className="p-6">
          <h3 className={`text-2xl font-bold mb-2 ${colorMap[themeColor].primary}`}>{item.title}</h3>

          {item.type === "experience" && "company" in item && "period" in item && (
          <div className="mb-4">
            <p className={`font-medium ${colorMap[themeColor].tertiary}`}>{item.company}</p>
            <p className="text-gray-500 dark:text-gray-400">{item.period}</p>
          </div>
        )}


        {item.type === "explore" && "difficulty" in item && (
          <div className="mb-4">
            <span className={`inline-block ${colorMap[themeColor].tag} px-2 py-1 rounded-full text-xs font-medium`}>
              {item.difficulty}
            </span>
          </div>
        )}

          <div className="prose prose-emerald dark:prose-invert max-w-none mb-6">
            <p className="text-gray-700 dark:text-gray-300">{item.fullDescription}</p>
          </div>

                  {item.type === "portfolio" && "technologies" in item && Array.isArray(item.technologies) && (
          <>
            <div className="mb-6">
              <h4 className={`font-semibold ${colorMap[themeColor].secondary} mb-2`}>Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech: string, i: number) => (
                  <span key={i} className={`${colorMap[themeColor].tag} px-3 py-1 rounded-full text-sm`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
              
            {"demoUrl" in item || "githubUrl" in item ? (
              <div className="flex flex-wrap gap-3 mt-4">
                {"demoUrl" in item && item.demoUrl && (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${colorMap[themeColor].bg} ${colorMap[themeColor].bgHover} text-white px-4 py-2 rounded-lg transition-colors`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {"githubUrl" in item && item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            ) : null}
          </>
        )}


        {item.type === "experience" && "achievements" in item && Array.isArray(item.achievements) && (
          <div className="mb-6">
            <h4 className={`font-semibold ${colorMap[themeColor].secondary} mb-2`}>Key Achievements:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {item.achievements.map((achievement: string, i: number) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {item.type === "experience" && "technologies" in item && Array.isArray(item.technologies) && (
          <div className="mb-6">
            <h4 className={`font-semibold ${colorMap[themeColor].secondary} mt-4 mb-2`}>Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech: string, i: number) => (
                <span key={i} className={`${colorMap[themeColor].tag} px-3 py-1 rounded-full text-sm`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}


        {item.type === "explore" && "topics" in item && Array.isArray(item.topics) && (
          <div className="mb-6">
            <h4 className={`font-semibold ${colorMap[themeColor].secondary} mb-2`}>Topics Covered:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {item.topics.map((topic: string, i: number) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        )}


          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`${colorMap[themeColor].bg} ${colorMap[themeColor].bgHover} text-white px-4 py-2 rounded-lg transition-colors`}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
