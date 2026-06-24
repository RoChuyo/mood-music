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
    const lyrics = ['音乐正在播放中', '', '感受旋律的流动', '', '让每个音符', '', '带你进入另一个世界', '', '...']
    return (
      <motion.div className="min-h-screen flex flex-col" animate={{ background: `linear-gradient(180deg, ${theme.bg} 0%, #fff 100%)` }} transition={{ duration: 0.8 }}>
        <div className="flex items-center justify-between px-[16px] pt-[51px] pb-[7px]">
          <button onClick={() => setShowLyrics(false)} className="w-[44px] h-[44px] flex items-center justify-center">
            <svg className="w-[28px] h-[28px] rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className="w-[28px] h-[28px] flex items-center justify-center">
            <svg className="w-[28px] h-[28px]" fill={theme.textPrimary} viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-[28px] py-[32px] space-y-[24px]">
          {lyrics.map((line, i) => (
            <motion.p key={i} style={{
              fontSize: i === 4 ? 24 : 16, fontWeight: i === 4 ? 700 : 400,
              opacity: i === 4 ? 1 : 0.35, color: i === 4 ? theme.textPrimary : theme.textSecondary,
              fontFamily: "'Noto Sans SC', sans-serif", lineHeight: 1.5,
            }}>{line || '···'}</motion.p>
          ))}
        </div>
        {/* Bottom controls same as player */}
        <div className="px-[17px] pb-[8px]">
          <div className="flex items-center justify-between mb-[4px]">
            <p className="text-[24px] font-medium" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.title}</p>
            <button onClick={() => setShowMoodWheel(!showMoodWheel)}>
              <img src="/ui/add-mood.svg" alt="" className="w-[40px] h-[40px]" />
            </button>
          </div>
          <p className="text-[14px] leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.artist} · {song.album}</p>
          <div className="mt-[12px] flex items-center gap-[4px]">
            <span className="text-[12.78px]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>{formatTime(progress)}</span>
            <div className="flex-1 relative h-[8.5px]">
              <div className="absolute top-[2.27px] left-0 right-0 h-[4.26px] rounded-[8px] bg-[#393636]" />
              <motion.div className="absolute top-0 left-0 h-[8.5px] rounded-[8px]" animate={{ width: `${progress * 100}%`, backgroundColor: theme.primary }} />
            </div>
            <span className="text-[12.78px]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>{song.duration}</span>
          </div>
          <div className="flex items-center justify-center gap-[16px] mt-[20px] mb-[12px]">
            <button className="w-[35px] h-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
            <button className="w-[35px] h-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }} onClick={handlePrev}>
              <svg className="w-[20px] h-[20px]" fill="#fff" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
            </button>
            <button className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} onClick={togglePlaying}>
              {isPlaying ? <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth={2}><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              : <svg className="w-[24px] h-[24px] ml-[2px]" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth={2} strokeLinejoin="round"><path d="M8 5v14l11-7z"/></svg>}
            </button>
            <button className="w-[35px] h-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }} onClick={handleNext}>
              <svg className="w-[20px] h-[20px]" fill="#fff" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
            </button>
            <button className="w-[35px] h-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
        {/* Bottom mood record bar - glass pill */}
        <div className="mx-[14px] mb-[20px] rounded-[51px] h-[68px] flex items-center px-[14px] gap-[8px]"
          style={{ backgroundColor: `${theme.cardBg}33`, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          onClick={() => router.push('/records/publish')}>
          <img src="/icons/record-pen.svg" alt="" className="w-[40px] h-[40px]" />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>记录此刻心情</p>
            <p className="text-[10px] leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>2026.6.11</p>
          </div>
          <div className="flex items-center gap-[3px]">
            <img src={theme.iconSrc} alt="" className="w-[18px] h-[18px]" />
            <span className="text-[14px] leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{theme.label}（{coordinatePosition.x.toFixed(0)}, {coordinatePosition.y.toFixed(0)}）</span>
          </div>
          <img src="/icons/bell.svg" alt="" className="w-[17px] h-[17px]" />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div className="flex flex-col h-full" animate={{ background: `linear-gradient(180deg, ${theme.bg} 0%, #fff 100%)` }} transition={{ duration: 0.8 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-[16px] pt-[51px] pb-[7px]">
        <button onClick={() => router.back()} className="w-[44px] h-[44px] flex items-center justify-center">
          <svg className="w-[28px] h-[28px] rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button className="w-[28px] h-[28px] flex items-center justify-center">
          <svg className="w-[28px] h-[28px]" fill={theme.textPrimary} viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
        </button>
      </div>

      <div className="flex flex-col px-[28px]">
        {/* Album art - 346x346, rounded 8px, shadow */}
        <motion.div
          className="w-[310px] h-[310px] rounded-[8px] overflow-hidden mx-auto"
          style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
          onClick={() => setShowLyrics(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img key={song.id} src={song.cover} alt={song.title} className="w-full h-full object-cover"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </AnimatePresence>
        </motion.div>

        {/* Song info + add mood button */}
        <div className="flex items-start justify-between mt-[20px]">
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.h2 key={song.id} className="text-[24px] font-medium leading-[1.5]"
                style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                {song.title}
              </motion.h2>
            </AnimatePresence>
            <p className="text-[14px] leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.artist} · {song.album}</p>
          </div>
          <div className="relative ml-[8px] flex-shrink-0">
            <button onClick={() => setShowMoodWheel(!showMoodWheel)}>
              <img src="/ui/add-mood.svg" alt="" className="w-[40px] h-[40px]" />
            </button>
            <AnimatePresence>
              {showMoodWheel && moodWheelItems.map(({ mood, angle }, i) => {
                const t = moodThemes[mood]
                const rad = (angle * Math.PI) / 180
                return (
                  <motion.button key={mood} className="absolute w-[36px] h-[36px] rounded-full flex items-center justify-center z-20"
                    style={{ backgroundColor: t.primary, top: '50%', left: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                    initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
                    animate={{ x: `calc(-50% + ${Math.cos(rad) * 48}px)`, y: `calc(-50% + ${Math.sin(rad) * 48}px)`, scale: 1, opacity: 1 }}
                    exit={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => { e.stopPropagation(); setShowMoodWheel(false) }}>
                    <img src={t.iconSrc} alt="" className="w-[20px] h-[20px]" />
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar - exact Figma style */}
        <div className="mt-[16px] flex items-center gap-[4px]">
          <span className="text-[12.78px] leading-[1.5] w-[38px]" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>{formatTime(progress)}</span>
          <div className="flex-1 relative h-[8.5px]" onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setProgress((e.clientX - rect.left) / rect.width) }}>
            <div className="absolute top-[2.27px] left-0 right-0 h-[4.26px] rounded-[8px] bg-[#393636]" />
            <motion.div className="absolute top-0 left-0 h-[8.5px] rounded-[8px]" animate={{ width: `${progress * 100}%`, backgroundColor: theme.primary }} transition={{ duration: 0.1 }} />
          </div>
          <span className="text-[12.78px] leading-[1.5] w-[38px] text-right" style={{ color: theme.textPrimary, fontFamily: "'Oxygen', sans-serif" }}>{song.duration}</span>
        </div>

        {/* Playback controls - side buttons filled with theme color, center white */}
        <div className="flex items-center justify-center gap-[16px] mt-[28px]">
          <button className="w-[35px] h-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
            <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
          <button className="w-[35px] h-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }} onClick={handlePrev}>
            <svg className="w-[20px] h-[20px]" fill="#fff" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
          </button>
          <motion.button className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center" onClick={togglePlaying} whileTap={{ scale: 0.9 }}
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            {isPlaying ? <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth={2}><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            : <svg className="w-[24px] h-[24px] ml-[2px]" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth={2} strokeLinejoin="round"><path d="M8 5v14l11-7z"/></svg>}
          </motion.button>
          <button className="w-[35px] h-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }} onClick={handleNext}>
            <svg className="w-[20px] h-[20px]" fill="#fff" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
          </button>
          <button className="w-[35px] h-[35px] rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
            <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {/* Bottom mood record bar - glass pill */}
      <div className="mx-[14px] mb-[20px] mt-[24px] rounded-[51px] h-[68px] flex items-center px-[14px] gap-[8px]"
        style={{ backgroundColor: `${theme.cardBg}33`, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        onClick={() => router.push('/records/publish')}>
        <img src="/icons/record-pen.svg" alt="" className="w-[40px] h-[40px]" />
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>记录此刻心情</p>
          <p className="text-[10px] leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>2026.6.11</p>
        </div>
        <div className="flex items-center gap-[3px]">
          <img src={theme.iconSrc} alt="" className="w-[18px] h-[18px]" />
          <span className="text-[14px] leading-[1.5]" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{theme.label}（{coordinatePosition.x.toFixed(0)}, {coordinatePosition.y.toFixed(0)}）</span>
        </div>
        <img src="/icons/bell.svg" alt="" className="w-[17px] h-[17px]" />
      </div>
    </motion.div>
  )
}
