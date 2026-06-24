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
      className="min-h-screen pb-[180px]"
      animate={{ background: theme.bgGradient }}
      transition={{ duration: 0.8 }}
    >
      <div className="px-[14px] pt-[46px]">
        {/* Search bar */}
        <div className="flex items-center gap-3 mb-4 px-[6px]">
          <div className="flex-1 flex items-center gap-2">
            <img src="/icons/search.svg" alt="" className="w-6 h-6" />
            <motion.div
              className="flex-1 h-[36px] rounded-[30px] flex items-center px-4"
              animate={{ backgroundColor: `${theme.primaryLight}B3` }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[17px] text-[rgba(60,60,67,0.6)]" style={{ fontFamily: "'PingFang SC', sans-serif" }}>搜索</span>
            </motion.div>
          </div>
          <img src="/ui/avatar.png" alt="头像" className="w-7 h-7 rounded-full" />
        </div>

        {/* Record mood header */}
        <motion.div
          className="rounded-t-[20px] px-[14px] py-[12px] flex items-center justify-between shadow-[0px_6px_18px_0px_rgba(58,88,14,0.16)]"
          animate={{ backgroundColor: theme.primary }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <img src="/icons/record-pen.svg" alt="" className="w-10 h-10" />
            <div>
              <p className="text-[14px] font-semibold text-white text-right" style={{ fontFamily: "'PingFang SC', sans-serif" }}>记录此刻心情</p>
              <p className="text-[10px] font-semibold text-white" style={{ fontFamily: "'PingFang HK', sans-serif" }}>2026.6.22 星期一</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMood}
                className="flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <img src={theme.iconSrc} alt="" className="w-[18px] h-[18px]" />
                <span className="text-[14px] font-semibold text-white" style={{ fontFamily: "'PingFang SC', sans-serif" }}>
                  {theme.label}（{coordX}, {coordY}）
                </span>
              </motion.div>
            </AnimatePresence>
            <img src="/icons/bell.svg" alt="" className="w-[17px] h-[17px]" />
          </div>
        </motion.div>

        {/* Mood coordinate */}
        <motion.div
          className="rounded-b-[20px] backdrop-blur-[14px] border border-solid shadow-[0px_8px_22px_0px_rgba(58,88,14,0.12)] overflow-hidden mb-4"
          animate={{
            backgroundColor: `${theme.cardBg}9E`,
            borderColor: `${theme.textPrimary}38`,
          }}
          transition={{ duration: 0.8 }}
        >
          <MoodCoordinate />
        </motion.div>

        {/* Playlist header */}
        <div className="flex items-center gap-4 mb-1 px-[5px]">
          <button
            onClick={() => setListMode('recommend')}
            className="text-[20px] transition-colors"
            style={{
              color: listMode === 'recommend' ? theme.textPrimary : `${theme.textPrimary}4D`,
              fontWeight: 600,
              fontFamily: "'PingFang SC', sans-serif",
            }}
          >
            推荐歌单
          </button>
          <button
            onClick={() => setListMode('personal')}
            className="text-[20px] transition-colors"
            style={{
              color: listMode === 'personal' ? theme.textPrimary : `${theme.textPrimary}4D`,
              fontWeight: 600,
              fontFamily: "'PingFang SC', sans-serif",
            }}
          >
            个人歌单
          </button>
          <div className="flex-1" />
          <span className="text-[10px] text-right" style={{ color: 'rgba(0,0,0,0.3)', fontFamily: "'PingFang HK', sans-serif", fontWeight: 600 }}>
            随心情变化歌单
          </span>
        </div>
        <p className="text-[10px] px-[5px] mb-3" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: "'PingFang SC', sans-serif" }}>
          根据HRV数值和您的选择AI会自动为你推荐歌曲
        </p>

        {/* AI message */}
        <motion.div
          className="border border-solid relative mb-4"
          animate={{
            backgroundColor: `${theme.primaryLight}8C`,
            borderColor: `${theme.textSecondary}2E`,
          }}
          transition={{ duration: 0.8 }}
          style={{ padding: '16px 14px' }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMood}
              className="text-[14px] font-medium leading-[1.5]"
              style={{ color: '#58480E', fontFamily: "'Noto Sans SC', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {aiMessages[currentMood]}
            </motion.p>
          </AnimatePresence>
          <p className="text-[8px] text-right mt-3" style={{ color: '#58480E', fontFamily: "'PingFang HK', sans-serif" }}>
            AI会根据的情绪提供暖心短句
          </p>
          <button className="absolute top-2 right-2">
            <img src="/icons/edit-note.svg" alt="" className="w-8 h-8 opacity-40" />
          </button>
        </motion.div>

        {/* Song list */}
        <motion.div
          className="rounded-[20px] overflow-hidden"
          animate={{ backgroundColor: theme.cardBgAlpha }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentMood}-${listMode}`}
              className="px-[8px] py-[7px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {songs.map((song, index) => (
                <div key={song.id}>
                  <motion.div
                    className="flex items-center gap-[23px] py-[3.5px] active:opacity-80"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentSongIndex(index)
                      setIsPlaying(true)
                      router.push('/player')
                    }}
                  >
                    <div className="h-[67px] w-[67px] rounded-[10px] flex-shrink-0 overflow-hidden">
                      <img src={song.cover} alt={song.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[18px] font-medium truncate" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.title}</p>
                      <p className="text-[14px] truncate" style={{ color: theme.textSecondary, fontFamily: "'Noto Sans SC', sans-serif" }}>
                        {song.artist} · {song.album}
                      </p>
                      {listMode === 'personal' && (
                        <p className="text-[14px]" style={{ color: `${theme.textPrimary}80`, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.date}</p>
                      )}
                    </div>
                    <button className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <img src="/icons/play-btn.svg" alt="play" className="w-7 h-7" />
                    </button>
                  </motion.div>
                  {index < songs.length - 1 && (
                    <div className="ml-[90px] h-px" style={{ backgroundColor: `${theme.textPrimary}10` }} />
                  )}
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
