'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useMoodStore, moodThemes, Mood } from '@/store/useMoodStore'
import { songsByMood } from '@/data/songs'

export default function PlayerPage() {
  const router = useRouter()
  const {
    currentMood, currentSongIndex, isPlaying,
    togglePlaying, setCurrentSongIndex, showLyrics, setShowLyrics, coordinatePosition
  } = useMoodStore()
  const theme = moodThemes[currentMood]
  const songs = songsByMood[currentMood]
  const song = songs[currentSongIndex % songs.length]

  const [progress, setProgress] = useState(0.55)
  const [showMoodWheel, setShowMoodWheel] = useState(false)
  const lyricsRef = useRef<HTMLDivElement>(null)
  const [activeLyricIndex, setActiveLyricIndex] = useState(3)

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setProgress(p => p >= 1 ? 0 : p + 0.002)
    }, 100)
    return () => clearInterval(timer)
  }, [isPlaying])

  useEffect(() => {
    if (!showLyrics || !isPlaying) return
    const timer = setInterval(() => {
      setActiveLyricIndex(i => {
        const lyrics = song.lyrics || []
        return i >= lyrics.length - 1 ? 0 : i + 1
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [showLyrics, isPlaying, song.lyrics])

  useEffect(() => {
    if (!lyricsRef.current || !showLyrics) return
    const activeEl = lyricsRef.current.querySelector('[data-active="true"]')
    activeEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeLyricIndex, showLyrics])

  const handlePrev = useCallback(() => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length)
    setProgress(0)
  }, [currentSongIndex, songs.length, setCurrentSongIndex])

  const handleNext = useCallback(() => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length)
    setProgress(0)
  }, [currentSongIndex, songs.length, setCurrentSongIndex])

  const formatTime = (ratio: number) => {
    const totalSeconds = Math.floor(ratio * 269)
    const min = Math.floor(totalSeconds / 60)
    const sec = totalSeconds % 60
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const moodWheelItems: { mood: Mood; angle: number }[] = [
    { mood: 'happy', angle: -45 },
    { mood: 'relaxed', angle: 45 },
    { mood: 'sad', angle: 135 },
    { mood: 'angry', angle: 225 },
  ]

  if (showLyrics) {
    const lyrics = song.lyrics || ['暂无歌词', '请欣赏音乐']
    return (
      <motion.div
        className="min-h-screen flex flex-col"
        animate={{ background: `linear-gradient(180deg, ${theme.bg} 0%, #fff 100%)` }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <button onClick={() => setShowLyrics(false)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button>
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" /></svg>
          </button>
        </div>

        <div ref={lyricsRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {lyrics.map((line, i) => (
            <motion.p
              key={i}
              data-active={i === activeLyricIndex}
              className="transition-all duration-500 cursor-pointer"
              animate={{
                fontSize: i === activeLyricIndex ? '24px' : '16px',
                fontWeight: i === activeLyricIndex ? 700 : 400,
                opacity: i === activeLyricIndex ? 1 : 0.35,
                color: i === activeLyricIndex ? theme.primary : '#666',
              }}
              onClick={() => setActiveLyricIndex(i)}
            >
              {line || '···'}
            </motion.p>
          ))}
        </div>

        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-lg font-bold">{song.title}</p>
            <motion.button
              className="h-10 w-10 rounded-full flex items-center justify-center"
              animate={{ backgroundColor: theme.primary }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMoodWheel(!showMoodWheel)}
            >
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </motion.button>
          </div>
          <p className="text-sm text-gray-500 mb-3">{song.artist} · {song.album}</p>

          <div className="relative mb-2">
            <div className="h-1 rounded-full bg-gray-200">
              <motion.div className="h-full rounded-full" animate={{ width: `${progress * 100}%`, backgroundColor: theme.primary }} />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mb-4">
            <span>{formatTime(progress)}</span>
            <span>{song.duration}</span>
          </div>

          <div className="flex items-center justify-center gap-6 mb-4">
            <button className="text-gray-500"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
            <button onClick={handlePrev}><svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>
            <motion.button
              className="h-14 w-14 rounded-full flex items-center justify-center shadow-lg"
              animate={{ backgroundColor: '#000' }}
              onClick={togglePlaying}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
              ) : (
                <svg className="h-6 w-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              )}
            </motion.button>
            <button onClick={handleNext}><svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg></button>
            <button className="text-gray-500"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
          </div>
        </div>

        <motion.div
          className="mx-4 mb-8 rounded-2xl p-3 flex items-center gap-3"
          animate={{ backgroundColor: theme.cardBg }}
          transition={{ duration: 0.8 }}
          onClick={() => router.push('/records/publish')}
        >
          <motion.div className="h-8 w-8 rounded-full flex items-center justify-center" animate={{ backgroundColor: theme.primary }}>
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </motion.div>
          <div>
            <p className="text-sm font-medium">记录此刻心情</p>
            <p className="text-xs text-gray-500">2026.6.11</p>
          </div>
          <div className="flex-1" />
          <span className="text-xs" style={{ color: theme.primary }}>{theme.icon} {theme.label}（{coordinatePosition.x.toFixed(0)}, {coordinatePosition.y.toFixed(0)}）</span>
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      animate={{ background: `linear-gradient(180deg, ${theme.bg} 0%, #fff 100%)` }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <button onClick={() => router.back()}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        <button>
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" /></svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-6">
        <motion.div
          className="w-[300px] h-[300px] rounded-2xl mb-8 flex items-center justify-center text-6xl shadow-xl overflow-hidden"
          animate={{ backgroundColor: theme.primaryLight + '30' }}
          transition={{ duration: 0.8 }}
          onClick={() => setShowLyrics(true)}
        >
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={isPlaying ? { duration: 20, repeat: Infinity, ease: 'linear' } : {}}
            className="text-8xl"
          >
            🎵
          </motion.div>
        </motion.div>

        <div className="w-full flex items-center justify-between mb-2">
          <div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={song.id}
                className="text-2xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {song.title}
              </motion.h2>
            </AnimatePresence>
            <p className="text-sm text-gray-500">{song.artist} · {song.album}</p>
          </div>

          <div className="relative">
            <motion.button
              className="h-11 w-11 rounded-full flex items-center justify-center z-10 relative"
              animate={{ backgroundColor: theme.primary }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMoodWheel(!showMoodWheel)}
            >
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </motion.button>

            <AnimatePresence>
              {showMoodWheel && (
                <>
                  {moodWheelItems.map(({ mood, angle }, i) => {
                    const t = moodThemes[mood]
                    const rad = (angle * Math.PI) / 180
                    const dist = 50
                    return (
                      <motion.button
                        key={mood}
                        className="absolute h-9 w-9 rounded-full flex items-center justify-center text-sm z-0"
                        style={{ backgroundColor: t.primary, top: '50%', left: '50%' }}
                        initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
                        animate={{
                          x: `calc(-50% + ${Math.cos(rad) * dist}px)`,
                          y: `calc(-50% + ${Math.sin(rad) * dist}px)`,
                          scale: 1,
                          opacity: 1,
                        }}
                        exit={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowMoodWheel(false)
                        }}
                      >
                        {t.icon}
                      </motion.button>
                    )
                  })}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full mt-4">
          <div className="relative h-1 rounded-full bg-gray-200 mb-2" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setProgress((e.clientX - rect.left) / rect.width)
          }}>
            <motion.div className="h-full rounded-full" animate={{ width: `${progress * 100}%`, backgroundColor: theme.primary }} transition={{ duration: 0.1 }} />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full shadow"
              animate={{ left: `${progress * 100}%`, backgroundColor: theme.primary }}
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(progress)}</span>
            <span>{song.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mt-8 w-full">
          <button className="text-gray-500"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
          <button onClick={handlePrev}><svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>
          <motion.button
            className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: '#000' }}
            onClick={togglePlaying}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
            ) : (
              <svg className="h-7 w-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            )}
          </motion.button>
          <button onClick={handleNext}><svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg></button>
          <button className="text-gray-500"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
        </div>
      </div>

      <motion.div
        className="mx-4 mb-8 rounded-2xl p-3 flex items-center gap-3 mt-8"
        animate={{ backgroundColor: theme.cardBg }}
        transition={{ duration: 0.8 }}
        onClick={() => router.push('/records/publish')}
      >
        <motion.div className="h-8 w-8 rounded-full flex items-center justify-center" animate={{ backgroundColor: theme.primary }}>
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
        </motion.div>
        <div>
          <p className="text-sm font-medium">记录此刻心情</p>
          <p className="text-xs text-gray-500">2026.6.11</p>
        </div>
        <div className="flex-1" />
        <span className="text-xs" style={{ color: theme.primary }}>{theme.icon} {theme.label}（{coordinatePosition.x.toFixed(0)}, {coordinatePosition.y.toFixed(0)}）</span>
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
      </motion.div>
    </motion.div>
  )
}
