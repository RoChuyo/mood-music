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

  const coordX = Math.round(coordinatePosition.x)
  const coordY = Math.round(coordinatePosition.y)

  return (
    <motion.div
      className="flex flex-col min-h-full"
      animate={{ background: theme.bgGradient }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex-1">
        {/* Search bar */}
        <div className="pt-[46px] px-[6px]">
          <div className="flex items-center h-[51px]">
            <div className="relative flex-1 h-[36px] flex items-center">
              <img src="/icons/search.svg" alt="" className="absolute left-[19px] w-[24px] h-[24px] z-10" />
              <motion.div className="w-full h-[36px] rounded-[30px] flex items-center pl-[53px]"
                animate={{ backgroundColor: `${theme.primaryLight}B3` }} transition={{ duration: 0.8 }}>
                <span className="text-[17px] tracking-[-0.41px]" style={{ color: 'rgba(60,60,67,0.6)', fontFamily: "'PingFang SC', sans-serif" }}>搜索</span>
              </motion.div>
            </div>
            <img src="/ui/avatar.png" alt="" className="w-[28px] h-[28px] rounded-full ml-[6px] flex-shrink-0" />
          </div>
        </div>

        {/* Record mood header - 68px */}
        <motion.div
          className="mx-[14px] rounded-t-[20px] h-[68px] flex items-center justify-between px-[14px]"
          animate={{ backgroundColor: theme.primary }}
          transition={{ duration: 0.8 }}
          style={{ boxShadow: '0px 6px 18px rgba(58,88,14,0.16)' }}
        >
          <div className="flex items-center gap-[6px] flex-shrink-0">
            <img src="/icons/record-pen.svg" alt="" className="w-[40px] h-[40px]" />
            <div className="whitespace-nowrap">
              <p className="text-[14px] font-semibold text-white leading-[1.5]" style={{ fontFamily: "'PingFang SC', sans-serif" }}>记录此刻心情</p>
              <p className="text-[10px] font-semibold text-white leading-[1.5]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>2026.6.22 星期一</p>
            </div>
          </div>
          <div className="flex items-center gap-[4px] flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div key={currentMood} className="flex items-center gap-[3px] whitespace-nowrap"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                <img src={theme.iconSrc} alt="" className="w-[18px] h-[18px]" />
                <span className="text-[14px] font-semibold text-white leading-[1.5]" style={{ fontFamily: "'PingFang SC', sans-serif" }}>
                  {theme.label}（{coordX}, {coordY}）
                </span>
              </motion.div>
            </AnimatePresence>
            <img src="/icons/bell.svg" alt="" className="w-[17px] h-[17px]" />
          </div>
        </motion.div>

        {/* Coordinate area - glass container with square 336x336 axis inside */}
        <motion.div
          className="mx-[14px] rounded-b-[20px] overflow-hidden"
          animate={{ backgroundColor: `${theme.cardBg}9E`, borderColor: `${theme.textPrimary}38` }}
          transition={{ duration: 0.8 }}
          style={{
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            border: `1px solid ${theme.textPrimary}38`, borderTop: 'none',
            boxShadow: '0px 8px 22px rgba(58,88,14,0.12)',
          }}
        >
          <MoodCoordinate />
        </motion.div>

        {/* Section titles */}
        <div className="flex items-baseline px-[19px] mt-[12px]">
          <button onClick={() => setListMode('recommend')} className="text-[20px] font-semibold transition-colors"
            style={{ color: listMode === 'recommend' ? theme.textPrimary : `${theme.textPrimary}4D`, fontFamily: "'PingFang SC', sans-serif" }}>推荐歌单</button>
          <button onClick={() => setListMode('personal')} className="text-[20px] font-semibold ml-[20px] transition-colors"
            style={{ color: listMode === 'personal' ? theme.textPrimary : `${theme.textPrimary}4D`, fontFamily: "'PingFang SC', sans-serif" }}>个人歌单</button>
          <div className="flex-1" />
          <span className="text-[10px] font-semibold" style={{ color: 'rgba(0,0,0,0.3)', fontFamily: "'PingFang HK', sans-serif" }}>随心情变化歌单</span>
        </div>
        <p className="text-[10px] px-[19px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: "'PingFang SC', sans-serif" }}>
          根据HRV数值和您的选择AI会自动为你推荐歌曲
        </p>

        {/* AI message */}
        <motion.div className="mx-[22px] mt-[8px] relative"
          animate={{ backgroundColor: `${theme.primaryLight}8C` }} transition={{ duration: 0.8 }}
          style={{ border: '1px solid rgba(136,120,73,0.18)', height: 119 }}>
          <div className="px-[11px] pt-[16px]">
            <AnimatePresence mode="wait">
              <motion.p key={currentMood} className="text-[14px] font-medium leading-[1.5]"
                style={{ color: '#58480E', fontFamily: "'Noto Sans SC', sans-serif", width: 181 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {aiMessages[currentMood]}
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="absolute bottom-[8px] right-[11px] text-[8px] leading-[1.5]" style={{ color: '#58480E', fontFamily: "'PingFang HK', sans-serif" }}>
            AI会根据的情绪提供暖心短句
          </p>
          {/* Paperclip - sticky note clip top-right */}
          <svg className="absolute top-[-10px] right-[14px] w-[28px] h-[40px]" viewBox="0 0 28 40" fill="none" style={{ transform: 'rotate(8deg)' }}>
            <path d="M14 4 L14 28 a4 4 0 0 1-8 0 L6 9 a2.5 2.5 0 0 1 5 0 L11 26"
              stroke="#88784980" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>

        {/* Song list */}
        <motion.div className="mx-[20px] mt-[8px] rounded-[20px] overflow-hidden mb-[8px]"
          animate={{ backgroundColor: theme.cardBgAlpha }} transition={{ duration: 0.8 }}>
          <AnimatePresence mode="wait">
            <motion.div key={`${currentMood}-${listMode}`} className="py-[7px]"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              {songs.map((song, index) => (
                <div key={song.id}>
                  <motion.div className="flex items-center px-[8px] active:opacity-80" whileTap={{ scale: 0.98 }}
                    onClick={() => { setCurrentSongIndex(index); setIsPlaying(true); router.push('/player') }}>
                    <div className="w-[67px] h-[67px] rounded-[10px] flex-shrink-0 overflow-hidden">
                      <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 ml-[23px]">
                      <p className="text-[18px] font-medium leading-normal truncate" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.title}</p>
                      <p className="text-[14px] leading-normal truncate" style={{ color: theme.textSecondary, fontFamily: "'Noto Sans SC', sans-serif" }}>{song.artist} · {song.album}</p>
                      {listMode === 'personal' && <p className="text-[14px] leading-[1.5]" style={{ color: `${theme.textPrimary}80` }}>{song.date}</p>}
                    </div>
                    <button className="flex-shrink-0 w-[28px] h-[28px]" onClick={(e) => e.stopPropagation()}>
                      <img src="/icons/play-btn.svg" alt="play" className="w-full h-full" />
                    </button>
                  </motion.div>
                  {index < songs.length - 1 && <div className="ml-[98px] h-px" style={{ backgroundColor: `${theme.textPrimary}12` }} />}
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
