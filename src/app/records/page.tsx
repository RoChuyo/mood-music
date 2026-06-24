'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMoodStore, moodThemes, Mood } from '@/store/useMoodStore'
import { moodRecords, songsByMood } from '@/data/songs'
import MiniPlayer from '@/components/MiniPlayer'
import TabBar from '@/components/TabBar'

type ViewMode = 'cards' | 'list' | 'detail'

const moodBgColors: Record<Mood, string> = { happy: '#E9F8D3', sad: '#D3E8F8', angry: '#F8D3DB', relaxed: '#F8F0D3' }
const moodLabelBarColors: Record<Mood, string> = { happy: 'rgba(75,109,0,0.5)', sad: 'rgba(0,65,109,0.5)', angry: 'rgba(109,0,30,0.5)', relaxed: 'rgba(109,96,0,0.5)' }
const moodGlassColors: Record<Mood, string> = { happy: 'rgba(80,134,0,0.72)', sad: 'rgba(0,85,134,0.72)', angry: 'rgba(134,0,40,0.72)', relaxed: 'rgba(134,120,0,0.72)' }

export default function RecordsPage() {
  const router = useRouter()
  const { currentMood } = useMoodStore()
  const theme = moodThemes[currentMood]
  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const handleRecordClick = (id: string) => {
    if (expandedCard === id) { setSelectedRecord(id); setViewMode('detail') }
    else setExpandedCard(id)
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
          <div className="rounded-[8px] overflow-hidden mb-[16px]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div className="p-[12px] flex items-center gap-[10px]" style={{ backgroundColor: rTheme.primary }}>
              <div className="w-[56px] h-[56px] rounded-[8px] overflow-hidden flex-shrink-0">
                <img src={record.cover || '/covers/daoxiang.jpg'} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[20px] font-medium text-white leading-[1.5] truncate" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{record.songTitle}</p>
                <p className="text-[12px] text-white/70">{record.artist}</p>
              </div>
            </div>
            <div className="p-[16px]" style={{ backgroundColor: rTheme.cardBg }}>
              <h3 className="text-[18px] font-semibold mb-[4px]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.title}</h3>
              <p className="text-[13px]" style={{ color: rTheme.textSecondary }}>{record.content}</p>
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
          <div className="rounded-[12px] overflow-hidden" style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', backgroundColor: `${theme.cardBg}60`, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            {moodRecords.map((record, i) => (
              <motion.div key={record.id} className="flex items-center gap-[8px] py-[10px] px-[12px]"
                style={{ backgroundColor: moodBgColors[record.mood], borderBottom: i < moodRecords.length - 1 ? '1px solid rgba(255,255,255,0.3)' : 'none' }}
                whileTap={{ scale: 0.98 }} onClick={() => { setSelectedRecord(record.id); setViewMode('detail') }}>
                <img src={moodThemes[record.mood].iconSrc} alt="" className="w-[16px] h-[16px]" />
                <span className="text-[12px] flex-1 truncate font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif", color: moodThemes[record.mood].textPrimary }}>{record.songTitle}-{moodThemes[record.mood].label}</span>
                <span className="text-[12px]" style={{ color: moodThemes[record.mood].textSecondary }}>{record.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <MiniPlayer /><TabBar />
      </motion.div>
    )
  }

  // Main cards view — exact Figma layout
  const recentRecords = moodRecords.slice(0, 6)
  const vinylCover = songsByMood[currentMood][0].cover

  // Card positions from Figma: each card starts at left ~23-59px, progressively wider
  const cardSpecs = [
    { top: 0, left: 59, w: 275 },
    { top: 31, left: 51, w: 293 },
    { top: 63, left: 44, w: 306 },
    { top: 95, left: 38, w: 317 },
    { top: 131, left: 31, w: 332 },
    { top: 170, left: 23, w: 348 },
  ]

  return (
    <motion.div className="flex flex-col min-h-full" animate={{ background: theme.bgGradient }} transition={{ duration: 0.8 }}>
      <div className="flex-1 px-0 pt-[52px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-[4px] px-[22px]">
          <h1 className="text-[24px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录</h1>
          <button className="text-[13px] font-semibold" style={{ color: theme.textPrimary, fontFamily: "'PingFang HK', sans-serif" }} onClick={() => setViewMode('list')}>查看更多&gt;</button>
        </div>

        {/* Fanned stacked cards — Figma absolute positions */}
        <div className="relative" style={{ height: 220 }}>
          {recentRecords.map((record, i) => {
            const spec = cardSpecs[i] || cardSpecs[5]
            const isLast = i === recentRecords.length - 1
            return (
              <motion.div key={record.id}
                className="absolute overflow-hidden cursor-pointer"
                style={{
                  top: spec.top, left: spec.left, width: spec.w,
                  height: isLast ? 52 : 38,
                  zIndex: i + 1,
                  borderRadius: '5.4px 5.4px 0 0',
                  boxShadow: '0px -9px 9.9px rgba(0,0,0,0.25)',
                }}
                animate={expandedCard === record.id ? { y: -8, scale: 1.02 } : { y: 0, scale: 1 }}
                onClick={() => handleRecordClick(record.id)} whileTap={{ scale: 0.98 }}
              >
                {/* Photo background + tint */}
                <img src={record.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ backgroundColor: `${moodThemes[record.mood].primary}25` }} />
                {/* Label bar */}
                <div className="absolute top-0 left-0 right-0 h-[27px] flex items-center px-[7px] gap-[4px]"
                  style={{ backgroundColor: moodLabelBarColors[record.mood], borderRadius: '5.4px 5.4px 0 0' }}>
                  <img src={moodThemes[record.mood].iconSrc} alt="" className="w-[10px] h-[10px]" />
                  <span className="text-[12px] font-semibold text-white" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.songTitle}-{record.artist}</span>
                  <span className="ml-auto text-[12px] text-white" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{record.date}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Coordinate card — 366x366 square, Figma: left=16px, top=319px (relative ~270px after cards) */}
        <div className="relative mx-[16px]" style={{ width: 370, height: 366, borderRadius: 26, overflow: 'hidden', boxShadow: '9px 4px 4px rgba(0,0,0,0.25)' }}
          onClick={() => router.push('/records/publish')}>

          {/* Left half: photo + mood-colored glass overlay (184px wide) */}
          <div className="absolute left-0 top-0 bottom-0 w-[184px]">
            <img src={vinylCover} alt="" className="absolute inset-0 w-[370px] h-full object-cover" />
            <motion.div className="absolute inset-0" animate={{ backgroundColor: moodGlassColors[currentMood] }} transition={{ duration: 0.8 }} style={{ opacity: 0.64 }} />
          </div>

          {/* Right half: photo (no glass, just slight tint) */}
          <div className="absolute left-[184px] top-0 bottom-0 right-0">
            <img src={vinylCover} alt="" className="absolute inset-0 w-[370px] h-full object-cover" style={{ marginLeft: -184 }} />
            <motion.div className="absolute inset-0" animate={{ backgroundColor: `${theme.primary}20` }} transition={{ duration: 0.8 }} />
          </div>

          {/* Vinyl record — 3 concentric circles, Figma positions */}
          <div className="absolute" style={{ left: 200, top: 10, width: 357, height: 357 }}>
            {/* Outer ring */}
            <div className="absolute inset-[19px] rounded-full" style={{ background: `conic-gradient(from 97deg, ${theme.primary}50, ${theme.primary}20, ${theme.primary}40, ${theme.primary}15, ${theme.primary}50)`, border: '1px solid rgba(255,255,255,0.1)' }} />
            {/* Middle groove ring */}
            <div className="absolute rounded-full" style={{ inset: 38, background: `conic-gradient(from 30deg, rgba(0,0,0,0.1), rgba(255,255,255,0.05), rgba(0,0,0,0.08), rgba(255,255,255,0.03), rgba(0,0,0,0.1))`, border: '1px solid rgba(255,255,255,0.08)' }} />
            {/* Album art center circle — 145px diameter */}
            <div className="absolute rounded-full overflow-hidden" style={{ inset: 106 }}>
              <img src={vinylCover} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Coordinate cross lines */}
          <div className="absolute" style={{ left: 178, top: 8, bottom: 8, width: 1, backgroundColor: 'rgba(255,255,255,0.35)' }} />
          <div className="absolute" style={{ top: 175, left: 14, right: 14, height: 1, backgroundColor: 'rgba(255,255,255,0.35)' }} />

          {/* ⊕ Title + date */}
          <div className="absolute left-[30px] top-[16px]" style={{ width: 140 }}>
            <div className="flex items-start gap-[4px]">
              <svg className="w-[14px] h-[14px] flex-shrink-0 mt-[4px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v8M8 12h8"/></svg>
              <p className="text-[18.4px] font-semibold text-white leading-[1.3]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录此刻心情和动人音乐</p>
            </div>
          </div>
          <span className="absolute right-[100px] top-[20px] text-[10.7px] text-white" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>2026.6.23</span>

          {/* Weather animation icon — mood-specific, positioned below title */}
          <div className="absolute left-[30px] top-[80px]">
            <img src={theme.iconSrc} alt="" className="w-[40px] h-[40px] opacity-80" />
          </div>

          {/* Mood labels — Figma: clustered near center (left~127-186, top~146-183 relative to card) */}
          <div className="absolute left-[127px] top-[146px] flex items-center gap-[2px]"><img src="/mood/angry.svg" alt="" className="w-[20px] h-[20px]"/><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>愤怒</span></div>
          <div className="absolute left-[185px] top-[145px] flex items-center gap-[2px]"><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>开心</span><img src="/mood/happy.svg" alt="" className="w-[22px] h-[22px]"/></div>
          <div className="absolute left-[127px] top-[183px] flex items-center gap-[2px]"><img src="/mood/sad.svg" alt="" className="w-[20px] h-[20px]"/><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>悲伤</span></div>
          <div className="absolute left-[185px] top-[183px] flex items-center gap-[2px]"><span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>安逸</span><img src="/mood/relaxed.svg" alt="" className="w-[20px] h-[20px]"/></div>

          {/* Trail dots — Figma: from upper-right diagonal to lower-left */}
          {[0,1,2,3,4,5].map(i => (
            <div key={i} className="absolute rounded-full bg-white" style={{
              left: 200 - i * 24, top: 108 + i * 24,
              width: 8 + i * 2, height: 8 + i * 2,
              opacity: 0.5 - i * 0.06,
            }} />
          ))}

          {/* Cursor — white circle with mood icon */}
          <div className="absolute flex items-center justify-center rounded-full" style={{
            left: 234, top: 95, width: 31, height: 31,
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
