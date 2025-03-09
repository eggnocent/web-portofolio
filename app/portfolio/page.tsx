"use client"

import type React from "react"

import { useState, useEffect } from "react"

import { ThemeProvider } from "@/components/portfolio/theme/theme-provider"
import Header from "@/components/portfolio/layout/header"
import Footer from "@/components/portfolio/layout/footer"
import HomeSection from "@/components/portfolio/sections/home-section"
import JourneySection from "@/components/portfolio/sections/journey-section"
import SkillsSection from "@/components/portfolio/sections/skills-section"
import PortfolioSection from "@/components/portfolio/sections/portfolio-section"
import CertificationsSection from "@/components/portfolio/sections/certifications-section"
import ExperienceSection from "@/components/portfolio/sections/experience-section"
import LearnSection from "@/components/portfolio/sections/learn-section"
import ContactSection from "@/components/portfolio/sections/contact-section"
import portfolioData from "@/data/portfolio-data";
import CoreCompetencies from "@/components/portfolio/sections/core-competencies"
import { ThemeSelector } from "@/components/portfolio/theme/theme-selector"
import { ScrollToTopButton } from "@/components/portfolio/ui/scroll-to-top-button"
import { DetailModal } from "@/components/portfolio/ui/detail-modal"
import { useActiveSection } from "@/hooks/portfolio/use-active-section"
import { useTheme } from "@/hooks/portfolio/use-theme"
import type { SelectedItemType } from "@/types/portfolio"

// Add this import at the top of the file
import "./styles.css"

export default function PortfolioPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedItem, setSelectedItem] = useState<SelectedItemType | null>(null)
  const [isTextLoading, setIsTextLoading] = useState(true)
  const { themeColor, colorMap } = useTheme()
  const { isScrolled, activeSection } = useActiveSection()

  useEffect(() => {
    // Entrance animation with a slightly longer delay
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 800)

    // Simulate text loading
    const textLoadingTimer = setTimeout(() => {
      setIsTextLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(textLoadingTimer)
    }
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <ThemeProvider>
      <div
        className={`min-h-screen bg-gradient-to-br ${colorMap[themeColor].gradient} relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0 translate-y-10"
        } dark:text-gray-100`}
      >
        <div
          className={`fixed top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br ${colorMap[themeColor].gradientAccent} rounded-bl-[100%] opacity-20 blur-2xl -z-10`}
        />

        <Header
          isScrolled={isScrolled}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          colorMap={colorMap}
          themeColor={themeColor}
        />

        <main className="container mx-auto px-4">
          <HomeSection isTextLoading={isTextLoading} colorMap={colorMap} themeColor={themeColor} />

          <CoreCompetencies colorMap={colorMap} themeColor={themeColor} />

          <JourneySection isTextLoading={isTextLoading} colorMap={colorMap} themeColor={themeColor} />

          <SkillsSection isTextLoading={isTextLoading} colorMap={colorMap} themeColor={themeColor} />

          <PortfolioSection
  isTextLoading={isTextLoading}
  portfolioProjects={portfolioData.portfolioProjects} // ✅ Sekarang ini tidak error
  colorMap={colorMap}
  themeColor={themeColor}
  setSelectedItem={(item) => setSelectedItem(item as SelectedItemType)}
/>


          <CertificationsSection
            isTextLoading={isTextLoading}
            colorMap={colorMap}
            themeColor={themeColor}
            setSelectedItem={setSelectedItem}
          />

          <ExperienceSection
            isTextLoading={isTextLoading}
            colorMap={colorMap}
            themeColor={themeColor}
            setSelectedItem={setSelectedItem}
          />

          <LearnSection
            isTextLoading={isTextLoading}
            colorMap={colorMap}
            themeColor={themeColor}
            setSelectedItem={setSelectedItem}
          />

          <ContactSection isTextLoading={isTextLoading} colorMap={colorMap} themeColor={themeColor} />
        </main>

        <Footer colorMap={colorMap} themeColor={themeColor} />

        {/* Theme selector */}
        <ThemeSelector />

        {/* Scroll to top button */}
        <ScrollToTopButton colorMap={colorMap} themeColor={themeColor} />

        {/* Modal for portfolio, experience, and explore items */}
        {selectedItem && (
          <DetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            type={selectedItem.type}
            colorMap={colorMap}
            themeColor={themeColor}
          />
        )}
      </div>
    </ThemeProvider>
  )
}
