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
      <motion.div className="flex flex-col min-h-full" initial={{ x: '100%' }} animate={{ x: 0, background: rTheme.bgGradient }} transition={{ duration: 0.3 }}>
        <div className="flex-1 px-[14px] pt-[52px]">
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
                <img src={record.cover || '/covers/daoxiang.jpg'} alt="" className="w-full h-full object-cover" />
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
      <motion.div className="flex flex-col min-h-full" animate={{ background: theme.bgGradient }} transition={{ duration: 0.8 }}>
        <div className="flex-1 px-[14px] pt-[52px]">
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
  // fanned stack: each lower card is wider & sits lower, like a spreading deck
  const STEP = 34
  const baseW = 248

  return (
    <motion.div className="flex flex-col min-h-full" animate={{ background: theme.bgGradient }} transition={{ duration: 0.8 }}>
      <div className="flex-1 px-[14px] pt-[52px]">
        <div className="flex items-center justify-between mb-[12px]">
          <h1 className="text-[24px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录</h1>
          <button className="text-[13px] font-semibold" style={{ color: theme.textPrimary, fontFamily: "'PingFang HK', sans-serif" }} onClick={() => setViewMode('list')}>查看更多&gt;</button>
        </div>

        {/* Fanned stacked record cards - each card a photo with a translucent green label bar */}
        <div className="relative mx-auto" style={{ height: STEP * recentRecords.length + 36, width: baseW + (recentRecords.length - 1) * 24 }}>
          {recentRecords.map((record, index) => {
            const w = baseW + index * 24
            const isLast = index === recentRecords.length - 1
            return (
              <motion.div
                key={record.id}
                className="absolute left-1/2 rounded-[6px] overflow-hidden cursor-pointer"
                style={{
                  width: w,
                  top: index * STEP,
                  height: isLast ? 150 : STEP + 8,
                  marginLeft: -w / 2,
                  zIndex: index + 1,
                  boxShadow: '0px -9px 9.9px rgba(0,0,0,0.18)',
                }}
                animate={expandedCard === record.id ? { y: -10, scale: 1.02 } : { y: 0, scale: 1 }}
                onClick={() => handleRecordClick(record.id)}
                whileTap={{ scale: 0.98 }}
              >
                {/* photo background */}
                <img src={record.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ backgroundColor: `${moodThemes[record.mood].primary}40` }} />
                {/* green translucent label bar */}
                <div className="absolute top-0 left-0 right-0 h-[27px] flex items-center px-[8px] gap-[4px]" style={{ backgroundColor: 'rgba(75,109,0,0.55)' }}>
                  <img src={moodThemes[record.mood].iconSrc} alt="" className="w-[13px] h-[13px]" />
                  <span className="text-[12px] font-semibold text-white" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.songTitle}-{record.artist}</span>
                  <span className="ml-auto text-[12px] text-white" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{record.date}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Coordinate card - photo bg + green overlay + vinyl + cursor with mood icon */}
        <div
          className="rounded-[26px] overflow-hidden relative mt-[12px] cursor-pointer"
          style={{ height: 366, boxShadow: '9px 4px 4px rgba(0,0,0,0.25)' }}
          onClick={() => router.push('/records/publish')}
        >
          <img src="/records/stack-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <motion.div className="absolute inset-0" animate={{ backgroundColor: `${theme.primary}B8` }} transition={{ duration: 0.8 }} />

          {/* Title + date */}
          <div className="relative px-[16px] pt-[16px]">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-[4px]">
                <img src="/icons/record-pen.svg" alt="" className="w-[20px] h-[20px] -ml-[2px]" />
                <p className="text-[18.4px] font-semibold text-white leading-[1.35] w-[140px]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录此刻心情和动人音乐</p>
              </div>
              <span className="text-[10.7px] text-white leading-[1.5]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>2026.6.23</span>
            </div>
          </div>

          {/* Coordinate area with vinyl + cross + labels + cursor */}
          <div className="absolute inset-x-0 bottom-0 top-[70px]">
            {/* cross axis */}
            <div className="absolute left-1/2 top-[6px] bottom-[6px] w-px bg-white/25" />
            <div className="absolute top-1/2 left-[14px] right-[14px] h-px bg-white/25" />

            {/* vinyl record (right side, half visible) */}
            <div className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-full overflow-hidden opacity-80 shadow-lg">
              <img src="/records/vinyl-bg.png" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[28px] h-[28px] rounded-full bg-white/30 border border-white/50" />
              </div>
            </div>

            {/* mood labels (white) */}
            <div className="absolute left-[40px] top-[40px] flex items-center gap-[3px]"><img src="/mood/angry.svg" alt="" className="w-[17px] h-[17px]" /><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>愤怒</span></div>
            <div className="absolute right-[60px] top-[40px] flex items-center gap-[3px]"><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>开心</span><img src="/mood/happy.svg" alt="" className="w-[19px] h-[19px]" /></div>
            <div className="absolute left-[40px] bottom-[40px] flex items-center gap-[3px]"><img src="/mood/sad.svg" alt="" className="w-[17px] h-[17px]" /><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>悲伤</span></div>
            <div className="absolute right-[60px] bottom-[40px] flex items-center gap-[3px]"><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>安逸</span><img src="/mood/relaxed.svg" alt="" className="w-[17px] h-[17px]" /></div>

            {/* trail dots */}
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className="absolute rounded-full bg-white" style={{
                left: 70 + i * 16,
                top: 56 + i * 16,
                width: 8 + i * 2,
                height: 8 + i * 2,
                opacity: 0.25 + i * 0.08,
              }} />
            ))}
            {/* cursor with current mood icon */}
            <motion.div className="absolute w-[31px] h-[31px] rounded-full bg-white/90 flex items-center justify-center shadow-lg" style={{ left: 176, top: 150 }}>
              <img src={theme.iconSrc} alt="" className="w-[20px] h-[20px]" />
            </motion.div>
          </div>
        </div>
      </div>
      <MiniPlayer /><TabBar />
    </motion.div>
  )
}
