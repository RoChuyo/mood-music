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
    if (x >= 0.5 && y < 0.5) return 'happy'
    if (x < 0.5 && y < 0.5) return 'angry'
    if (x < 0.5 && y >= 0.5) return 'sad'
    return 'relaxed'
  }, [])

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0.05, Math.min(0.95, (clientX - rect.left) / rect.width))
    const y = Math.max(0.05, Math.min(0.95, (clientY - rect.top) / rect.height))

    setDotPos({ x, y })
    setCoordinatePosition({ x: Math.round((x - 0.5) * 4), y: Math.round((0.5 - y) * 4) })

    trailCounter.current++
    const trailSize = 8 + Math.min(trailCounter.current % 7, 6) * 1.7
    setTrails(prev => [...prev.slice(-14), { x, y, id: trailCounter.current, opacity: 1, size: trailSize }])

    const newMood = getMoodFromPosition(x, y)
    if (newMood !== currentMood) {
      setMood(newMood)
      setMoodAnimation(newMood)
      setTimeout(() => setMoodAnimation(null), 1200)
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
      setTrails(prev => prev.map(t => ({ ...t, opacity: t.opacity - 0.05 })).filter(t => t.opacity > 0))
    }, 50)
    return () => clearInterval(timer)
  }, [trails.length])

  return (
    <div className="w-full flex items-center justify-center py-[11px]">
      {/* Square coordinate - 336x336 matching Figma */}
      <div
        ref={containerRef}
        className="relative touch-none"
        style={{ width: 336, height: 336, cursor: 'crosshair' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Quadrant colors */}
        <div className="absolute inset-0" style={{
          background: `
            conic-gradient(
              from 0deg at 50% 50%,
              ${moodThemes.angry.cardBg}80 0deg,
              ${moodThemes.happy.cardBg}80 90deg,
              ${moodThemes.relaxed.cardBg}80 180deg,
              ${moodThemes.sad.cardBg}80 270deg,
              ${moodThemes.angry.cardBg}80 360deg
            )`
        }} />

        {/* Radial glow at dot */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at ${dotPos.x * 100}% ${dotPos.y * 100}%, ${theme.primary}22 0%, transparent 40%)`
        }} />

        {/* Cross lines */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ backgroundColor: `${theme.textPrimary}18` }} />
        <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" style={{ backgroundColor: `${theme.textPrimary}18` }} />

        {/* Labels - Figma: 愤怒 top-left, 开心 top-right, 悲伤 bottom-left, 安逸 bottom-right */}
        <div className="absolute left-[12px] top-[6px] flex items-center gap-[3px]">
          <img src="/mood/angry.svg" alt="" className="w-[18px] h-[18px]" />
          <span className="text-[14px] font-bold leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>愤怒</span>
        </div>
        <div className="absolute right-[12px] top-[6px] flex items-center gap-[3px]">
          <span className="text-[14px] font-bold leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>开心</span>
          <img src="/mood/happy.svg" alt="" className="w-[18px] h-[18px]" />
        </div>
        <div className="absolute left-[12px] bottom-[6px] flex items-center gap-[3px]">
          <img src="/mood/sad.svg" alt="" className="w-[18px] h-[18px]" />
          <span className="text-[14px] font-bold leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>悲伤</span>
        </div>
        <div className="absolute right-[12px] bottom-[6px] flex items-center gap-[3px]">
          <span className="text-[14px] font-bold leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>安逸</span>
          <img src="/mood/relaxed.svg" alt="" className="w-[18px] h-[18px]" />
        </div>

        {/* Trail dots */}
        {trails.map((trail) => (
          <div
            key={trail.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${trail.x * 100}%`,
              top: `${trail.y * 100}%`,
              width: trail.size,
              height: trail.size,
              transform: 'translate(-50%, -50%)',
              backgroundColor: theme.primary,
              opacity: trail.opacity * 0.35,
              filter: `blur(${(1 - trail.opacity) * 3}px)`,
            }}
          />
        ))}

        {/* Cursor dot - 32x32 */}
        <motion.div
          className="absolute pointer-events-none z-10"
          animate={{
            left: `${dotPos.x * 100}%`,
            top: `${dotPos.y * 100}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            width: 32,
            height: 32,
            marginLeft: -16,
            marginTop: -16,
          }}
        >
          <img src="/ui/cursor.svg" alt="" className="w-full h-full drop-shadow-lg" />
        </motion.div>

        {/* Mood transition animation */}
        {moodAnimation && (
          <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.img src={moodThemes[moodAnimation].iconSrc} alt="" className="w-[56px] h-[56px]"
              initial={{ scale: 0, rotate: -180 }} animate={{ scale: [0, 1.4, 1], rotate: 0 }} transition={{ duration: 0.5 }} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
