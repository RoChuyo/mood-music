'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMoodStore, moodThemes, Mood } from '@/store/useMoodStore'

interface TrailPoint {
  x: number
  y: number
  id: number
  opacity: number
}

export default function MoodCoordinate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { currentMood, setMood, setCoordinatePosition } = useMoodStore()
  const theme = moodThemes[currentMood]
  const [trails, setTrails] = useState<TrailPoint[]>([])
  const trailCounter = useRef(0)
  const [dotPos, setDotPos] = useState({ x: 0.65, y: 0.35 })
  const [isDragging, setIsDragging] = useState(false)
  const [moodAnimation, setMoodAnimation] = useState<Mood | null>(null)

  const springX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })
  const springY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })

  const getMoodFromPosition = useCallback((x: number, y: number): Mood => {
    if (x > 0.5 && y < 0.5) return 'happy'
    if (x < 0.5 && y < 0.5) return 'sad'
    if (x < 0.5 && y > 0.5) return 'angry'
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
    setTrails(prev => [...prev.slice(-12), { x, y, id: trailCounter.current, opacity: 1 }])

    const newMood = getMoodFromPosition(x, y)
    if (newMood !== currentMood) {
      setMood(newMood)
      setMoodAnimation(newMood)
      setTimeout(() => setMoodAnimation(null), 1500)
    }
  }, [currentMood, getMoodFromPosition, setMood, setCoordinatePosition])

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
      setTrails(prev => prev.map(t => ({ ...t, opacity: t.opacity - 0.08 })).filter(t => t.opacity > 0))
    }, 50)
    return () => clearInterval(timer)
  }, [trails.length])

  const moodEmojis: Record<Mood, { emoji: string; particles: string[] }> = {
    happy: { emoji: '☀️', particles: ['🌟', '✨', '💛', '🌻'] },
    sad: { emoji: '🌊', particles: ['💧', '🌧️', '💙', '🫧'] },
    angry: { emoji: '🔥', particles: ['💥', '⚡', '❤️‍🔥', '🌋'] },
    relaxed: { emoji: '🌙', particles: ['🍃', '☁️', '🌿', '🦋'] },
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative h-[220px] w-full rounded-2xl overflow-hidden touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ cursor: 'crosshair' }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: `linear-gradient(135deg,
              ${moodThemes.angry.cardBg} 0%,
              ${moodThemes.happy.cardBg} 50%,
              ${moodThemes.sad.cardBg} 50%,
              ${moodThemes.relaxed.cardBg} 100%)`
          }}
          transition={{ duration: 0.8 }}
        />

        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at ${dotPos.x * 100}% ${dotPos.y * 100}%, ${theme.primary}15 0%, transparent 50%)
          `
        }} />

        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/10" />

        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-medium" style={{ color: moodThemes.angry.primary }}>
          <span>🔥</span> 愤怒
        </div>
        <div className="absolute right-2 top-2 flex items-center gap-1 text-xs font-medium" style={{ color: moodThemes.happy.primary }}>
          开心 <span>☀️</span>
        </div>
        <div className="absolute left-2 bottom-2 flex items-center gap-1 text-xs font-medium" style={{ color: moodThemes.sad.primary }}>
          <span>🌊</span> 悲伤
        </div>
        <div className="absolute right-2 bottom-2 flex items-center gap-1 text-xs font-medium" style={{ color: moodThemes.relaxed.primary }}>
          安逸 <span>🌙</span>
        </div>

        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${trail.x * 100}%`,
              top: `${trail.y * 100}%`,
              width: 12,
              height: 12,
              transform: 'translate(-50%, -50%)',
              backgroundColor: theme.primary,
              opacity: trail.opacity * 0.3,
              filter: `blur(${(1 - trail.opacity) * 4}px)`,
            }}
          />
        ))}

        <motion.div
          className="absolute rounded-full shadow-lg pointer-events-none z-10"
          style={{
            left: `${dotPos.x * 100}%`,
            top: `${dotPos.y * 100}%`,
            width: 24,
            height: 24,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ backgroundColor: theme.primary, boxShadow: `0 0 20px ${theme.primary}60` }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ backgroundColor: theme.primary }}
          />
        </motion.div>

        {moodAnimation && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="text-4xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: [0, 1.5, 1], rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              {moodEmojis[moodAnimation].emoji}
            </motion.span>
            {moodEmojis[moodAnimation].particles.map((p, i) => (
              <motion.span
                key={i}
                className="absolute text-lg"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: [0, (Math.cos(i * Math.PI / 2) * 60)],
                  y: [0, (Math.sin(i * Math.PI / 2) * 60)],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
              >
                {p}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
