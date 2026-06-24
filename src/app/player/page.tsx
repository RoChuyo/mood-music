'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
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

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => setProgress(p => p >= 1 ? 0 : p + 0.002), 100)
    return () => clearInterval(timer)
  }, [isPlaying])

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
    const lyrics = ['歌词加载中...', '', '请欣赏音乐旋律', '', '感受每一个音符', '', '让心情随着旋律流动', '', '...']
    return (
      <motion.div
        className="min-h-screen flex flex-col"
        animate={{ background: `linear-gradient(180deg, ${theme.bg} 0%, #fff 100%)` }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <button onClick={() => setShowLyrics(false)}>
            <svg className="h-[44px] w-[44px] -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button><svg className="h-7 w-7" style={{ color: theme.textPrimary }} fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {lyrics.map((line, i) => (
            <motion.p key={i} className="transition-all duration-500" style={{ fontSize: i === 3 ? 24 : 16, fontWeight: i === 3 ? 700 : 400, opacity: i === 3 ? 1 : 0.35, color: i === 3 ? theme.primary : theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>
              {line || '···'}
            </motion.p>
          ))}
        </div>
        <div className="px-6 pb-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[24px] font-medium" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.title}</p>
            <img src="/ui/add-mood.svg" alt="" className="w-10 h-10" onClick={() => setShowMoodWheel(!showMoodWheel)} />
          </div>
          <p className="text-[14px] mb-3" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.artist} · {song.album}</p>
          <div className="relative mb-2"><div className="h-1 rounded-full bg-[#393636]"><motion.div className="h-full rounded-full" animate={{ width: `${progress * 100}%`, backgroundColor: theme.primary }} /></div></div>
          <div className="flex justify-between text-[12.78px] mb-4" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}><span>{formatTime(progress)}</span><span>{song.duration}</span></div>
          <div className="flex items-center justify-center gap-6 mb-4">
            <button className="h-[35px] w-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}15` }}><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={theme.textPrimary} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
            <button className="h-[35px] w-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}15` }} onClick={handlePrev}><svg className="h-5 w-5" fill={theme.textPrimary} viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>
            <button className="h-[52px] w-[52px] rounded-full bg-black flex items-center justify-center shadow-lg" onClick={togglePlaying}>
              {isPlaying ? <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
              : <svg className="h-6 w-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
            </button>
            <button className="h-[35px] w-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}15` }} onClick={handleNext}><svg className="h-5 w-5" fill={theme.textPrimary} viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg></button>
            <button className="h-[35px] w-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}15` }}><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={theme.textPrimary} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg></button>
          </div>
        </div>
        <div className="mx-[14px] mb-8 rounded-[51px] p-3 flex items-center gap-3" style={{ backgroundColor: `${theme.cardBg}33` }} onClick={() => router.push('/records/publish')}>
          <img src="/ui/record-circle.svg" alt="" className="w-10 h-10" />
          <div><p className="text-[14px] font-semibold" style={{ color: theme.textPrimary }}>记录此刻心情</p><p className="text-[10px]" style={{ color: theme.textPrimary }}>2026.6.11</p></div>
          <div className="flex-1" />
          <div className="flex items-center gap-1"><img src={theme.iconSrc} alt="" className="w-[18px] h-[18px]" /><span className="text-[14px]" style={{ color: theme.textPrimary }}>{theme.label}（{coordinatePosition.x.toFixed(0)}, {coordinatePosition.y.toFixed(0)}）</span></div>
          <img src="/icons/bell.svg" alt="" className="w-4 h-4" />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div className="min-h-screen flex flex-col" animate={{ background: `linear-gradient(180deg, ${theme.bg} 0%, #fff 100%)` }} transition={{ duration: 0.8 }}>
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <button onClick={() => router.back()}>
          <svg className="h-[44px] w-[44px] -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button><svg className="h-7 w-7" style={{ color: theme.textPrimary }} fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></button>
      </div>

      <div className="flex-1 flex flex-col items-center px-[28px]">
        <motion.div
          className="w-[346px] h-[346px] rounded-[8px] mb-8 overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
          onClick={() => setShowLyrics(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={song.id}
              src={song.cover}
              alt={song.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </AnimatePresence>
        </motion.div>

        <div className="w-full flex items-start justify-between mb-2">
          <div>
            <AnimatePresence mode="wait">
              <motion.h2 key={song.id} className="text-[24px] font-medium" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>{song.title}</motion.h2>
            </AnimatePresence>
            <p className="text-[14px]" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.artist} · {song.album}</p>
          </div>
          <div className="relative">
            <button onClick={() => setShowMoodWheel(!showMoodWheel)}>
              <img src="/ui/add-mood.svg" alt="" className="w-10 h-10" />
            </button>
            <AnimatePresence>
              {showMoodWheel && moodWheelItems.map(({ mood, angle }, i) => {
                const t = moodThemes[mood]
                const rad = (angle * Math.PI) / 180
                return (
                  <motion.button key={mood} className="absolute h-9 w-9 rounded-full flex items-center justify-center z-0"
                    style={{ backgroundColor: t.primary, top: '50%', left: '50%' }}
                    initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
                    animate={{ x: `calc(-50% + ${Math.cos(rad) * 50}px)`, y: `calc(-50% + ${Math.sin(rad) * 50}px)`, scale: 1, opacity: 1 }}
                    exit={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => { e.stopPropagation(); setShowMoodWheel(false) }}
                  >
                    <img src={t.iconSrc} alt="" className="w-5 h-5" />
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full mt-4">
          <div className="relative h-1 rounded-full bg-[#393636] mb-2" onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setProgress((e.clientX - rect.left) / rect.width) }}>
            <motion.div className="h-full rounded-full" animate={{ width: `${progress * 100}%`, backgroundColor: theme.primary }} transition={{ duration: 0.1 }} />
            <motion.div className="absolute top-1/2 h-[8.5px] w-[8.5px] rounded-full" animate={{ left: `${progress * 100}%`, backgroundColor: theme.primary }} style={{ transform: 'translate(-50%, -50%)' }} />
          </div>
          <div className="flex justify-between text-[12.78px]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}><span>{formatTime(progress)}</span><span>{song.duration}</span></div>
        </div>

        <div className="flex items-center justify-center gap-[20px] mt-8 w-full">
          <button className="h-[35px] w-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}15` }}>
            <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke={theme.textPrimary} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
          <button className="h-[35px] w-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}15` }} onClick={handlePrev}>
            <svg className="h-[22px] w-[22px]" fill={theme.textPrimary} viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
          </button>
          <motion.button className="h-[52px] w-[52px] rounded-full bg-black flex items-center justify-center shadow-lg" onClick={togglePlaying} whileTap={{ scale: 0.9 }}>
            {isPlaying ? <svg className="h-[22px] w-[22px] text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
            : <svg className="h-[22px] w-[22px] text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
          </motion.button>
          <button className="h-[35px] w-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}15` }} onClick={handleNext}>
            <svg className="h-[22px] w-[22px]" fill={theme.textPrimary} viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
          </button>
          <button className="h-[35px] w-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}15` }}>
            <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke={theme.textPrimary} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      <div className="mx-[14px] mb-8 rounded-[51px] p-3 flex items-center gap-3 mt-8" style={{ backgroundColor: `${theme.cardBg}33` }} onClick={() => router.push('/records/publish')}>
        <img src="/ui/record-circle.svg" alt="" className="w-10 h-10" />
        <div><p className="text-[14px] font-semibold" style={{ color: theme.textPrimary }}>记录此刻心情</p><p className="text-[10px]" style={{ color: theme.textPrimary }}>2026.6.11</p></div>
        <div className="flex-1" />
        <div className="flex items-center gap-1"><img src={theme.iconSrc} alt="" className="w-[18px] h-[18px]" /><span className="text-[14px]" style={{ color: theme.textPrimary }}>{theme.label}（{coordinatePosition.x.toFixed(0)}, {coordinatePosition.y.toFixed(0)}）</span></div>
        <img src="/icons/bell.svg" alt="" className="w-4 h-4" />
      </div>
    </motion.div>
  )
}
