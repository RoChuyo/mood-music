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
    <motion.div className="flex flex-col min-h-full" animate={{ background: theme.bgGradient }} transition={{ duration: 0.8 }}>
      <div className="flex-1 px-[14px] pt-[51px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-[20px]">
          <button onClick={() => router.back()} className="w-[28px] h-[28px] flex items-center justify-center">
            <svg className="w-[24px] h-[24px]" style={{ color: theme.textPrimary }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <motion.button className="px-[18px] py-[6px] rounded-full text-white text-[16px] font-semibold" animate={{ backgroundColor: theme.primary }} whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "'PingFang SC', sans-serif" }}>发布</motion.button>
        </div>

        {/* Music card */}
        <div className="rounded-[12px] overflow-hidden mb-[20px]" style={{ backgroundColor: theme.primary }}>
          <div className="px-[12px] py-[10px] flex items-center gap-[10px]">
            <div className="w-[52px] h-[52px] rounded-[8px] overflow-hidden flex-shrink-0">
              <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-shrink">
              <p className="font-bold text-white text-[16px] leading-[1.3] whitespace-nowrap truncate" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{song.title}</p>
              <p className="text-[11px] text-white/70 whitespace-nowrap truncate" style={{ fontFamily: "'PingFang SC', sans-serif" }}>{song.artist}</p>
            </div>
            <div className="flex items-center gap-[6px] ml-auto flex-shrink-0">
              <button className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center">
                <svg className="w-[14px] h-[14px] ml-[1px]" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth={2} strokeLinejoin="round"><path d="M8 5v14l11-7z" /></svg>
              </button>
              <button className="w-[28px] h-[28px] flex items-center justify-center">
                <svg className="w-[20px] h-[20px] text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
              </button>
            </div>
            {/* Mood quadrant box */}
            <div className="flex-shrink-0 grid grid-cols-2 gap-x-[6px] gap-y-[2px] px-[8px] py-[6px] rounded-[8px]" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
              <div className="flex items-center gap-[2px]"><img src="/mood/angry.svg" alt="" className="w-[11px] h-[11px]" /><span className="text-[8px] text-white/80">愤怒</span></div>
              <div className="flex items-center gap-[2px]"><img src="/mood/happy.svg" alt="" className="w-[11px] h-[11px]" /><span className="text-[8px] text-white/80">开心</span></div>
              <div className="flex items-center gap-[2px]"><img src="/mood/sad.svg" alt="" className="w-[11px] h-[11px]" /><span className="text-[8px] text-white/80">悲伤</span></div>
              <div className="flex items-center gap-[2px]"><img src="/mood/relaxed.svg" alt="" className="w-[11px] h-[11px]" /><span className="text-[8px] text-white/80">安逸</span></div>
            </div>
          </div>
          <div className="h-[3px] bg-white/20"><div className="h-full w-1/3 bg-white/70 rounded-full" /></div>
        </div>

        {/* Thoughts input */}
        <div className="mb-[24px]">
          <textarea className="w-full bg-transparent text-[14px] outline-none resize-none" style={{ color: theme.textSecondary, fontFamily: "'PingFang SC', sans-serif" }}
            rows={3} placeholder="说一说你现在的想法吧......" />
        </div>

        {/* Photo upload */}
        <div className="flex gap-[12px] mb-[16px]">
          <div className="w-[88px] h-[88px] rounded-[8px] border-2 border-dashed flex items-center justify-center" style={{ borderColor: `${theme.textPrimary}40` }}>
            <svg className="w-[28px] h-[28px]" style={{ color: `${theme.textPrimary}40` }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
          </div>
        </div>

        {/* Add location */}
        <div className="flex items-center gap-[4px] text-[14px]" style={{ color: theme.textSecondary }}>
          <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          添加地点
        </div>
      </div>
    </motion.div>
  )
}
