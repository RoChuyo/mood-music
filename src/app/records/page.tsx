'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMoodStore, moodThemes, Mood } from '@/store/useMoodStore'
import { moodRecords, songsByMood } from '@/data/songs'
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
          </div>
          {/* Glass container for the list */}
          <div className="rounded-[12px] overflow-hidden" style={{
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            backgroundColor: `${theme.cardBg}60`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}>
            {moodRecords.map((record, i) => (
              <motion.div key={record.id}
                className="flex items-center gap-[8px] py-[10px] px-[12px]"
                style={{
                  backgroundColor: moodBgColors[record.mood],
                  borderBottom: i < moodRecords.length - 1 ? '1px solid rgba(255,255,255,0.3)' : 'none',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setSelectedRecord(record.id); setViewMode('detail') }}>
                <img src={moodThemes[record.mood].iconSrc} alt="" className="w-[16px] h-[16px]" />
                <span className="text-[12px] flex-1 truncate font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif", color: moodThemes[record.mood].textPrimary }}>{record.songTitle}-{moodThemes[record.mood].label}</span>
                <span className="text-[12px]" style={{ color: moodThemes[record.mood].textSecondary, fontFamily: "'Noto Sans SC', sans-serif" }}>{record.date}</span>
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
    <motion.div className="flex flex-col min-h-full" animate={{ background: theme.bgGradient }} transition={{ duration: 0.8 }}>
      <div className="flex-1 px-0 pt-[52px]">
        <div className="flex items-center justify-between mb-[8px] px-[22px]">
          <h1 className="text-[24px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录</h1>
          <button className="text-[13px] font-semibold" style={{ color: theme.textPrimary, fontFamily: "'PingFang HK', sans-serif" }} onClick={() => setViewMode('list')}>查看更多&gt;</button>
        </div>

        {/* Fanned stacked cards — aligned LEFT, each card wider than the one above */}
        <div className="relative" style={{ height: 220, marginLeft: 23 }}>
          {recentRecords.map((record, i) => {
            const w = 275 + i * 15
            return (
              <motion.div key={record.id}
                className="absolute rounded-tl-[5.4px] rounded-tr-[5.4px] overflow-hidden cursor-pointer"
                style={{
                  width: w, left: 0,
                  top: i * 31,
                  height: i === recentRecords.length - 1 ? 60 : 38,
                  zIndex: i + 1,
                  boxShadow: '0px -9px 9.9px rgba(0,0,0,0.25)',
                }}
                animate={expandedCard === record.id ? { y: -8, scale: 1.02 } : { y: 0, scale: 1 }}
                onClick={() => handleRecordClick(record.id)} whileTap={{ scale: 0.98 }}
              >
                <img src={record.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ backgroundColor: `${moodThemes[record.mood].primary}30` }} />
                <div className="absolute top-0 left-0 right-0 h-[27px] flex items-center px-[7px] gap-[4px] rounded-tl-[5.4px] rounded-tr-[5.4px]" style={{ backgroundColor: 'rgba(75,109,0,0.5)' }}>
                  <img src={moodThemes[record.mood].iconSrc} alt="" className="w-[10px] h-[10px]" />
                  <span className="text-[12px] font-semibold text-white" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.songTitle}-{record.artist}</span>
                  <span className="ml-auto text-[12px] text-white" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{record.date}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Coordinate card — single full-width card, photo bg, left glass overlay, right vinyl */}
        <div
          className="rounded-[26px] overflow-hidden relative mx-[16px] cursor-pointer"
          style={{ height: 366, boxShadow: '9px 4px 4px rgba(0,0,0,0.25)' }}
          onClick={() => router.push('/records/publish')}
        >
          {/* Full photo background */}
          <img src="/records/stack-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />

          {/* Left glass overlay (~48% width) */}
          <motion.div className="absolute left-0 top-0 bottom-0 w-[48%]" animate={{ backgroundColor: `${theme.primary}A0` }} transition={{ duration: 0.8 }} style={{ opacity: 0.72 }} />

          {/* Coordinate cross lines spanning the full card */}
          <div className="absolute" style={{ left: '48%', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
          <div className="absolute" style={{ top: '48%', left: 14, right: 14, height: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />

          {/* Vinyl record — right side, overlapping center, partially cut off at right edge */}
          <div className="absolute" style={{ right: -40, top: '50%', transform: 'translateY(-50%)', width: 320, height: 320 }}>
            <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(from 97deg, ${theme.primary}50, ${theme.primary}25, ${theme.primary}40, ${theme.primary}15, ${theme.primary}50)` }} />
            <div className="absolute rounded-full" style={{ inset: 20, background: `conic-gradient(from 30deg, rgba(0,0,0,0.12), rgba(255,255,255,0.06), rgba(0,0,0,0.1), rgba(255,255,255,0.04), rgba(0,0,0,0.12))` }} />
            <div className="absolute rounded-full" style={{ inset: 35, border: '1px solid rgba(255,255,255,0.12)' }} />
            <div className="absolute rounded-full overflow-hidden" style={{ inset: 82 }}>
              <img src={songsByMood[currentMood][0].cover} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute rounded-full" style={{ inset: 152, backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)' }} />
          </div>

          {/* Title ⊕ + date */}
          <div className="absolute left-[30px] top-[16px]" style={{ width: 140 }}>
            <div className="flex items-start gap-[4px]">
              <svg className="w-[16px] h-[16px] flex-shrink-0 mt-[3px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v8M8 12h8" /></svg>
              <p className="text-[18.4px] font-semibold text-white leading-[1.3]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录此刻心情和动人音乐</p>
            </div>
          </div>
          <span className="absolute right-[16px] top-[20px] text-[10.7px] text-white" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>2026.6.23</span>

          {/* Mood labels — clustered near the crosshair center */}
          <div className="absolute left-[130px] top-[148px] flex items-center gap-[2px]"><img src="/mood/angry.svg" alt="" className="w-[19px] h-[19px]" /><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>愤怒</span></div>
          <div className="absolute left-[186px] top-[148px] flex items-center gap-[2px]"><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>开心</span><img src="/mood/happy.svg" alt="" className="w-[22px] h-[22px]" /></div>
          <div className="absolute left-[130px] top-[185px] flex items-center gap-[2px]"><img src="/mood/sad.svg" alt="" className="w-[19px] h-[19px]" /><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>悲伤</span></div>
          <div className="absolute left-[186px] top-[185px] flex items-center gap-[2px]"><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>安逸</span><img src="/mood/relaxed.svg" alt="" className="w-[19px] h-[19px]" /></div>

          {/* Trail dots — diagonal upper-right to lower-left */}
          {[0,1,2,3,4,5].map(i => (
            <div key={i} className="absolute rounded-full bg-white" style={{
              left: 195 - i * 22, top: 110 + i * 22,
              width: 8 + i * 2, height: 8 + i * 2,
              opacity: 0.55 - i * 0.06,
            }} />
          ))}

          {/* Cursor with mood icon */}
          <div className="absolute flex items-center justify-center rounded-full" style={{
            left: 230, top: 100, width: 31, height: 31,
            backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 0 12px rgba(255,255,255,0.4)',
          }}>
            <img src={theme.iconSrc} alt="" className="w-[22px] h-[22px]" />
          </div>
        </div>
      </div>
      <MiniPlayer /><TabBar />
    </motion.div>
  )
}
