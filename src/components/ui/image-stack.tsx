"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, PanInfo } from "framer-motion"

interface ProjectData {
  name: string
  description: string
  url: string
}

interface Card {
  id: number
  src: string
  zIndex: number
  project: ProjectData
}

interface ImgStackProps {
  projects: { src: string; name: string; description: string; url: string }[]
}

export default function ImgStack({ projects }: ImgStackProps) {
  const [cards, setCards] = useState<Card[]>(
    projects.map((p, index) => ({
      id: index,
      src: p.src,
      zIndex: 50 - index * 10,
      project: { name: p.name, description: p.description, url: p.url },
    }))
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })

  const getCardStyles = (index: number) => {
    const baseRotation = 2
    const rotationIncrement = 3
    const offsetIncrement = -12
    const verticalOffset = -8

    return {
      x: index * offsetIncrement,
      y: index * verticalOffset,
      rotate: index === 0 ? 0 : -(baseRotation + index * rotationIncrement),
      scale: 1,
      transition: { duration: 0.5 },
    }
  }

  const handleDragStart = (_: any, info: PanInfo) => {
    dragStartPos.current = { x: info.point.x, y: info.point.y }
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    const dx = info.point.x - dragStartPos.current.x
    const dy = info.point.y - dragStartPos.current.y
    const dragDistance = Math.sqrt(dx * dx + dy * dy)

    if (isAnimating || dragDistance < 50) return

    setIsAnimating(true)
    setHoveredId(null)

    setCards((prev) => {
      const next = [...prev]
      const moved = next.shift()!
      next.push(moved)
      return next.map((card, i) => ({
        ...card,
        zIndex: 50 - i * 10,
      }))
    })

    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="relative flex items-center justify-center w-96 h-96 my-12">
      {cards.map((card, index) => {
        const isTopCard = index === 0
        const isHovered = hoveredId === card.id
        const style = getCardStyles(index)

        return (
          <motion.div
            key={card.id}
            className="absolute w-64 origin-bottom-center overflow-hidden rounded-xl shadow-xl bg-card border border-white/[0.08]"
            style={{
              zIndex: card.zIndex,
              aspectRatio: "5/7",
            }}
            animate={style}
            drag={isTopCard && !isAnimating}
            dragElastic={0.2}
            dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
            dragSnapToOrigin={true}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onHoverStart={isTopCard ? () => setHoveredId(card.id) : undefined}
            onHoverEnd={isTopCard ? () => setHoveredId(null) : undefined}
            whileHover={
              isTopCard
                ? { scale: 1.05, transition: { duration: 0.2 } }
                : {}
            }
            whileDrag={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.1 },
            }}
          >
            <Image
              src={card.src}
              alt={card.project.name}
              fill
              className="object-cover rounded-xl pointer-events-none"
              sizes="(max-width: 768px) 100vw, 200px"
              draggable={false}
            />

            <motion.div
              className="absolute inset-0 rounded-xl flex flex-col justify-end p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent rounded-xl" />

              <div className="relative flex items-center gap-2.5 mb-3">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <Image
                    src={card.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="28px"
                  />
                </div>
                <span className="text-sm font-medium text-white tracking-tight">
                  {card.project.name}
                </span>
              </div>

              <p className="relative text-[11px] text-white/60 leading-relaxed line-clamp-3 mb-3">
                {card.project.description}
              </p>

              <a
                href={card.project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-[11px] text-white/70 hover:text-white hover:border-white/40 transition-colors duration-200 self-start pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Project
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
