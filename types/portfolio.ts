import type { ReactNode } from "react"

export interface SkillItem {
  name: string
  image: string
  category: "language" | "framework" | "database" | "tool" | "other"
}

export interface PortfolioProject {
  title: string
  description: string
  imageUrl: string
  fullDescription: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  type?: "portfolio"
}

export interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
  logo: string
  fullDescription: string
  achievements: string[]
  technologies: string[]
  type?: "experience"
}

export interface ExploreItem {
  title: string
  description: string
  image: string
  fullDescription: string
  topics: string[]
  difficulty: string
  type?: "explore"
}

export type SelectedItemType = (PortfolioProject | ExperienceItem | ExploreItem) & {
  type: "portfolio" | "experience" | "explore"
}

export type ThemeMode = "light" | "dark"

export interface CoreCompetency {
  title: string
  description: string
  icon: ReactNode
}

export interface ColorMap {
  primary: string
  secondary: string
  tertiary: string
  accent: string
  bg: string
  bgHover: string
  bgLight: string
  border: string
  gradient: string
  gradientAccent: string
  tag: string
}

export type ThemeColor = "emerald" | "blue" | "purple" | "amber" | "rose";

export interface ThemeContextType {
  themeMode: ThemeMode;
  themeColor: ThemeColor;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeColor: (color: ThemeColor) => void;
  colorMap: Record<ThemeColor, ColorMap>;
}


