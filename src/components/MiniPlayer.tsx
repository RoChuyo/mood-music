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
      className="fixed bottom-[87px] left-0 right-0 z-40 mx-auto backdrop-blur-[12px]"
      style={{ maxWidth: 430 }}
      animate={{ backgroundColor: `${theme.cardBg}E0` }}
      transition={{ duration: 0.8 }}
      onClick={() => router.push('/player')}
    >
      <div className="flex items-center gap-3 px-[14px] py-[10px]">
        <div className="h-[74px] w-[74px] rounded-[8px] overflow-hidden flex-shrink-0">
          <img src={song.cover} alt={song.title} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[20px] font-medium truncate" style={{ color: theme.textPrimary, fontFamily: "'Noto Sans SC', sans-serif" }}>
            {song.title}
          </p>
          <p className="text-[12px] truncate" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>
            {song.artist}
          </p>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={togglePlaying}
            className="h-10 w-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.primary }}
          >
            {isPlaying ? (
              <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="h-[14px] w-[14px] ml-0.5" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}20` }}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={theme.textPrimary} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
          <button className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.textPrimary}20` }}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={theme.textPrimary} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
