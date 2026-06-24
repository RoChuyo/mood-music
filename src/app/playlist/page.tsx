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
      className="min-h-screen pb-[180px]"
      animate={{ background: activeTheme.bgGradient }}
      transition={{ duration: 0.8 }}
    >
      <div className="px-[14px] pt-[46px]">
        <div className="flex items-center gap-2 mb-4 px-[6px]">
          <img src="/icons/search.svg" alt="" className="w-6 h-6" />
          <motion.div className="flex-1 h-[36px] rounded-[30px] flex items-center px-4" animate={{ backgroundColor: `${activeTheme.primaryLight}B3` }} transition={{ duration: 0.8 }}>
            <span className="text-[17px] text-[rgba(60,60,67,0.6)]">搜索</span>
          </motion.div>
          <img src="/ui/avatar.png" alt="" className="w-7 h-7 rounded-full" />
        </div>

        <h1 className="text-[24px] font-bold mb-4 px-[5px]" style={{ fontFamily: "'Oxygen', sans-serif" }}>歌单</h1>

        <div className="flex flex-wrap gap-[17px] mb-6 px-[8px]">
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.key
            const btnTheme = btn.isMood ? moodThemes[btn.key as Mood] : activeTheme
            return (
              <motion.button
                key={btn.key}
                className="flex items-center gap-1.5 px-[18px] py-[10px] rounded-[71px] text-[14px] font-medium"
                style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                onClick={() => handleFilterClick(btn.key, btn.isMood)}
                animate={{
                  backgroundColor: isActive ? btnTheme.primary : btnTheme.cardBg,
                  color: isActive ? '#fff' : btnTheme.textPrimary,
                  borderWidth: isActive ? 1 : 0,
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

        <motion.div className="rounded-[20px] overflow-hidden" animate={{ backgroundColor: activeTheme.cardBgAlpha }} transition={{ duration: 0.8 }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} className="px-[8px] py-[7px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {songs.map((song, index) => (
                <div key={song.id}>
                  <motion.div
                    className="flex items-center gap-[23px] py-[3.5px] active:opacity-80"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setCurrentSongIndex(index); setIsPlaying(true); router.push('/player') }}
                  >
                    <div className="h-[67px] w-[67px] rounded-[10px] flex-shrink-0 overflow-hidden">
                      <img src={song.cover} alt={song.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[18px] font-medium truncate" style={{ color: activeTheme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.title}</p>
                      <p className="text-[14px] truncate" style={{ color: activeTheme.textSecondary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.artist} · {song.album}</p>
                      <p className="text-[14px]" style={{ color: `${activeTheme.textPrimary}80`, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.date}</p>
                    </div>
                    <button className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <img src="/icons/play-btn.svg" alt="play" className="w-7 h-7" />
                    </button>
                  </motion.div>
                  {index < songs.length - 1 && <div className="ml-[90px] h-px" style={{ backgroundColor: `${activeTheme.textPrimary}10` }} />}
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
