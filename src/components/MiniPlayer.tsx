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
      className="fixed bottom-[72px] left-0 right-0 z-40 mx-auto flex items-center gap-3 rounded-2xl px-3 py-2 shadow-lg"
      style={{ maxWidth: 410, backgroundColor: theme.primary }}
      animate={{ backgroundColor: theme.primary }}
      transition={{ duration: 0.8 }}
      onClick={() => router.push('/player')}
    >
      <div className="h-11 w-11 rounded-lg bg-white/20 overflow-hidden flex-shrink-0">
        <div className="h-full w-full flex items-center justify-center text-white/60 text-xs">
          {song.title[0]}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{song.title}</p>
        <p className="text-xs text-white/70 truncate">{song.artist}</p>
      </div>
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={togglePlaying}
          className="h-9 w-9 rounded-full bg-white flex items-center justify-center"
        >
          {isPlaying ? (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill={theme.primary}>
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="h-4 w-4 ml-0.5" viewBox="0 0 24 24" fill={theme.primary}>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button className="h-8 w-8 flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
        <button className="h-8 w-8 flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}
