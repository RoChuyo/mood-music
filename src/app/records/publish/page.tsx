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
    <motion.div className="min-h-screen" animate={{ background: theme.bgGradient }} transition={{ duration: 0.8 }}>
      <div className="px-[14px] pt-12">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()}>
            <svg className="h-6 w-6" style={{ color: theme.textPrimary }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <motion.button className="px-4 py-1.5 rounded-full text-white text-[14px] font-semibold" animate={{ backgroundColor: theme.primary }} whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "'PingFang SC', sans-serif" }}>发布</motion.button>
        </div>

        <div className="rounded-[20px] overflow-hidden mb-6" style={{ backgroundColor: theme.primary }}>
          <div className="p-3 flex items-center gap-3">
            <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0">
              <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-[18px]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{song.title}</p>
              <p className="text-[12px] text-white/70" style={{ fontFamily: "'PingFang SC', sans-serif" }}>{song.artist}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </button>
              <button className="h-8 w-8 flex items-center justify-center text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="text-[10px] text-white/60 flex flex-col items-center px-2 py-1 rounded-lg bg-white/10">
              <div className="flex gap-1"><img src="/mood/angry.svg" alt="" className="w-3 h-3" /><span>愤怒</span> <img src="/mood/happy.svg" alt="" className="w-3 h-3" /><span>开心</span></div>
              <div className="flex gap-1"><img src="/mood/sad.svg" alt="" className="w-3 h-3" /><span>悲伤</span> <img src="/mood/relaxed.svg" alt="" className="w-3 h-3" /><span>安逸</span></div>
            </div>
          </div>
          <div className="h-1 bg-white/20"><div className="h-full w-1/3 bg-white/60 rounded-full" /></div>
        </div>

        <div className="mb-6">
          <textarea className="w-full bg-transparent text-[14px] outline-none resize-none" style={{ color: theme.textSecondary, fontFamily: "'PingFang SC', sans-serif" }}
            rows={3} placeholder="说一说你现在的想法吧......" />
        </div>

        <div className="flex gap-3 mb-4">
          <div className="h-16 w-16 rounded-lg border-2 border-dashed flex items-center justify-center" style={{ borderColor: `${theme.textPrimary}40` }}>
            <svg className="h-6 w-6" style={{ color: `${theme.textPrimary}40` }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[14px]" style={{ color: theme.textSecondary }}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          添加地点
        </div>
      </div>
    </motion.div>
  )
}
