'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMoodStore, moodThemes, Mood } from '@/store/useMoodStore'

interface TrailPoint {
  x: number
  y: number
  id: number
  opacity: number
  size: number
}

export default function MoodCoordinate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { currentMood, setMood, setCoordinatePosition } = useMoodStore()
  const theme = moodThemes[currentMood]
  const [trails, setTrails] = useState<TrailPoint[]>([])
  const trailCounter = useRef(0)
  const [dotPos, setDotPos] = useState({ x: 0.75, y: 0.25 })
  const [isDragging, setIsDragging] = useState(false)
  const [moodAnimation, setMoodAnimation] = useState<Mood | null>(null)

  const getMoodFromPosition = useCallback((x: number, y: number): Mood => {
    if (x > 0.5 && y < 0.5) return 'happy'
    if (x < 0.5 && y > 0.5) return 'sad'
    if (x < 0.5 && y < 0.5) return 'angry'
    return 'relaxed'
  }, [])

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0.05, Math.min(0.95, (clientX - rect.left) / rect.width))
    const y = Math.max(0.05, Math.min(0.95, (clientY - rect.top) / rect.height))

    setDotPos({ x, y })
    setCoordinatePosition({ x: (x - 0.5) * 4, y: (0.5 - y) * 4 })

    trailCounter.current++
    const trailSize = 8 + Math.min(trails.length, 6) * 2
    setTrails(prev => [...prev.slice(-12), { x, y, id: trailCounter.current, opacity: 1, size: trailSize }])

    const newMood = getMoodFromPosition(x, y)
    if (newMood !== currentMood) {
      setMood(newMood)
      setMoodAnimation(newMood)
      setTimeout(() => setMoodAnimation(null), 1500)
    }
  }, [currentMood, getMoodFromPosition, setMood, setCoordinatePosition, trails.length])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    ;(e.target as Element).setPointerCapture(e.pointerId)
    handleInteraction(e.clientX, e.clientY)
  }, [handleInteraction])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    handleInteraction(e.clientX, e.clientY)
  }, [isDragging, handleInteraction])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (trails.length === 0) return
    const timer = setInterval(() => {
      setTrails(prev => prev.map(t => ({ ...t, opacity: t.opacity - 0.06 })).filter(t => t.opacity > 0))
    }, 50)
    return () => clearInterval(timer)
  }, [trails.length])

  return (
    <div
      ref={containerRef}
      className="w-full h-full touch-none relative"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ cursor: 'crosshair' }}
    >
      {/* Quadrant gradient background */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(135deg,
            ${moodThemes.angry.cardBg}60 0%,
            ${moodThemes.happy.cardBg}60 50%,
            ${moodThemes.sad.cardBg}60 50%,
            ${moodThemes.relaxed.cardBg}60 100%)`
      }} />

      {/* Radial glow following dot */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at ${dotPos.x * 100}% ${dotPos.y * 100}%, ${theme.primary}18 0%, transparent 45%)`
      }} />

      {/* Cross axis lines */}
      <div className="absolute left-1/2 top-[3px] bottom-[3px] w-px" style={{ backgroundColor: `${theme.textPrimary}12` }} />
      <div className="absolute top-1/2 left-[19px] right-[19px] h-px" style={{ backgroundColor: `${theme.textPrimary}12` }} />

      {/* Mood labels - exact Figma positions relative to 374px wide, 358px tall container */}
      {/* 愤怒: left ~50px from container, vertically centered */}
      <div className="absolute left-[19px] top-1/2 -translate-y-1/2 flex items-center gap-[4px]">
        <img src="/mood/angry.svg" alt="" className="w-[20px] h-[20px]" />
        <span className="text-[14px] font-bold leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>愤怒</span>
      </div>
      {/* 开心: top-right corner */}
      <div className="absolute right-[19px] top-[9px] flex items-center gap-[2px]">
        <span className="text-[14px] font-bold leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>开心</span>
        <img src="/mood/happy.svg" alt="" className="w-[20px] h-[20px]" />
      </div>
      {/* 悲伤: bottom-left */}
      <div className="absolute left-[19px] bottom-[9px] flex items-center gap-[4px]">
        <img src="/mood/sad.svg" alt="" className="w-[20px] h-[20px]" />
        <span className="text-[14px] font-bold leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>悲伤</span>
      </div>
      {/* 安逸: bottom-right */}
      <div className="absolute right-[19px] bottom-[9px] flex items-center gap-[2px]">
        <span className="text-[14px] font-bold leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>安逸</span>
        <img src="/mood/relaxed.svg" alt="" className="w-[20px] h-[20px]" />
      </div>

      {/* Trail dots with graduated sizes (8→18px) and blur */}
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${trail.x * 100}%`,
            top: `${trail.y * 100}%`,
            width: trail.size,
            height: trail.size,
            transform: 'translate(-50%, -50%)',
            backgroundColor: theme.primary,
            opacity: trail.opacity * 0.4,
            filter: `blur(${(1 - trail.opacity) * 4}px)`,
          }}
        />
      ))}

      {/* Cursor dot - 32x32 with glow */}
      <motion.div
        className="absolute pointer-events-none z-10"
        style={{
          left: `${dotPos.x * 100}%`,
          top: `${dotPos.y * 100}%`,
          width: 32,
          height: 32,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <img src="/ui/cursor.svg" alt="" className="w-full h-full drop-shadow-lg" />
      </motion.div>

      {/* Mood change animation */}
      {moodAnimation && (
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.img src={moodThemes[moodAnimation].iconSrc} alt="" className="w-[64px] h-[64px]"
            initial={{ scale: 0, rotate: -180 }} animate={{ scale: [0, 1.5, 1], rotate: 0 }} transition={{ duration: 0.6 }} />
        </motion.div>
      )}
    </div>
  )
}
