'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMoodStore, moodThemes, Mood } from '@/store/useMoodStore'
import { songsByMood } from '@/data/songs'
import MiniPlayer from '@/components/MiniPlayer'
import TabBar from '@/components/TabBar'

type FilterMode = 'personal' | Mood | 'recommend'

const filterButtons: { key: FilterMode; label: string; iconSrc?: string; isMood: boolean }[] = [
  { key: 'personal', label: '个人', isMood: false },
  { key: 'happy', label: '开心', iconSrc: '/mood/happy.svg', isMood: true },
  { key: 'relaxed', label: '安逸', iconSrc: '/mood/relaxed.svg', isMood: true },
  { key: 'recommend', label: '推荐', isMood: false },
  { key: 'sad', label: '悲伤', iconSrc: '/mood/sad.svg', isMood: true },
  { key: 'angry', label: '愤怒', iconSrc: '/mood/angry.svg', isMood: true },
]

export default function PlaylistPage() {
  const router = useRouter()
  const { currentMood, setMood, setCurrentSongIndex, setIsPlaying } = useMoodStore()
  const [activeFilter, setActiveFilter] = useState<FilterMode>(currentMood)
  const theme = moodThemes[currentMood]

  const handleFilterClick = (filter: FilterMode, isMood: boolean) => {
    setActiveFilter(filter)
    if (isMood) setMood(filter as Mood)
  }

  const displayMood: Mood = (['happy', 'sad', 'angry', 'relaxed'].includes(activeFilter)) ? (activeFilter as Mood) : currentMood
  const songs = activeFilter === 'recommend'
    ? [...songsByMood.happy.slice(0, 2), ...songsByMood.sad.slice(0, 1), ...songsByMood.relaxed.slice(0, 2)]
    : activeFilter === 'personal'
    ? [...songsByMood[currentMood]]
    : songsByMood[displayMood]

  const activeTheme = moodThemes[displayMood]

  return (
    <motion.div
      className="flex flex-col min-h-full"
      animate={{ background: activeTheme.bgGradient }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex-1 pt-[46px]">
        {/* Search bar */}
        <div className="px-[6px] flex items-center h-[51px]">
          <div className="relative flex-1 h-[36px] flex items-center">
            <img src="/icons/search.svg" alt="" className="absolute left-[19px] w-[24px] h-[24px] z-10" />
            <motion.div
              className="w-full h-[36px] rounded-[30px] flex items-center pl-[53px]"
              animate={{ backgroundColor: `${activeTheme.primaryLight}B3` }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[17px] tracking-[-0.41px]" style={{ color: 'rgba(60,60,67,0.6)', fontFamily: "'PingFang SC', sans-serif" }}>搜索</span>
            </motion.div>
          </div>
          <img src="/ui/avatar.png" alt="" className="w-[28px] h-[28px] rounded-full ml-[6px] flex-shrink-0" />
        </div>

        {/* Title */}
        <h1 className="text-[24px] font-bold px-[19px] mt-[8px] mb-[8px]" style={{ fontFamily: "'Oxygen', sans-serif" }}>歌单</h1>

        {/* Filter buttons - 2 rows with exact Figma layout */}
        <div className="px-[22px] mb-[16px]">
          <div className="flex gap-[15px] mb-[10px]">
            {filterButtons.slice(0, 3).map((btn) => {
              const isActive = activeFilter === btn.key
              const btnTheme = btn.isMood ? moodThemes[btn.key as Mood] : activeTheme
              return (
                <motion.button
                  key={btn.key}
                  className="flex items-center justify-center gap-[4px] h-[43px] w-[104px] rounded-[71px] text-[14px] font-medium"
                  style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  onClick={() => handleFilterClick(btn.key, btn.isMood)}
                  animate={{
                    backgroundColor: isActive ? btnTheme.primary : btnTheme.cardBg,
                    color: isActive ? '#fff' : btnTheme.textPrimary,
                    borderColor: isActive ? btnTheme.textPrimary : 'transparent',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {btn.iconSrc && <img src={btn.iconSrc} alt="" className="w-[18px] h-[18px]" />}
                  {btn.label}
                </motion.button>
              )
            })}
          </div>
          <div className="flex gap-[15px]">
            {filterButtons.slice(3).map((btn) => {
              const isActive = activeFilter === btn.key
              const btnTheme = btn.isMood ? moodThemes[btn.key as Mood] : activeTheme
              return (
                <motion.button
                  key={btn.key}
                  className="flex items-center justify-center gap-[4px] h-[43px] w-[104px] rounded-[71px] text-[14px] font-medium"
                  style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  onClick={() => handleFilterClick(btn.key, btn.isMood)}
                  animate={{
                    backgroundColor: isActive ? btnTheme.primary : btnTheme.cardBg,
                    color: isActive ? '#fff' : btnTheme.textPrimary,
                    borderColor: isActive ? btnTheme.textPrimary : 'transparent',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {btn.iconSrc && <img src={btn.iconSrc} alt="" className="w-[18px] h-[18px]" />}
                  {btn.label}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Song list with glass container */}
        <motion.div
          className="mx-[15px] rounded-[20px] overflow-hidden"
          animate={{ backgroundColor: activeTheme.cardBgAlpha }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} className="py-[7px]"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {songs.map((song, index) => (
                <div key={song.id}>
                  <motion.div
                    className="flex items-center px-[8px] active:opacity-80"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setCurrentSongIndex(index); setIsPlaying(true); router.push('/player') }}
                  >
                    <div className="w-[67px] h-[67px] rounded-[10px] flex-shrink-0 overflow-hidden">
                      <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 ml-[23px]">
                      <p className="text-[18px] font-medium leading-normal truncate" style={{ color: activeTheme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.title}</p>
                      <p className="text-[14px] leading-normal truncate" style={{ color: activeTheme.textSecondary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.artist} · {song.album}</p>
                      <p className="text-[14px] leading-[1.5]" style={{ color: `${activeTheme.textPrimary}80`, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.date}</p>
                    </div>
                    <button className="flex-shrink-0 w-[28px] h-[28px]" onClick={(e) => e.stopPropagation()}>
                      <img src="/icons/play-btn.svg" alt="play" className="w-full h-full" />
                    </button>
                  </motion.div>
                  {index < songs.length - 1 && <div className="ml-[98px] h-px" style={{ backgroundColor: `${activeTheme.textPrimary}12` }} />}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      <MiniPlayer />
      <TabBar />
    </motion.div>
  )
}
