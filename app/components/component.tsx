'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Component() {
  const pathname = usePathname()
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const [isTopRowPaused, setIsTopRowPaused] = useState(false)
  const [isBottomRowPaused, setIsBottomRowPaused] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const skills = [
    { name: 'Html', image: '/skills/html.png' },
    { name: 'CSS', image: '/skills/css.png' },
    { name: 'JavaScript', image: '/skills/javascript.png' },
    { name: 'PHP', image: '/skills/php.png' },
    { name: 'C++', image: '/skills/s.png' },
    { name: 'Bootstrap', image: '/skills/bootstrap-framework.png' },
    { name: 'Golang', image: '/skills/golang.png' },
    { name: 'Python', image: '/skills/python.png' },
    { name: 'MariaDB', image: '/skills/mariadb.png' },
    { name: 'MySQL', image: '/skills/mysql.png' },
    { name: 'PostgreSQL', image: '/skills/posgre.png' },
    { name: 'Cockroachdb', image: '/skills/cockroachdb.png' },
    { name: 'DaraGrip', image: '/skills/datagrip.png' },
    { name: 'Github', image: '/skills/github.png' },
    { name: 'Gitlab', image: '/skills/gitlab.png' },
    { name: 'Postman', image: '/skills/postman-icon.png' },
  ]

  useEffect(() => {
    const topRow = topRowRef.current
    const bottomRow = bottomRowRef.current

    if (topRow && bottomRow) {
      const animateRow = (row: HTMLDivElement, direction: 'left' | 'right', isPaused: boolean) => {
        const scrollWidth = row.scrollWidth
        let start = direction === 'left' ? 0 : -scrollWidth / 2
        let animationId: number

        const step = () => {
          if (!isPaused) {
            start += direction === 'left' ? -0.5 : 0.5
            if (direction === 'left' && start <= -scrollWidth / 2) {
              start = 0
            } else if (direction === 'right' && start >= 0) {
              start = -scrollWidth / 2
            }
            row.style.transform = `translateX(${start}px)`
          }
          animationId = requestAnimationFrame(step)
        }

        animationId = requestAnimationFrame(step)

        return () => cancelAnimationFrame(animationId)
      }

      const cleanupTop = animateRow(topRow, 'left', isTopRowPaused)
      const cleanupBottom = animateRow(bottomRow, 'right', isBottomRowPaused)

      return () => {
        cleanupTop()
        cleanupBottom()
      }
    }
  }, [isTopRowPaused, isBottomRowPaused])

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const SkillLogo = ({ skill }: { skill: { name: string; image: string } }) => (
    <div className="flex-shrink-0 w-20 h-20 mx-4 relative group">
      <Image
        src={skill.image}
        alt={skill.name}
        width={80}
        height={80}
        className="rounded-lg transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        {skill.name}
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-[#7FFFD4] to-white relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 rounded-bl-[100%] opacity-20 blur-2xl -z-10" />
      
      <header className="sticky top-0 z-50 flex justify-center mx-auto px-4 py-4">
        <nav className="inline-flex justify-center space-x-2 text-sm font-medium bg-white/70 backdrop-blur-md py-2 px-3 rounded-full shadow-lg">
          {['home', 'journey', 'skills', 'portfolio', 'certifications', 'experience', 'learn', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => scrollToSection(e, section)}
              className={`transition-colors ${pathname === `/${section}` ? 'text-pink-500' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section id="home" className="py-20 text-center">
          <p className="text-emerald-600 mb-4 font-semibold">Egi Wiratama</p>
          <h1 className="text-5xl font-bold mb-6 text-emerald-800">Build, Optimize, and Secure</h1>
          <p className="text-xl text-emerald-700 mb-8">
            Empowering systems, optimizing performance,<br />
            and ensuring security to create lasting impact. ✨
          </p>
          <Image
            src="/placeholder.svg?height=150&width=150"
            alt="Profile"
            width={150}
            height={150}
            className="rounded-full mx-auto border-4 border-emerald-300"
          />
        </section>

        <section id="journey" className="py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="About Me"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-bold mb-6 text-emerald-800">My Journey to Backend Engineering 🚀</h2>
            <p className="text-emerald-700 mb-6">
              Driven by curiosity from the early days of watching friends play Point Blank in internet cafes, I dreamt of owning my own PC and creating something impactful. This journey started with HTML, CSS, and JS, building basic websites and experimenting with code.
            </p>
            <p className="text-emerald-700 mb-6">
              Today, I specialize as a backend engineer, focusing on building scalable, efficient, and secure systems that power the technology behind the scenes. From optimizing databases to ensuring security, I thrive on solving complex problems and driving the core functionality of applications.
            </p>
          </div>
        </section>

        <section id="skills" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-emerald-800">My Skills</h2>
          <div className="overflow-hidden">
            <div 
              ref={topRowRef} 
              className="flex mb-8"
              onMouseEnter={() => setIsTopRowPaused(true)}
              onMouseLeave={() => setIsTopRowPaused(false)}
              style={{
                width: '200%',
                transform: 'translateX(0)',
                transition: 'transform 0.5s ease-out'
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
                width: '200%',
                transform: 'translateX(-50%)',
                transition: 'transform 0.5s ease-out'
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
        </section>

        <section id="portfolio" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-emerald-800">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Student & Item Management with Laravel 11",
                description: "A final project during my school days, with CRUD, PDF etc.",
                imageUrl: "/portofolio/sb2.png?height=200&width=300"
              },
              {
                title: "School learning score website with html, css, php",
                description: "final project in eleventh grade to determine grade promotion by using mariadb database",
                imageUrl: "/portofolio/rapot.png?height=200&width=300"
              },
              {
                title: "Braille Text use Python",
                description: "A collaboration with other schools at the AWS Sagasitas offline event to help the visually impaired ",
                imageUrl: "/portofolio/braille.jpg?height=200&width=300"
              }
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <Image
                  src={project.imageUrl}
                  alt={`Project ${index + 1}`}
                  width={300}
                  height={200}
                  className="w-full"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2 text-emerald-700">{project.title}</h3>
                  <p className="text-emerald-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-emerald-800">My Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Cyber Jawara Certificate", src: "/certificate/cyberjawaracertificate.jpeg" },
              { name: "Dicoding AWS Certificate", src: "/certificate/dicodingaws.jpeg" },
              { name: "BDD Certificate", src: "/certificate/bdd.jpg" }
            ].map((cert, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={cert.src}
                  alt={cert.name}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="bg-white text-emerald-800 px-4 py-2 rounded-full font-semibold hover:bg-emerald-100 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 mx-auto max-w-2xl">
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
                  <button className="bg-white text-emerald-800 px-4 py-2 rounded-full font-semibold hover:bg-emerald-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-20">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-emerald-800">My Experience</h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 w-72">
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <Image
                  
                  src="/experience/sys.png?height=200&width=300"
                  alt="Company Logo"
                  width={150}
                  height={100}
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-lg text-emerald-700">Internship Backend Engineering</h3>
                <p className="text-sm text-gray-500 mb-2">July 2024 - Present</p>
                <p className="text-gray-600 text-sm">
                Responsible for building and managing a backend using Golang, with PostgreSQL for database management and Postman for API testing 
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="learn" className="py-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-extrabold text-emerald-800">Explore with Egi</h2>
            <a href="#learn" className="text-emerald-600 hover:text-emerald-500 transition-colors">View all</a>
          </div>
          <p className="text-lg text-emerald-700 mb-10">
          Explore my in-depth tutorials and specialized courses crafted to boost your expertise in backend development, covering everything from API design to database management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "How to make Environtment in Postman",
                description: "Perfect for mastering responsive web design with pure HTML & CSS",
                image: "/placeholder.svg?height=200&width=300"
              },
              {
                title: "Apa itu JSON?",
                description: "Ideal for those wanting to dive into the complete landing page design process using Figma.",
                image: "/placeholder.svg?height=200&width=300"
              },
              {
                title: "Migrations Database in Golang",
                description: "Great for quickly building responsive websites using the powerful Bootstrap framework.",
                image: "/placeholder.svg?height=200&width=300"
              }
            ].map((course, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-lg text-emerald-700">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#7FFFD4] to-white opacity-50 rounded-lg overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl font-extrabold mb-6 text-emerald-800">Every question is an opportunity to learn and grow together</h2>
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors">
              Ask Me Anything
            </button>
          </div>
          <div className="absolute bottom-10 right-10">
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt="Avatar"
              width={60}
              height={60}
              className="rounded-full border-2 border-emerald-300"
            />
          </div>
        </section>
      </main>
    </div>
  )
}