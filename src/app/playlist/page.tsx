'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMoodStore, moodThemes, Mood } from '@/store/useMoodStore'
import { songsByMood } from '@/data/songs'
import MiniPlayer from '@/components/MiniPlayer'
import TabBar from '@/components/TabBar'

type FilterMode = 'personal' | Mood | 'recommend'

const filterButtons: { key: FilterMode; label: string; icon?: string; isMood: boolean }[] = [
  { key: 'personal', label: '个人', icon: '♡', isMood: false },
  { key: 'happy', label: '开心', icon: '☀️', isMood: true },
  { key: 'relaxed', label: '安逸', icon: '🌙', isMood: true },
  { key: 'recommend', label: '推荐', icon: '☰', isMood: false },
  { key: 'sad', label: '悲伤', icon: '🌊', isMood: true },
  { key: 'angry', label: '愤怒', icon: '🔥', isMood: true },
]

export default function PlaylistPage() {
  const router = useRouter()
  const { currentMood, setMood, setCurrentSongIndex, setIsPlaying } = useMoodStore()
  const [activeFilter, setActiveFilter] = useState<FilterMode>(currentMood)
  const theme = moodThemes[currentMood]

  const handleFilterClick = (filter: FilterMode, isMood: boolean) => {
    setActiveFilter(filter)
    if (isMood) {
      setMood(filter as Mood)
    }
  }

  const displayMood: Mood = (['happy', 'sad', 'angry', 'relaxed'].includes(activeFilter as string))
    ? (activeFilter as Mood)
    : currentMood

  const songs = activeFilter === 'recommend'
    ? [...songsByMood.happy.slice(0, 2), ...songsByMood.sad.slice(0, 1), ...songsByMood.relaxed.slice(0, 2)]
    : activeFilter === 'personal'
    ? [...songsByMood[currentMood]]
    : songsByMood[displayMood]

  const activeTheme = moodThemes[displayMood]

  return (
    <motion.div
      className="min-h-screen pb-36"
      animate={{ background: activeTheme.bgGradient }}
      transition={{ duration: 0.8 }}
    >
      <div className="px-4 pt-12">
        <motion.div
          className="flex items-center gap-2 rounded-full px-4 py-2.5 mb-4"
          animate={{ backgroundColor: activeTheme.cardBg }}
          transition={{ duration: 0.8 }}
        >
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span className="text-sm text-gray-400">搜索</span>
          <div className="flex-1" />
          <div className="h-7 w-7 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: activeTheme.primaryLight + '40' }}>😊</div>
        </motion.div>

        <h1 className="text-2xl font-bold mb-4">歌单</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.key
            const btnTheme = btn.isMood ? moodThemes[btn.key as Mood] : activeTheme
            return (
              <motion.button
                key={btn.key}
                className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all"
                onClick={() => handleFilterClick(btn.key, btn.isMood)}
                animate={{
                  backgroundColor: isActive ? btnTheme.primary : 'transparent',
                  color: isActive ? '#fff' : '#666',
                  border: isActive ? `1px solid ${btnTheme.primary}` : '1px solid #ddd',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <span>{btn.icon}</span> {btn.label}
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="space-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                className="flex items-center gap-3 py-3 px-1 rounded-xl active:bg-black/5"
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSongIndex(index)
                  setIsPlaying(true)
                  router.push('/player')
                }}
              >
                <motion.div
                  className="h-14 w-14 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                  animate={{ backgroundColor: moodThemes[song.mood].primaryLight + '60' }}
                >
                  {song.title.slice(0, 2)}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[15px] truncate">{song.title}</p>
                  <p className="text-xs text-gray-500 truncate">{song.artist} · {song.album}</p>
                  <p className="text-xs text-gray-400">{song.date}</p>
                </div>
                <button className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <MiniPlayer />
      <TabBar />
    </motion.div>
  )
}
