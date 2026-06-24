'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useMoodStore, moodThemes } from '@/store/useMoodStore'
import { songsByMood } from '@/data/songs'

export default function PublishPage() {
  const router = useRouter()
  const { currentMood, currentSongIndex } = useMoodStore()
  const theme = moodThemes[currentMood]
  const song = songsByMood[currentMood][currentSongIndex % songsByMood[currentMood].length]

  return (
    <motion.div
      className="min-h-screen"
      animate={{ background: theme.bgGradient }}
      transition={{ duration: 0.8 }}
    >
      <div className="px-4 pt-12">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <motion.button
            className="px-4 py-1.5 rounded-full text-white text-sm font-medium"
            animate={{ backgroundColor: theme.primary }}
            whileTap={{ scale: 0.95 }}
          >
            发布
          </motion.button>
        </div>

        <motion.div
          className="rounded-2xl overflow-hidden mb-6"
          animate={{ backgroundColor: theme.primary }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-3 flex items-center gap-3">
            <div className="h-14 w-14 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold">
              {song.title[0]}{song.title[1]}
            </div>
            <div className="flex-1">
              <p className="font-bold text-white">{song.title}</p>
              <p className="text-sm text-white/70">{song.artist}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </button>
              <button className="h-8 w-8 flex items-center justify-center text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="text-[10px] text-white/60 flex flex-col items-center px-2 py-1 rounded-lg bg-white/10">
              <div className="flex gap-1">
                <span>🔥愤怒</span>
                <span>☀️开心</span>
              </div>
              <div className="flex gap-1">
                <span>🌊悲伤</span>
                <span>🌙安逸</span>
              </div>
            </div>
          </div>
          <div className="h-1 bg-white/20">
            <div className="h-full w-1/3 bg-white/60 rounded-full" />
          </div>
        </motion.div>

        <div className="mb-6">
          <textarea
            className="w-full bg-transparent text-gray-500 text-sm outline-none resize-none placeholder-gray-400"
            rows={3}
            placeholder="说一说你现在的想法吧......"
          />
        </div>

        <div className="flex gap-3 mb-4">
          <div className="h-16 w-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          添加地点
        </div>
      </div>
    </motion.div>
  )
}
