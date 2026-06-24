'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useMoodStore, moodThemes } from '@/store/useMoodStore'
import { songsByMood } from '@/data/songs'

export default function MiniPlayer() {
  const router = useRouter()
  const { currentMood, currentSongIndex, isPlaying, togglePlaying } = useMoodStore()
  const theme = moodThemes[currentMood]
  const songs = songsByMood[currentMood]
  const song = songs[currentSongIndex % songs.length]

  return (
    <motion.div
      className="sticky bottom-[87px] left-0 right-0 z-40 h-[94px] flex-shrink-0"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      animate={{ backgroundColor: `${theme.cardBg}E0` }}
      transition={{ duration: 0.8 }}
      onClick={() => router.push('/player')}
    >
      <div className="flex items-center h-full px-[14px]">
        <div className="w-[74px] h-[74px] rounded-[8px] overflow-hidden flex-shrink-0">
          <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0 ml-[16px]">
          <p className="text-[20px] font-medium leading-[1.5] truncate" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>
            {song.title}
          </p>
          <p className="text-[12px] leading-[1.5] truncate" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>
            {song.artist}
          </p>
        </div>
        <div className="flex items-center gap-[8px] ml-[8px]" onClick={(e) => e.stopPropagation()}>
          <button onClick={togglePlaying} className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
            {isPlaying ? (
              <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
            ) : (
              <svg className="w-[15px] h-[15px] ml-[2px]" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
          <button className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}18` }}>
            <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke={theme.textPrimary} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
          <button className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}18` }}>
            <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke={theme.textPrimary} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
