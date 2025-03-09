"use client"

import type React from "react"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { X, Moon, Sun, ChevronDown, ExternalLink, Code, Terminal, Database, Server, Lock, Github } from "lucide-react"

// Define interfaces for our data types
interface SkillItem {
  name: string
  image: string
  category: "language" | "framework" | "database" | "tool" | "other"
}

interface PortfolioProject {
  title: string
  description: string
  imageUrl: string
  fullDescription: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  type?: "portfolio"
}

interface ExperienceItem {
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

interface ExploreItem {
  title: string
  description: string
  image: string
  fullDescription: string
  topics: string[]
  difficulty: string
  type?: "explore"
}

// Create a union type for the selected item
type SelectedItemType = (PortfolioProject | ExperienceItem | ExploreItem) & {
  type: "portfolio" | "experience" | "explore"
}

// Define theme types
type ThemeMode = "light" | "dark"
type ThemeColor = "emerald" // We'll keep emerald as the default color

export default function Component() {
  const pathname = usePathname()
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const [isTopRowPaused, setIsTopRowPaused] = useState(false)
  const [isBottomRowPaused, setIsBottomRowPaused] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedItem, setSelectedItem] = useState<SelectedItemType | null>(null)
  const [isTextLoading, setIsTextLoading] = useState(true)
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")
  const [themeColor, setThemeColor] = useState<ThemeColor>("emerald")
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("all")

