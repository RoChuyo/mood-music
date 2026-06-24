'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMoodStore, moodThemes, Mood } from '@/store/useMoodStore'
import { moodRecords } from '@/data/songs'
import MiniPlayer from '@/components/MiniPlayer'
import TabBar from '@/components/TabBar'

type ViewMode = 'cards' | 'list' | 'detail'

export default function RecordsPage() {
  const router = useRouter()
  const { currentMood } = useMoodStore()
  const theme = moodThemes[currentMood]
  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const moodBgColors: Record<Mood, string> = {
    happy: '#E9F8D3',
    sad: '#D3E8F8',
    angry: '#F8D3DB',
    relaxed: '#F8F0D3',
  }

  const handleRecordClick = (id: string) => {
    if (expandedCard === id) {
      setSelectedRecord(id)
      setViewMode('detail')
    } else {
      setExpandedCard(id)
    }
  }

  if (viewMode === 'detail' && selectedRecord) {
    const record = moodRecords.find(r => r.id === selectedRecord)!
    const recordTheme = moodThemes[record.mood]
    return (
      <motion.div className="min-h-screen pb-[180px]" initial={{ x: '100%' }} animate={{ x: 0, background: recordTheme.bgGradient }} transition={{ duration: 0.3 }}>
        <div className="px-[14px] pt-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[24px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录</h1>
            <button className="text-[13px] font-semibold" style={{ color: recordTheme.textPrimary }} onClick={() => setViewMode('list')}>查看更多&gt;</button>
          </div>
          <div className="text-[12px] mb-2 flex items-center gap-1" style={{ color: recordTheme.textSecondary }}>
            <img src={recordTheme.iconSrc} alt="" className="w-[14px] h-[14px]" />
            <span>{record.songTitle}-{record.artist}</span>
            <span className="ml-auto">{record.date} 星期一</span>
          </div>
          <div className="rounded-[5.6px] overflow-hidden mb-4">
            <div className="p-3 flex items-center gap-3" style={{ backgroundColor: recordTheme.primary }}>
              <div className="h-14 w-14 rounded-lg bg-white/20 flex items-center justify-center overflow-hidden">
                <img src="/covers/tiantian.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white text-[20px]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{record.songTitle}</p>
                <p className="text-[12px] text-white/70">{record.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center"><svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></button>
                <button className="h-8 w-8 flex items-center justify-center text-white"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg></button>
              </div>
              <div className="text-[10px] text-white/60 flex flex-col items-center px-2 py-1 rounded-lg bg-white/10">
                <div className="flex gap-1"><img src="/mood/angry.svg" alt="" className="w-3 h-3" /><span>愤怒</span> <img src="/mood/happy.svg" alt="" className="w-3 h-3" /><span>开心</span></div>
                <div className="flex gap-1"><img src="/mood/sad.svg" alt="" className="w-3 h-3" /><span>悲伤</span> <img src="/mood/relaxed.svg" alt="" className="w-3 h-3" /><span>安逸</span></div>
              </div>
            </div>
            <div className="p-4" style={{ backgroundColor: recordTheme.cardBg }}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[18px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.title || '标题'}</h3>
                <span className="text-[13px]" style={{ color: theme.textSecondary }}>{record.date} 星期一</span>
              </div>
              <p className="text-[13px] mb-4" style={{ color: theme.textSecondary }}>{record.content || '记录的具体内容'}</p>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 w-20 rounded-lg overflow-hidden"><img src="/covers/record-detail.jpg" alt="" className="w-full h-full object-cover" /></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <MiniPlayer /><TabBar />
      </motion.div>
    )
  }

  if (viewMode === 'list') {
    return (
      <motion.div className="min-h-screen pb-[180px]" animate={{ background: theme.bgGradient }} transition={{ duration: 0.8 }}>
        <div className="px-[14px] pt-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[24px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录</h1>
            <button className="text-[13px]" onClick={() => setViewMode('cards')}>返回</button>
          </div>
          <div className="space-y-1">
            {moodRecords.map((record) => (
              <motion.div key={record.id} className="flex items-center gap-2 py-2.5 px-3 rounded-[5.6px]" style={{ backgroundColor: moodBgColors[record.mood] }} whileTap={{ scale: 0.98 }} onClick={() => { setSelectedRecord(record.id); setViewMode('detail') }}>
                <img src={moodThemes[record.mood].iconSrc} alt="" className="w-4 h-4" />
                <span className="text-[12px] flex-1 truncate font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.songTitle}-{moodThemes[record.mood].label}</span>
                <span className="text-[12px]" style={{ color: theme.textSecondary }}>{record.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <MiniPlayer /><TabBar />
      </motion.div>
    )
  }

  const recentRecords = moodRecords.slice(0, 6)

  return (
    <motion.div className="min-h-screen pb-[180px]" animate={{ background: theme.bgGradient }} transition={{ duration: 0.8 }}>
      <div className="px-[14px] pt-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[24px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录</h1>
          <button className="text-[13px] font-semibold" style={{ color: theme.textPrimary }} onClick={() => setViewMode('list')}>查看更多&gt;</button>
        </div>

        <div className="relative mb-6">
          {recentRecords.map((record, index) => (
            <motion.div key={record.id} className="rounded-t-[5.4px] px-4 py-2.5 flex items-center gap-2"
              style={{ backgroundColor: moodBgColors[record.mood], marginBottom: index < recentRecords.length - 1 ? -8 : 0, position: 'relative', zIndex: recentRecords.length - index }}
              animate={expandedCard === record.id ? { scale: 1.02, y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' } : { scale: 1, y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
              onClick={() => handleRecordClick(record.id)} whileTap={{ scale: 0.98 }}
            >
              <img src={moodThemes[record.mood].iconSrc} alt="" className="w-4 h-4" />
              <span className="text-[12px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.songTitle}-{record.artist}</span>
              <span className="ml-auto text-[12px]" style={{ color: theme.textSecondary }}>{record.date}</span>
            </motion.div>
          ))}
        </div>

        <div className="rounded-[26px] overflow-hidden relative" style={{ backgroundColor: `${theme.primary}B8` }}>
          <div className="p-[14px] relative" style={{ background: `linear-gradient(135deg, ${theme.primary}66 0%, ${theme.primary}33 100%)` }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-1 text-[18.4px] font-semibold text-white" style={{ fontFamily: "'PingFang HK', sans-serif" }}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  记录此刻心情和
                </div>
                <p className="text-[18.4px] font-semibold text-white" style={{ fontFamily: "'PingFang HK', sans-serif" }}>动人音乐</p>
              </div>
              <span className="text-[10.7px] text-white" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>2026.6.23</span>
            </div>

            <div className="h-[160px] rounded-xl flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: `${theme.primaryLight}33` }}>
              <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <img src="/covers/tiantian.jpg" alt="" className="w-[145px] h-[145px] rounded-full object-cover opacity-60" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-4 text-[10px] text-white">
                <span className="flex items-center gap-0.5"><img src="/mood/angry.svg" alt="" className="w-3 h-3" />愤怒</span>
                <span className="flex items-center gap-0.5"><img src="/mood/happy.svg" alt="" className="w-3 h-3" />开心</span>
              </div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-4 text-[10px] text-white">
                <span className="flex items-center gap-0.5"><img src="/mood/sad.svg" alt="" className="w-3 h-3" />悲伤</span>
                <span className="flex items-center gap-0.5"><img src="/mood/relaxed.svg" alt="" className="w-3 h-3" />安逸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MiniPlayer /><TabBar />
    </motion.div>
  )
}
