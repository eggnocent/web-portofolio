'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Component() {
  const pathname = usePathname()
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [isTopRowPaused, setIsTopRowPaused] = useState(false)
  const [isBottomRowPaused, setIsBottomRowPaused] = useState(false)

  useEffect(() => {
    const topRow = topRowRef.current
    const bottomRow = bottomRowRef.current

    if (topRow && bottomRow) {
      const animateRow = (row: HTMLDivElement, direction: 'left' | 'right', isPaused: boolean, setIsPaused: (paused: boolean) => void) => {
        const scrollWidth = row.scrollWidth
        // const viewportWidth = row.offsetWidth
        let start = direction === 'left' ? 0 : -scrollWidth / 2
        let lastTimestamp: number | null = null
        let animationId: number

        const step = (timestamp: number) => {
          if (lastTimestamp === null) {
            lastTimestamp = timestamp
          }
          const elapsed = timestamp - lastTimestamp
          
          if (!isPaused) {
            const pixelsPerSecond = 66.67
            const delta = (pixelsPerSecond * elapsed) / 1000
            start += direction === 'left' ? -delta : delta
            if (direction === 'left' && start <= -scrollWidth / 2) {
              start = 0
            } else if (direction === 'right' && start >= 0) {
              start = -scrollWidth / 2
            }
            row.style.transform = `translateX(${start}px)`
          }
          
          lastTimestamp = timestamp
          animationId = requestAnimationFrame(step)
        }

        animationId = requestAnimationFrame(step)

        const handleMouseEnter = () => setIsPaused(true)
        const handleMouseLeave = () => setIsPaused(false)

        row.addEventListener('mouseenter', handleMouseEnter)
        row.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          cancelAnimationFrame(animationId)
          row.removeEventListener('mouseenter', handleMouseEnter)
          row.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

      const cleanupTop = animateRow(topRow, 'left', isTopRowPaused, setIsTopRowPaused)
      const cleanupBottom = animateRow(bottomRow, 'right', isBottomRowPaused, setIsBottomRowPaused)

      return () => {
        cleanupTop()
        cleanupBottom()
      }
    }
  }, [isTopRowPaused, isBottomRowPaused])

  const SkillLogo = ({ skill }: { skill: string }) => (
    <div 
      className="flex-shrink-0 w-16 h-16 relative cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110"
      onMouseEnter={() => setHoveredSkill(skill)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      <Image src={`/placeholder.svg?text=${skill}&width=64&height=64`} alt={skill} width={64} height={64} layout="fixed" />
      {hoveredSkill === skill && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-xs font-bold uppercase transition-opacity duration-300 ease-in-out">
          {skill}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#7FFFD4] to-white relative z-10">
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 rounded-bl-[100%] opacity-20 blur-2xl -z-10" />
      
      {/* Add smooth scrolling */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes slideLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes slideRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slideLeft 15s linear infinite;
        }
        .animate-slide-right {
          animation: slideRight 15s linear infinite;
        }
      `}</style>
      
      <header className="sticky top-0 z-50 flex justify-center mx-auto px-4 py-4">
        <nav className="inline-flex justify-center space-x-2 text-sm font-medium bg-white/70 backdrop-blur-md py-2 px-3 rounded-full shadow-lg">
          <a href="#home" className={`transition-colors ${pathname === '/' ? 'text-pink-500' : 'text-gray-500 hover:text-gray-800'}`}>Home</a>
          <a href="#journey" className={`transition-colors ${pathname === '/journey' ? 'text-pink-500' : 'text-gray-500 hover:text-gray-800'}`}>Journey</a>
          <a href="#skills" className={`transition-colors ${pathname === '/skills' ? 'text-pink-500' : 'text-gray-500 hover:text-gray-800'}`}>Skills</a>
          <a href="#portfolio" className={`transition-colors ${pathname === '/portfolio' ? 'text-pink-500' : 'text-gray-500 hover:text-gray-800'}`}>Portfolio</a>
          <a href="#certifications" className={`transition-colors ${pathname === '/certifications' ? 'text-pink-500' : 'text-gray-500 hover:text-gray-800'}`}>Certifications</a>
          <a href="#experience" className={`transition-colors ${pathname === '/experience' ? 'text-pink-500' : 'text-gray-500 hover:text-gray-800'}`}>Experience</a>
          <a href="#learn" className={`transition-colors ${pathname === '/learn' ? 'text-pink-500' : 'text-gray-500 hover:text-gray-800'}`}>Learn</a>
          <a href="#contact" className={`transition-colors ${pathname === '/contact' ? 'text-pink-500' : 'text-gray-500 hover:text-gray-800'}`}>Contact</a>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section id="home" className="py-20 text-center">
          <p className="text-emerald-600 mb-4 font-semibold">Meet Mareta</p>
          <h1 className="text-5xl font-bold mb-6 text-emerald-800">Design, Develop, Inspire</h1>
          <p className="text-xl text-emerald-700 mb-8">
            Breathing life into designs, transforming magic into code,<br />
            and making a positive impact. ✨
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
            <h2 className="text-3xl font-bold mb-6 text-emerald-800">My Exciting Journey 🤓</h2>
            <p className="text-emerald-700 mb-6">
              Fueled by an insatiable curiosity and a love for learning, my journey started with building landing pages using HTML, CSS & JS, followed by crafting user experiences in UI/UX Design.
            </p>
            <p className="text-emerald-700 mb-6">
              Now, I thrive as a Software Engineer specializing in frontend development. Alongside, I share my expertise and experiences as a Tech Content Creator.
            </p>
            <div className="flex space-x-6">
              <div>
                <p className="text-2xl font-bold text-emerald-800">28K+</p>
                <p className="text-emerald-600">TikTok</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-800">11K+</p>
                <p className="text-emerald-600">Instagram</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-emerald-800">My Skills</h2>
          <div className="overflow-hidden">
            <div 
              ref={topRowRef} 
              className="flex space-x-8 mb-8 animate-slide-left"
              style={{
                animationPlayState: isTopRowPaused ? 'paused' : 'running'
              }}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex space-x-8">
                  {['html5', 'css3', 'javascript', 'typescript', 'react', 'nextjs', 'tailwind', 'bootstrap'].map((skill) => (
                    <SkillLogo key={`${skill}-${i}`} skill={skill} />
                  ))}
                </div>
              ))}
            </div>
            <div 
              ref={bottomRowRef} 
              className="flex space-x-8 animate-slide-right"
              style={{
                animationPlayState: isBottomRowPaused ? 'paused' : 'running'
              }}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex space-x-8">
                  {['nodejs', 'express', 'mongodb', 'postgresql', 'firebase', 'git', 'figma', 'photoshop'].map((skill) => (
                    <SkillLogo key={`${skill}-${i}`} skill={skill} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-emerald-800">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <Image
                  src={`/placeholder.svg?height=200&width=300`}
                  alt={`Project ${item}`}
                  width={300}
                  height={200}
                  className="w-full"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2 text-emerald-700">Project Title</h3>
                  <p className="text-emerald-600">Short project description goes here.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-emerald-800">My Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="relative group overflow-hidden rounded-lg">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=Certification+${item}`}
                  alt={`Certification ${item}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
        </section>

        <section id="experience" className="py-20">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-emerald-800">My Experience</h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 w-72">
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Company Logo"
                  width={150}
                  height={100}
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-lg text-emerald-700">Frontend Developer</h3>
                <p className="text-sm text-gray-500 mb-2">January 2020 - Present</p>
                <p className="text-gray-600 text-sm">
                  Responsible for creating responsive user interfaces and engaging user experiences using React.js and Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="learn" className="py-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-extrabold text-emerald-800">Learn with Mareta</h2>
            <a href="#learn" className="text-emerald-600 hover:text-emerald-500 transition-colors">View all</a>
          </div>
          <p className="text-lg text-emerald-700 mb-10">
            Dive into my step-by-step tutorials and exclusive courses designed to enhance your skills in UI/UX design and front-end development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Slicing Responsive Personal Website HTML CSS & Deploy to Vercel",
                description: "Perfect for mastering responsive web design with pure HTML & CSS",
                image: "/placeholder.svg?height=200&width=300"
              },
              {
                title: "Landing Page UI Design Tutorial with Figma",
                description: "Ideal for those wanting to dive into the complete landing page design process using Figma.",
                image: "/placeholder.svg?height=200&width=300"
              },
              {
                title: "Slicing Landing Page Personal Website - Bootstrap",
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

        <section className="py-20">
          <h2 className="text-3xl  font-bold text-center mb-10 text-emerald-800">Lets Connect and Say Hi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'LinkedIn', icon: '/placeholder.svg?text=LinkedIn&width=64&height=64' },
              { name: 'Instagram', icon: '/placeholder.svg?text=Instagram&width=64&height=64' },
              { name: 'Github', icon: '/placeholder.svg?text=Github&width=64&height=64' },
              { name: 'Email', icon: '/placeholder.svg?text=Email&width=64&height=64' },
            ].map((social) => (
              <div key={social.name} className="flex flex-col items-center p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={64}
                  height={64}
                  className="mb-4 rounded-lg"
                />
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">{social.name}</h3>
                <button className="mt-2 px-6 py-2 rounded-full text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-300">
                  Connect
                </button>
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
