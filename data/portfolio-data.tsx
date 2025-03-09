import type { SkillItem, PortfolioProject, ExperienceItem, ExploreItem, CoreCompetency } from "@/types/portfolio"
import { Server, Code, Database, Terminal, Lock } from "lucide-react"

// Categorized skills
export const skills: SkillItem[] = [
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
export const skillCategories = [
  { id: "all", name: "All Skills" },
  { id: "language", name: "Programming Languages" },
  { id: "framework", name: "Frameworks" },
  { id: "database", name: "Databases" },
  { id: "tool", name: "Tools & Platforms" },
]

export const portfolioProjects: PortfolioProject[] = [
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
    description: "A collaboration with other schools at the AWS Sagasitas offline event to help the visually impaired ",
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
];

export const experienceItems: ExperienceItem[] = [
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

export const exploreItems: ExploreItem[] = [
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

const portfolioData = {
  portfolioProjects: [
    {
      id: 1,
      title: "Student & Item Management with Laravel 11",
      description: "A final project during my school days, with CRUD, PDF, and user authentication.",
      fullDescription:
        "This project is a student and item management system built with Laravel 11. It includes full CRUD operations, PDF report generation, role-based authentication, and a responsive dashboard for seamless management.",
      imageUrl: "/images/student-management.jpg",
      demoUrl: "https://example.com/demo",
      githubUrl: "https://github.com/example",
      technologies: ["Laravel 11", "MySQL", "Bootstrap", "JavaScript", "PDF Generation"],
      type: "portfolio" as const,
    },
    {
      id: 2,
      title: "School Learning Score Website",
      description: "A website for managing student scores and determining grade promotions.",
      fullDescription:
        "This web application was developed for schools to manage student scores and determine grade promotions. It features user authentication, dynamic grade calculation, and report card generation using PHP and MariaDB.",
      imageUrl: "/images/school-score.jpg",
      demoUrl: "https://example.com/score-demo",
      githubUrl: "https://github.com/example-score",
      technologies: ["HTML", "CSS", "PHP", "MariaDB"],
      type: "portfolio" as const,
    },
    {
      id: 3,
      title: "Braille Text Converter with Python",
      description: "A project to assist the visually impaired by converting text to Braille.",
      fullDescription:
        "Developed in collaboration with multiple schools during the AWS Sagasitas event, this application converts regular text into Braille patterns. It supports text-to-speech conversion and multiple language options for accessibility.",
      imageUrl: "/images/braille-text.jpg",
      demoUrl: "https://example.com/braille-demo",
      githubUrl: "https://github.com/example-braille",
      technologies: ["Python", "OpenCV", "TensorFlow", "Text-to-Speech API"],
      type: "portfolio" as const,
    },
    {
      id: 4,
      title: "REST API News App with Golang",
      description: "A scalable REST API for a news application with JWT authentication and caching.",
      fullDescription:
        "This backend API was built using Golang for a news application, featuring token-based authentication with JWT, Redis caching for performance optimization, and structured API documentation using Swagger.",
      imageUrl: "/images/news-api.jpg",
      demoUrl: "https://example.com/news-api-demo",
      githubUrl: "https://github.com/example-news-api",
      technologies: ["Golang", "PostgreSQL", "Redis", "JWT", "Swagger"],
      type: "portfolio" as const,
    },
    {
      id: 5,
      title: "Build Dockerfile with Multi-Stage",
      description: "An optimized Dockerfile for better performance and security in cloud environments.",
      fullDescription:
        "This project focuses on building an optimized multi-stage Dockerfile to enhance containerized application performance. It significantly reduces image size while ensuring security best practices.",
      imageUrl: "/images/docker-multi-stage.jpg",
      demoUrl: "https://example.com/docker-demo",
      githubUrl: "https://github.com/example-docker",
      technologies: ["Docker", "Multi-stage builds", "CI/CD", "Shell scripting", "Container security"],
      type: "portfolio" as const,
    },
    {
      id: 6,
      title: "Bookstore API with CloudFlare Storage",
      description: "A REST API for an online bookstore with CloudFlare storage and PostgreSQL database.",
      fullDescription:
        "Developed a full-featured bookstore API that leverages CloudFlare Storage for high availability of book assets. Features include secure user authentication, full-text search, and a recommendation engine.",
      imageUrl: "/images/bookstore-api.jpg",
      demoUrl: "https://example.com/bookstore-api-demo",
      githubUrl: "https://github.com/example-bookstore",
      technologies: ["Golang", "PostgreSQL", "CloudFlare Storage", "Swagger", "Docker"],
      type: "portfolio" as const,
    },
  ],
};

export default portfolioData;






// Core competencies
export const coreCompetencies: CoreCompetency[] = [
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
