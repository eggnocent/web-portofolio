"use client"

import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { PortfolioProject, SelectedItemType } from "@/types/portfolio";

interface PortfolioSectionProps {
  isTextLoading: boolean;
  portfolioProjects: PortfolioProject[];
  setSelectedItem: (item: SelectedItemType) => void;
  themeColor: string;
  colorMap: {
    [key: string]: {
      primary: string;
      secondary: string;
      tertiary: string;
      tag: string;
    };
  };
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  isTextLoading,
  portfolioProjects,
  setSelectedItem,
  themeColor,
  colorMap,
}) => {

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.3,
      },
    },
  };

  return (
    <section id="portfolio" className="py-20">
      {/* ✅ Tambahkan Judul My Project */}
      <motion.h2
        className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Project
      </motion.h2>

      {isTextLoading ? (  
        <p className="text-center text-lg text-gray-500">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioProjects.map((project: PortfolioProject, index: number) => (
            <motion.div
              key={index}
              className="elegant-card rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
              variants={itemFadeIn}
              onClick={() => setSelectedItem({ ...project, type: "portfolio" } as SelectedItemType)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={`Project ${index + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className={`font-bold mb-2 ${colorMap[themeColor].primary}`}>{project.title}</h3>
                <p className={`${colorMap[themeColor].tertiary} text-sm`}>{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                    <span key={i} className={`${colorMap[themeColor].tag} text-xs px-2 py-1 rounded-full`}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
