'use client'
import { motion } from 'framer-motion'
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
    const rTheme = moodThemes[record.mood]
    return (
      <motion.div className="min-h-screen pb-[181px]" initial={{ x: '100%' }} animate={{ x: 0, background: rTheme.bgGradient }} transition={{ duration: 0.3 }}>
        <div className="px-[14px] pt-[52px]">
          <div className="flex items-center justify-between mb-[16px]">
            <h1 className="text-[24px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录</h1>
            <button className="text-[13px] font-semibold" style={{ color: rTheme.textPrimary }} onClick={() => setViewMode('list')}>查看更多&gt;</button>
          </div>

          <div className="text-[12px] mb-[6px] flex items-center gap-[4px]" style={{ color: 'rgba(75,109,0,0.5)' }}>
            <img src={rTheme.iconSrc} alt="" className="w-[14px] h-[14px]" />
            <span style={{ fontFamily: "'PingFang HK', sans-serif", fontWeight: 600 }}>{record.songTitle}-{record.artist}</span>
            <span className="ml-auto" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{record.date} 星期一</span>
          </div>

          {/* Record detail card with glass */}
          <div className="rounded-[8px] overflow-hidden mb-[16px]" style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
            <div className="p-[12px] flex items-center gap-[10px]" style={{ backgroundColor: rTheme.primary }}>
              <div className="w-[56px] h-[56px] rounded-[8px] overflow-hidden flex-shrink-0">
                <img src="/covers/tiantian.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[20px] font-medium text-white leading-[1.5] truncate" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{record.songTitle}</p>
                <p className="text-[12px] text-white/70 leading-[1.5]">{record.artist}</p>
              </div>
              <div className="flex items-center gap-[6px]">
                <button className="w-[36px] h-[36px] rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <svg className="w-[16px] h-[16px] text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </button>
                <button className="w-[32px] h-[32px] flex items-center justify-center text-white">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                </button>
              </div>
              <div className="text-[10px] text-white/60 flex flex-col items-center px-[8px] py-[4px] rounded-[8px]" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex gap-[4px]"><img src="/mood/angry.svg" alt="" className="w-[12px] h-[12px]" /><span>愤怒</span><img src="/mood/happy.svg" alt="" className="w-[12px] h-[12px]" /><span>开心</span></div>
                <div className="flex gap-[4px]"><img src="/mood/sad.svg" alt="" className="w-[12px] h-[12px]" /><span>悲伤</span><img src="/mood/relaxed.svg" alt="" className="w-[12px] h-[12px]" /><span>安逸</span></div>
              </div>
            </div>
            <div className="p-[16px]" style={{ backgroundColor: rTheme.cardBg }}>
              <div className="flex items-start justify-between mb-[8px]">
                <h3 className="text-[18px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.title || '标题'}</h3>
                <span className="text-[13px] flex-shrink-0 ml-[8px]" style={{ color: rTheme.textSecondary }}>{record.date} 星期一</span>
              </div>
              <p className="text-[13px] mb-[16px]" style={{ color: rTheme.textSecondary, fontFamily: "'PingFang HK', sans-serif" }}>{record.content || '记录的具体内容'}</p>
              <div className="flex gap-[8px]">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-[80px] h-[80px] rounded-[8px] overflow-hidden"><img src="/covers/record-detail.jpg" alt="" className="w-full h-full object-cover" /></div>
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
      <motion.div className="min-h-screen pb-[181px]" animate={{ background: theme.bgGradient }} transition={{ duration: 0.8 }}>
        <div className="px-[14px] pt-[52px]">
          <div className="flex items-center justify-between mb-[16px]">
            <h1 className="text-[24px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录</h1>
            <button className="text-[13px]" style={{ color: theme.textSecondary }} onClick={() => setViewMode('cards')}>返回</button>
          </div>
          <div className="space-y-[4px]">
            {moodRecords.map((record) => (
              <motion.div key={record.id} className="flex items-center gap-[8px] py-[10px] px-[12px] rounded-[5.6px]"
                style={{ backgroundColor: moodBgColors[record.mood] }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setSelectedRecord(record.id); setViewMode('detail') }}>
                <img src={moodThemes[record.mood].iconSrc} alt="" className="w-[16px] h-[16px]" />
                <span className="text-[12px] flex-1 truncate font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.songTitle}-{moodThemes[record.mood].label}</span>
                <span className="text-[12px]" style={{ color: theme.textSecondary, fontFamily: "'Noto Sans SC', sans-serif" }}>{record.date}</span>
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
    <motion.div className="min-h-screen pb-[181px]" animate={{ background: theme.bgGradient }} transition={{ duration: 0.8 }}>
      <div className="px-[14px] pt-[52px]">
        <div className="flex items-center justify-between mb-[12px]">
          <h1 className="text-[24px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录</h1>
          <button className="text-[13px] font-semibold" style={{ color: theme.textPrimary, fontFamily: "'PingFang HK', sans-serif" }} onClick={() => setViewMode('list')}>查看更多&gt;</button>
        </div>

        {/* Stacked record cards - Figma style with overlap and shadow */}
        <div className="relative mb-[16px]">
          {recentRecords.map((record, index) => (
            <motion.div key={record.id}
              className="rounded-t-[5.4px] px-[12px] py-[8px] flex items-center gap-[8px]"
              style={{
                backgroundColor: moodBgColors[record.mood],
                marginBottom: index < recentRecords.length - 1 ? -6 : 0,
                position: 'relative',
                zIndex: recentRecords.length - index,
                boxShadow: expandedCard === record.id ? '0 -9px 9.9px rgba(0,0,0,0.25)' : 'none',
              }}
              animate={expandedCard === record.id ? { scale: 1.03, y: -12, boxShadow: '0 10px 30px rgba(0,0,0,0.18)' } : { scale: 1, y: 0 }}
              onClick={() => handleRecordClick(record.id)} whileTap={{ scale: 0.98 }}
            >
              <img src={moodThemes[record.mood].iconSrc} alt="" className="w-[16px] h-[16px]" />
              <span className="text-[12px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.songTitle}-{record.artist}</span>
              <span className="ml-auto text-[12px]" style={{ color: theme.textSecondary, fontFamily: "'Noto Sans SC', sans-serif" }}>{record.date}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom card - record coordinate with glass overlay */}
        <div className="rounded-[26px] overflow-hidden relative" style={{
          boxShadow: '9px 4px 4px rgba(0,0,0,0.25)',
        }}>
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden rounded-[26px]">
            <img src="/covers/tiantian.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          {/* Glass overlay */}
          <div className="absolute inset-0 rounded-[26px]" style={{
            backgroundColor: `${theme.primary}B8`,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }} />

          <div className="relative p-[14px] pb-[20px]">
            <div className="flex items-start justify-between mb-[12px]">
              <div>
                <div className="flex items-center gap-[4px] text-[18.4px] font-semibold text-white leading-[1.5]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>
                  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  记录此刻心情和
                </div>
                <p className="text-[18.4px] font-semibold text-white leading-[1.5]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>动人音乐</p>
              </div>
              <span className="text-[10.7px] text-white leading-[1.5]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>2026.6.23</span>
            </div>

            {/* Mini coordinate */}
            <div className="relative h-[160px] rounded-[12px] overflow-hidden" style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
            }}>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
              {/* Vinyl record */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full overflow-hidden opacity-70">
                <img src="/covers/tiantian.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              {/* Mood labels */}
              <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 flex gap-[16px] text-[10px] text-white font-bold" style={{ fontFamily: "'Oxygen', sans-serif" }}>
                <span className="flex items-center gap-[2px]"><img src="/mood/angry.svg" alt="" className="w-[12px] h-[12px]" />愤怒</span>
                <span className="flex items-center gap-[2px]"><img src="/mood/happy.svg" alt="" className="w-[12px] h-[12px]" />开心</span>
              </div>
              <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 flex gap-[16px] text-[10px] text-white font-bold" style={{ fontFamily: "'Oxygen', sans-serif" }}>
                <span className="flex items-center gap-[2px]"><img src="/mood/sad.svg" alt="" className="w-[12px] h-[12px]" />悲伤</span>
                <span className="flex items-center gap-[2px]"><img src="/mood/relaxed.svg" alt="" className="w-[12px] h-[12px]" />安逸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MiniPlayer /><TabBar />
    </motion.div>
  )
}
