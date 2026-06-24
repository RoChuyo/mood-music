'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMoodStore, moodThemes } from '@/store/useMoodStore'
import { songsByMood, aiMessages } from '@/data/songs'
import MoodCoordinate from '@/components/MoodCoordinate'
import MiniPlayer from '@/components/MiniPlayer'
import TabBar from '@/components/TabBar'

export default function HomePage() {
  const router = useRouter()
  const { currentMood, setCurrentSongIndex, coordinatePosition, setIsPlaying } = useMoodStore()
  const theme = moodThemes[currentMood]
  const songs = songsByMood[currentMood]
  const [listMode, setListMode] = useState<'recommend' | 'personal'>('recommend')

  const coordX = coordinatePosition.x.toFixed(0)
  const coordY = coordinatePosition.y.toFixed(0)

  return (
    <motion.div
      className="min-h-screen pb-36"
      animate={{ background: theme.bgGradient }}
      transition={{ duration: 0.8 }}
    >
      <div className="px-4 pt-12">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="flex-1 flex items-center gap-2 rounded-full px-4 py-2.5"
            animate={{ backgroundColor: theme.cardBg }}
            transition={{ duration: 0.8 }}
          >
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-sm text-gray-400">搜索</span>
          </motion.div>
          <motion.div
            className="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center text-lg"
            animate={{ backgroundColor: theme.primaryLight + '40' }}
            transition={{ duration: 0.8 }}
          >
            😊
          </motion.div>
        </div>

        <motion.div
          className="rounded-2xl p-4 mb-4"
          animate={{ backgroundColor: theme.cardBg }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                animate={{ backgroundColor: theme.primary }}
                transition={{ duration: 0.8 }}
              >
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </motion.div>
              <div>
                <p className="text-sm font-semibold">记录此刻心情</p>
                <p className="text-xs text-gray-500">2026.6.22 星期一</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentMood}
                  className="text-sm font-medium flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{ color: theme.primary }}
                >
                  {theme.icon} {theme.label}（{coordX}, {coordY}）
                </motion.span>
              </AnimatePresence>
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
          </div>
          <MoodCoordinate />
        </motion.div>

        <div className="flex items-center gap-4 mb-1">
          <button
            onClick={() => setListMode('recommend')}
            className="text-lg transition-colors"
            style={{ color: listMode === 'recommend' ? '#000' : '#999', fontWeight: listMode === 'recommend' ? 700 : 400 }}
          >
            推荐歌单
          </button>
          <button
            onClick={() => setListMode('personal')}
            className="text-lg transition-colors"
            style={{ color: listMode === 'personal' ? '#000' : '#999', fontWeight: listMode === 'personal' ? 700 : 400 }}
          >
            个人歌单
          </button>
          <div className="flex-1" />
          <motion.span className="text-xs" animate={{ color: theme.primary }} transition={{ duration: 0.8 }}>
            随心情变化歌单
          </motion.span>
        </div>
        <p className="text-xs text-gray-400 mb-3">根据HRV数值和您的选择AI会自动为你推荐歌曲</p>

        <motion.div
          className="rounded-2xl p-4 mb-4 relative"
          animate={{ backgroundColor: theme.cardBg }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMood}
              className="text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {aiMessages[currentMood]}
            </motion.p>
          </AnimatePresence>
          <p className="text-xs text-right mt-2" style={{ color: theme.primary }}>AI依据您的情绪数据供暖心短句</p>
          <button className="absolute top-3 right-3 text-gray-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMood}
            className="space-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
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
                  animate={{ backgroundColor: theme.primaryLight + '60' }}
                  transition={{ duration: 0.8 }}
                >
                  {song.title.slice(0, 2)}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[15px] truncate">{song.title}</p>
                  <p className="text-xs text-gray-500 truncate">{song.artist} · {song.album}</p>
                  {listMode === 'personal' && <p className="text-xs text-gray-400">{song.date}</p>}
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
