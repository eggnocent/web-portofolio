"use client"

import { useRef, useEffect } from "react"

export function useSkillsCarousel(isTopRowPaused: boolean, isBottomRowPaused: boolean) {
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)

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

  return { topRowRef, bottomRowRef }
}