  // Add these refs and options for scroll animations - remove triggerOnce to allow re-animation
  const [homeRef, homeInView] = useInView({ threshold: 0.3 })
  const [journeyRef, journeyInView] = useInView({ threshold: 0.3 })
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 })
  const [portfolioRef, portfolioInView] = useInView({ threshold: 0.3 })
  const [certificationsRef, certificationsInView] = useInView({ threshold: 0.3 })
  const [experienceRef, experienceInView] = useInView({ threshold: 0.3 })
  const [learnRef, learnInView] = useInView({ threshold: 0.3 })
  const [contactRef, contactInView] = useInView({ threshold: 0.3 })

  // Theme color mapping
  const colorMap = {
    emerald: {
      primary: "text-emerald-800 dark:text-emerald-300",
      secondary: "text-emerald-700 dark:text-emerald-400",
      tertiary: "text-emerald-600 dark:text-emerald-500",
      accent: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-600 dark:bg-emerald-700",
      bgHover: "hover:bg-emerald-700 dark:hover:bg-emerald-600",
      bgLight: "bg-emerald-100 dark:bg-emerald-900",
      border: "border-emerald-300 dark:border-emerald-700",
      gradient: "from-white via-emerald-100/50 to-white dark:from-gray-900 dark:via-emerald-900/20 dark:to-gray-900",
      gradientAccent: "from-pink-400 via-purple-500 to-indigo-500",
      tag: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    },
    blue: {
      primary: "text-blue-800 dark:text-blue-300",
      secondary: "text-blue-700 dark:text-blue-400",
      tertiary: "text-blue-600 dark:text-blue-500",
      accent: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-600 dark:bg-blue-700",
      bgHover: "hover:bg-blue-700 dark:hover:bg-blue-600",
      bgLight: "bg-blue-100 dark:bg-blue-900",
      border: "border-blue-300 dark:border-blue-700",
      gradient: "from-white via-blue-100/50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900",
      gradientAccent: "from-cyan-400 via-blue-500 to-indigo-500",
      tag: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    purple: {
      primary: "text-purple-800 dark:text-purple-300",
      secondary: "text-purple-700 dark:text-purple-400",
      tertiary: "text-purple-600 dark:text-purple-500",
      accent: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-600 dark:bg-purple-700",
      bgHover: "hover:bg-purple-700 dark:hover:bg-purple-600",
      bgLight: "bg-purple-100 dark:bg-purple-900",
      border: "border-purple-300 dark:border-purple-700",
      gradient: "from-white via-purple-100/50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900",
      gradientAccent: "from-pink-400 via-purple-500 to-indigo-500",
      tag: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    },
    amber: {
      primary: "text-amber-800 dark:text-amber-300",
      secondary: "text-amber-700 dark:text-amber-400",
      tertiary: "text-amber-600 dark:text-amber-500",
      accent: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-600 dark:bg-amber-700",
      bgHover: "hover:bg-amber-700 dark:hover:bg-amber-600",
      bgLight: "bg-amber-100 dark:bg-amber-900",
      border: "border-amber-300 dark:border-amber-700",
      gradient: "from-white via-amber-100/50 to-white dark:from-gray-900 dark:via-amber-900/20 dark:to-gray-900",
      gradientAccent: "from-orange-400 via-amber-500 to-yellow-500",
      tag: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    },
    rose: {
      primary: "text-rose-800 dark:text-rose-300",
      secondary: "text-rose-700 dark:text-rose-400",
      tertiary: "text-rose-600 dark:text-rose-500",
      accent: "text-rose-500 dark:text-rose-400",
      bg: "bg-rose-600 dark:bg-rose-700",
      bgHover: "hover:bg-rose-700 dark:hover:bg-rose-600",
      bgLight: "bg-rose-100 dark:bg-rose-900",
      border: "border-rose-300 dark:border-rose-700",
      gradient: "from-white via-rose-100/50 to-white dark:from-gray-900 dark:via-rose-900/20 dark:to-gray-900",
      gradientAccent: "from-rose-400 via-pink-500 to-purple-500",
      tag: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
    },
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Text loading animation variants
  const textLoadingVariants = {
    loading: {
      opacity: [0.3, 1, 0.3],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
      },
    },
    loaded: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Categorized skills
  const skills: SkillItem[] = [
    { name: "Html", image: "/skills/html.png", category: "language" },
    { name: "CSS", image: "/skills/css.png", category: "language" },
    { name: "JavaScript", image: "/skills/javascript.png", category: "language" },
    { name: "PHP", image: "/skills/php.png", category: "language" },
    { name: "C++", image: "/skills/s.png", category: "language" },
    { name: "Golang", image: "/skills/golang.png", category: "language" },
    { name: "Python", image: "/skills/python.png", category: "language" },
    { name: "Bootstrap", image: "/skills/bootstrap-framework.png", category: "framework" },
    { name: "MariaDB", image: "/skills/mariadb.png", category: "database" },
    { name: "MySQL", image: "/skills/mysql.png", category: "database" },
    { name: "PostgreSQL", image: "/skills/posgre.png", category: "database" },
    { name: "Cockroachdb", image: "/skills/cockroachdb.png", category: "database" },
    { name: "DaraGrip", image: "/skills/datagrip.png", category: "tool" },
    { name: "Github", image: "/skills/github.png", category: "tool" },
    { name: "Gitlab", image: "/skills/gitlab.png", category: "tool" },
    { name: "Postman", image: "/skills/postman-icon.png", category: "tool" },
    { name: "Docker", image: "/skills/docker.png", category: "tool" },
  ]

  // Get skills categories for the filter
  const skillCategories = [
    { id: "all", name: "All Skills" },
    { id: "language", name: "Programming Languages" },
    { id: "framework", name: "Frameworks" },
    { id: "database", name: "Databases" },
    { id: "tool", name: "Tools & Platforms" },
  ]

  // Filter skills based on selected category
  const filteredSkills =
    activeSkillCategory === "all" ? skills : skills.filter((skill) => skill.category === activeSkillCategory)

  const portfolioProjects = [
    {
      title: "Student & Item Management with Laravel 11",
      description: "A final project during my school days, with CRUD, PDF etc.",
      imageUrl: "/portofolio/sb2.png?height=200&width=300",
      fullDescription:
        "This comprehensive student and item management system was built with Laravel 11, featuring complete CRUD operations, PDF generation for reports, user authentication with role-based access control, and a responsive dashboard interface. The system allows administrators to manage student records, track inventory items, generate detailed reports, and maintain an audit log of all activities.",
      technologies: ["Laravel 11", "MySQL", "Bootstrap", "JavaScript", "PDF Generation"],
      demoUrl: "https://example.com/demo",
      githubUrl: "https://github.com/username/project",
    },
    {
      title: "School learning score website with html, css, php",
      description: "final project in eleventh grade to determine grade promotion by using mariadb database",
      imageUrl: "/portofolio/rapot.png?height=200&width=300",
      fullDescription:
        "Developed as a final project in eleventh grade, this school learning score website was built using HTML, CSS, and PHP with a MariaDB database. The system calculates and displays student scores, generates report cards, and determines grade promotion based on predefined criteria. Teachers can input grades while administrators can manage student records and generate comprehensive reports.",
      technologies: ["HTML", "CSS", "PHP", "MariaDB"],
      githubUrl: "https://github.com/username/project",
    },
    {
      title: "Braille Text use Python",
      description:
        "A collaboration with other schools at the AWS Sagasitas offline event to help the visually impaired ",
      imageUrl: "/portofolio/braille.jpg?height=200&width=300",
      fullDescription:
        "This Python-based Braille text converter was developed during the AWS Sagasitas offline event in collaboration with other schools. The application helps visually impaired individuals by converting regular text to Braille patterns and vice versa. It features a user-friendly interface, text-to-speech capabilities, and support for multiple languages, making digital content more accessible to the visually impaired community.",
      technologies: ["Python", "OpenCV", "TensorFlow", "Text-to-Speech API"],
      demoUrl: "https://example.com/demo",
    },
    {
      title: "Build Full REST API News APP with Golang",
      description:
        "Developed a scalable REST API for a news application using Golang, featuring efficient data retrieval, caching mechanisms, and JWT authentication for secure access.",
      imageUrl: "/portofolio/news.png?height=200&width=300",
      fullDescription:
        "This project involved building a complete REST API for a news application using Golang. The API features efficient data retrieval with pagination and filtering, Redis caching for improved performance, JWT authentication for secure access, and comprehensive logging and monitoring. The system was designed with a clean architecture pattern, making it highly maintainable and scalable for future growth.",
      technologies: ["Golang", "PostgreSQL", "Redis", "JWT", "Docker"],
      githubUrl: "https://github.com/username/project",
    },
    {
      title: "Build Full REST API Bookstore App with CloudFlare Storage",
      description:
        "Designed and implemented a REST API for an online bookstore, leveraging CloudFlare Storage for high availability, PostgreSQL for data management, and optimized API performance.",
      imageUrl: "/portofolio/bookstore.png?height=200&width=300",
      fullDescription:
        "This comprehensive REST API for an online bookstore leverages CloudFlare Storage for high availability of book assets and metadata. The system uses PostgreSQL for efficient data management, implements a robust search functionality with full-text search capabilities, and features a recommendation engine based on user preferences and browsing history. The API is fully documented with Swagger and includes comprehensive test coverage.",
      technologies: ["Golang", "PostgreSQL", "CloudFlare Storage", "Swagger", "Docker"],
      demoUrl: "https://example.com/demo",
      githubUrl: "https://github.com/username/project",
    },
    {
      title: "Build Dockerfile with Multi-Stage",
      description:
        "Created an optimized multi-stage Dockerfile to enhance containerized application performance, reduce build size, and improve deployment efficiency in cloud environments.",
      imageUrl: "/portofolio/dock.png?height=200&width=300",
      fullDescription:
        "This project focused on creating an optimized multi-stage Dockerfile to enhance containerized application performance. The implementation reduced the final image size by over 80%, significantly improving deployment times and resource utilization. The Dockerfile includes separate stages for dependency installation, testing, building, and production, ensuring that only necessary artifacts are included in the final image. The approach also incorporates security scanning and best practices for container security.",
      technologies: ["Docker", "Multi-stage builds", "CI/CD", "Shell scripting", "Container security"],
      githubUrl: "https://github.com/username/project",
    },
  ]

  const experienceItems = [
    {
      title: "Internship Backend Engineering",
      company: "System Engineering",
      period: "July 2024 - Present",
      description:
        "Responsible for building and managing a backend using Golang, with PostgreSQL for database management and Postman for API testing.",
      logo: "/experience/sys.png?height=200&width=300",
      fullDescription:
        "As a Backend Engineering Intern, I've been responsible for developing and maintaining RESTful APIs using Golang. My daily responsibilities include designing database schemas in PostgreSQL, implementing business logic in Go, writing comprehensive unit and integration tests, and documenting APIs using Swagger. I've also gained experience with Docker containerization and CI/CD pipelines, contributing to the team's microservices architecture.",
      achievements: [
        "Reduced API response time by 40% through query optimization",
        "Implemented caching strategy that decreased database load by 30%",
        "Developed automated testing suite that increased code coverage to 85%",
      ],
      technologies: ["Golang", "PostgreSQL", "Docker", "Postman", "Git"],
    },
    {
      title: "Probability Backend Engineer",
      company: "System Engineering",
      period: "Maret 2025 - Present",
      description:
        "As a probation backend engineer, I focus on designing and implementing APIs while rigorously testing them to ensure efficiency and reliability. My daily tasks involve structuring endpoints, optimizing database queries, and validating API responses using Postman and automated testing tools.",
      logo: "/experience/sys.png?height=200&width=300",
      fullDescription:
        "In my role as a Probation Backend Engineer, I've been entrusted with designing and implementing critical API endpoints for our core services. I work closely with the product and frontend teams to ensure our APIs meet business requirements while maintaining high performance standards. My responsibilities include writing clean, maintainable code, optimizing database queries for efficiency, implementing robust error handling, and ensuring comprehensive test coverage through both manual and automated testing approaches.",
      achievements: [
        "Designed and implemented a new authentication system using JWT",
        "Optimized database queries resulting in 50% faster response times",
        "Contributed to the development of internal API standards documentation",
      ],
      technologies: ["Golang", "PostgreSQL", "Redis", "Docker", "Kubernetes", "CI/CD"],
    },
  ]

  const exploreItems = [
    {
      title: "How to use repeater in burp suite",
      description: "Perfect for mastering responsive web design with pure HTML & CSS",
      image: "/explore/brutforce.png",
      fullDescription:
        "This comprehensive tutorial walks you through using the Repeater tool in Burp Suite for web application security testing. You'll learn how to capture, modify, and resend HTTP requests to test for vulnerabilities, analyze responses, and understand server behavior. The guide covers basic usage, advanced techniques like parameter manipulation, and practical examples of identifying common security issues such as SQL injection and XSS vulnerabilities.",
      topics: [
        "Setting up Burp Suite Repeater",
        "Capturing and modifying HTTP requests",
        "Testing for common vulnerabilities",
        "Analyzing server responses",
        "Automating repetitive tasks",
      ],
      difficulty: "Intermediate",
    },
    {
      title: "Mastering docker 50%?",
      description: "Ideal for those wanting to dive into the complete landing page design process using Figma.",
      image: "/explore/docker50.png",
      fullDescription:
        "This Docker mastery course takes you halfway through becoming a Docker expert. The tutorial covers essential Docker concepts including containers, images, volumes, and networking. You'll learn how to create efficient Dockerfiles, manage multi-container applications with Docker Compose, and understand best practices for container security. By the end of this course, you'll have a solid foundation in Docker that you can build upon for more advanced containerization topics.",
      topics: [
        "Docker fundamentals and architecture",
        "Building and optimizing Docker images",
        "Container networking and volumes",
        "Docker Compose for multi-container apps",
        "Container security basics",
      ],
      difficulty: "Beginner to Intermediate",
    },
    {
      title: "Make Cobra CLI in Golang",
      description: "Great for quickly building responsive websites using the powerful Bootstrap framework.",
      image: "/explore/golangcli.png",
      fullDescription:
        "This tutorial guides you through building powerful command-line interfaces in Golang using the Cobra library. You'll learn how to structure commands, add flags and arguments, implement auto-completion, and generate comprehensive help documentation. The guide includes practical examples of building a complete CLI application with nested commands, persistent flags, and custom validation logic. By the end of this tutorial, you'll be able to create professional-grade CLI tools that follow best practices.",
      topics: [
        "Setting up Cobra in your Go project",
        "Designing command structures and hierarchies",
        "Implementing flags, arguments, and validation",
        "Adding auto-completion and help documentation",
        "Building and distributing your CLI tool",
      ],
      difficulty: "Intermediate",
    },
  ]

  // Core competencies
  const coreCompetencies = [
    {
      title: "Backend Development",
      description: "Building robust, scalable server-side applications with modern technologies",
      icon: <Server className="w-6 h-6" />,
    },
    {
      title: "API Design",
      description: "Creating intuitive, efficient, and well-documented RESTful APIs",
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: "Database Management",
      description: "Designing and optimizing database schemas for performance and scalability",
      icon: <Database className="w-6 h-6" />,
    },
    {
      title: "System Architecture",
      description: "Designing scalable, maintainable system architectures for complex applications",
      icon: <Terminal className="w-6 h-6" />,
    },
    {
      title: "Security Implementation",
      description: "Implementing robust security measures to protect data and systems",
      icon: <Lock className="w-6 h-6" />,
    },
  ]

  // Theme effects - FIXED to properly toggle dark mode
  useEffect(() => {
    // Apply theme to document
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Store theme preference
    localStorage.setItem("themeMode", themeMode)
  }, [themeMode])

  // Load saved theme - FIXED to properly initialize
  useEffect(() => {
    // This tries to get the theme from localStorage first
    const savedThemeMode = localStorage.getItem("themeMode") as ThemeMode | null

    if (savedThemeMode) {
      setThemeMode(savedThemeMode)
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // If no saved preference, use system preference
      setThemeMode("dark")
    }

    // Apply the theme immediately
    const currentThemeMode =
      savedThemeMode ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

    if (currentThemeMode === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Determine active section based on scroll position
      const sections = ["home", "journey", "skills", "portfolio", "certifications", "experience", "learn", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const topRow = topRowRef.current
    const bottomRow = bottomRowRef.current

    if (topRow && bottomRow) {
      const animateRow = (row: HTMLDivElement, direction: "left" | "right", isPaused: boolean) => {
        const scrollWidth = row.scrollWidth
        let start = direction === "left" ? 0 : -scrollWidth / 2
        let animationId: number
        let lastTimestamp: number | null = null
        const speed = 0.03 // Reduced speed for smoother animation

        const step = (timestamp: number) => {
          if (!lastTimestamp) {
            lastTimestamp = timestamp
          }

          const elapsed = timestamp - lastTimestamp

          if (!isPaused) {
            // Use time-based animation for smoother movement
            start += direction === "left" ? -speed * elapsed : speed * elapsed

            if (direction === "left" && start <= -scrollWidth / 2) {
              start = 0
            } else if (direction === "right" && start >= 0) {
              start = -scrollWidth / 2
            }

            row.style.transform = `translateX(${start}px)`
          }

          lastTimestamp = timestamp
          animationId = requestAnimationFrame(step)
        }

        animationId = requestAnimationFrame(step)

        return () => cancelAnimationFrame(animationId)
      }

      const cleanupTop = animateRow(topRow, "left", isTopRowPaused)
      const cleanupBottom = animateRow(bottomRow, "right", isBottomRowPaused)

      return () => {
        cleanupTop()
        cleanupBottom()
      }
    }
  }, [isTopRowPaused, isBottomRowPaused])

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

  const SkillLogo = ({ skill }: { skill: { name: string; image: string } }) => (
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

  // Modal component for popups
  const DetailModal = ({
    item,
    onClose,
    type,
  }: {
    item: SelectedItemType
    onClose: () => void
    type: "portfolio" | "experience" | "explore"
  }) => {
    if (!item) return null

    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border ${colorMap[themeColor].border}`}
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <Image
              src={type === "portfolio" ? item.imageUrl : type === "experience" ? item.logo : item.image}
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
            <h3
              className={`text-2  />
            </button>
          </div>

          <div className="p-6">
            <h3 className={\`text-2xl font-bold mb-2 ${colorMap[themeColor].primary}`}
            >
              {item.title}
            </h3>

            {type === "experience" && (
              <div className="mb-4">
                <p className={`font-medium ${colorMap[themeColor].tertiary}`}>{item.company}</p>
                <p className="text-gray-500 dark:text-gray-400">{item.period}</p>
              </div>
            )}

            {type === "explore" && (
              <div className="mb-4">
                <span className={`inline-block ${colorMap[themeColor].tag} px-2 py-1 rounded-full text-xs font-medium`}>
                  {item.difficulty}
                </span>
              </div>
            )}

            <div className="prose prose-emerald dark:prose-invert max-w-none mb-6">
              <p className="text-gray-700 dark:text-gray-300">{item.fullDescription}</p>
            </div>

            {type === "portfolio" && (
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

                {(item as PortfolioProject).demoUrl || (item as PortfolioProject).githubUrl ? (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {(item as PortfolioProject).demoUrl && (
                      <a
                        href={(item as PortfolioProject).demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 ${colorMap[themeColor].bg} ${colorMap[themeColor].bgHover} text-white px-4 py-2 rounded-lg transition-colors`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {(item as PortfolioProject).githubUrl && (
                      <a
                        href={(item as PortfolioProject).githubUrl}
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

            {type === "experience" && (
              <div className="mb-6">
                <h4 className={`font-semibold ${colorMap[themeColor].secondary} mb-2`}>Key Achievements:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  {item.achievements.map((achievement: string, i: number) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>

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

            {type === "explore" && (
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

  // Theme selector component
  const ThemeSelector = () => {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
          className={`${colorMap[themeColor].bg} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
          aria-label="Toggle theme"
        >
          {themeMode === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>
    )
  }

  // Scroll to top button
  const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }

      window.addEventListener("scroll", toggleVisibility)
      return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 left-6 z-40 ${colorMap[themeColor].bg} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
            aria-label="Scroll to top"
          >
            <ChevronDown className="w-5 h-5 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    )
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${colorMap[themeColor].gradient} relative z-10 transition-all duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0 translate-y-10"
      } dark:text-white`}
    >
      <div
        className={`fixed top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br ${colorMap[themeColor].gradientAccent} rounded-bl-[100%] opacity-20 blur-2xl -z-10`}
      />

      <header
        className={`sticky top-0 z-50 flex justify-center mx-auto px-4 py-4 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
      >
        <nav
          className={`inline-flex flex-wrap justify-center gap-2 text-xs sm:text-sm font-medium bg-white/70 dark:bg-gray-900/70 backdrop-blur-md py-2 px-3 rounded-full shadow-lg ${isScrolled ? "shadow-md" : "shadow-lg"}`}
        >
          {["home", "journey", "skills", "portfolio", "certifications", "experience", "learn", "contact"].map(
            (section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={(e) => scrollToSection(e, section)}
                className={`transition-colors px-2 ${
                  activeSection === section
                    ? colorMap[themeColor].accent
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ),
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4">
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

        {/* Core competencies section */}
        <motion.section
          className="py-12 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreCompetencies.map((competency, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`${colorMap[themeColor].bgLight} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 ${colorMap[themeColor].tertiary}`}
                >
                  {competency.icon}
                </div>
                <h3 className={`font-bold text-lg mb-2 ${colorMap[themeColor].primary}`}>{competency.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{competency.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

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
              Driven by curiosity from the early days of watching friends play Point Blank in internet cafes, I dreamt
              of owning my own PC and creating something impactful. This journey started with HTML, CSS, and JS,
              building basic websites and experimenting with code.
            </motion.p>
            <motion.p
              className={`mb-6 ${colorMap[themeColor].secondary}`}
              variants={textLoadingVariants}
              animate={isTextLoading ? "loading" : "loaded"}
            >
              Today, I specialize as a backend engineer, focusing on building scalable, efficient, and secure systems
              that power the technology behind the scenes. From optimizing databases to ensuring security, I thrive on
              solving complex problems and driving the core functionality of applications.
            </motion.p>
          </motion.div>
        </motion.section>

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
                  <Image
                    src={skill.image || "/placeholder.svg"}
                    alt={skill.name}
                    width={60}
                    height={60}
                    className="mb-3 rounded-lg dark:bg-gray-700 dark:p-1"
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
                      <SkillLogo key={`${skill.name}-${i}`} skill={skill} />
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
                      <SkillLogo key={`${skill.name}-${i}`} skill={skill} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        <motion.section
          id="portfolio"
          className="py-20"
          ref={portfolioRef}
          initial="hidden"
          animate={portfolioInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            className={`text-3xl font-bold text-center mb-10 ${colorMap[themeColor].primary}`}
            variants={textLoadingVariants}
            animate={isTextLoading ? "loading" : "loaded"}
          >
            Portfolio
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                variants={itemFadeIn}
                onClick={() => setSelectedItem({ ...project, type: "portfolio" })}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={`Project ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-2">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/40 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/40 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className={`font-bold mb-2 ${colorMap[themeColor].primary}`}>{project.title}</h3>
                  <p className={`${colorMap[themeColor].tertiary} text-sm`}>{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className={`${colorMap[themeColor].tag} text-xs px-2 py-1 rounded-full`}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

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
            {[
              { name: "Cyber Jawara Certificate", src: "/certificate/cyberjawaracertificate.jpeg" },
              { name: "Dicoding AWS Certificate", src: "/certificate/dicodingaws.jpeg" },
              { name: "BDD Certificate", src: "/certificate/bdd.jpg" },
            ].map((cert, index) => (
              <motion.div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg"
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
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
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
                      e.stopPropagation()
                      setSelectedItem({
                        title: "CCNA Certificate",
                        imageUrl: "/certificate/ccna.png",
                        fullDescription:
                          "This CCNA certification validates my knowledge of networking fundamentals, including network access, IP connectivity, security basics, and automation and programmability.",
                        technologies: ["Networking", "Cisco", "IT Infrastructure"],
                        type: "portfolio",
                      })
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="experience"
          className="py-20"
          ref={experienceRef}
          initial="hidden"
          animate={experienceInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            className={`text-4xl font-extrabold text-center mb-10 ${colorMap[themeColor].primary}`}
            variants={textLoadingVariants}
            animate={isTextLoading ? "loading" : "loaded"}
          >
            My Experience
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 flex-wrap">
            {experienceItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 w-full md:w-72 cursor-pointer"
                variants={itemFadeIn}
                onClick={() => setSelectedItem({ ...item, type: "experience" })}
              >
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Image
                    src={item.logo || "/placeholder.svg"}
                    alt="Company Logo"
                    width={150}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className={`font-semibold mb-2 text-lg ${colorMap[themeColor].primary}`}>{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.period}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="learn"
          className="py-20"
          ref={learnRef}
          initial="hidden"
          animate={learnInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <motion.h2
              className={`text-4xl font-extrabold ${colorMap[themeColor].primary}`}
              variants={textLoadingVariants}
              animate={isTextLoading ? "loading" : "loaded"}
            >
              Explore with Egi
            </motion.h2>
            <a
              href="#learn"
              className={`${colorMap[themeColor].tertiary} hover:${colorMap[themeColor].secondary} transition-colors mt-4 md:mt-0`}
            >
              View all
            </a>
          </div>
          <motion.p
            className={`text-lg mb-10 ${colorMap[themeColor].secondary}`}
            variants={textLoadingVariants}
            animate={isTextLoading ? "loading" : "loaded"}
          >
            Explore my in-depth tutorials and specialized courses crafted to boost your expertise in backend
            development, covering everything from API design to database management.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                variants={itemFadeIn}
                onClick={() => setSelectedItem({ ...item, type: "explore" })}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold text-lg ${colorMap[themeColor].primary}`}>{item.title}</h3>
                    <span className={`${colorMap[themeColor].tag} text-xs px-2 py-1 rounded-full`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

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
              Have a question or want to discuss something? I'm here to help you find the answers you're looking for.
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
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t dark:border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className={`text-sm ${colorMap[themeColor].secondary}`}>
                © {new Date().getFullYear()} Egi Wiratama. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className={`${colorMap[themeColor].tertiary} hover:${colorMap[themeColor].secondary}`}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/username"
                target="_blank"
                rel="noopener noreferrer"
                className={`${colorMap[themeColor].tertiary} hover:${colorMap[themeColor].secondary}`}
                aria-label="LinkedIn"
              >
                <ChevronDown className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className={`${colorMap[themeColor].tertiary} hover:${colorMap[themeColor].secondary}`}
                aria-label="Twitter"
              >
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Theme selector */}
      <ThemeSelector />

      {/* Scroll to top button */}
      <ScrollToTopButton />

      {/* Modal for portfolio, experience, and explore items */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} type={selectedItem.type} />
        )}
      </AnimatePresence>
    </div>
  )
}

