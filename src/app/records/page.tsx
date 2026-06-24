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
// Frosted-glass tint per mood (Figma effective alpha ≈ 0.45)
const moodGlass: Record<Mood, string> = { happy: 'rgba(80,134,0,0.45)', sad: 'rgba(0,85,134,0.45)', angry: 'rgba(134,0,40,0.45)', relaxed: 'rgba(134,120,0,0.45)' }
// Cursor lands in the quadrant matching the mood (top-left of the 31px circle, card-relative)
const cursorPos: Record<Mood, { left: number; top: number }> = {
  happy: { left: 250, top: 100 },   // top-right
  angry: { left: 95, top: 100 },    // top-left
  sad: { left: 95, top: 235 },      // bottom-left
  relaxed: { left: 250, top: 235 }, // bottom-right
}

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

        {/* ===== 记录坐标轴 — 366x366 card, exact Figma positions ===== */}
        <div className="relative ml-[16px]" style={{ width: 366, height: 366, borderRadius: 26, overflow: 'hidden', boxShadow: '9px 4px 4px rgba(0,0,0,0.25)' }}
          onClick={() => router.push('/records/publish')}>

          {/* Base background = page-gradient tint (right half shows this behind vinyl) */}
          <motion.div className="absolute inset-0" animate={{ backgroundColor: theme.cardBg }} transition={{ duration: 0.8 }} />

          {/* Left photo card — only left 184px (Figma node image5 / 183.947px wide) */}
          <div className="absolute left-0 top-0 bottom-0" style={{ width: 184 }}>
            <img src={vinylCover} alt="" className="absolute inset-0 h-full object-cover" style={{ width: 366, maxWidth: 'none' }} />
          </div>

          {/* Vinyl record — center (194,188), outer ring 319px, album art 145px */}
          <div className="absolute" style={{ left: 34.6, top: 28.6, width: 319, height: 319 }}>
            <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(from 97deg, ${theme.primary}, ${theme.primary}99, ${theme.primary}, ${theme.primary}88, ${theme.primary})` }} />
            <div className="absolute rounded-full" style={{ inset: 14, background: `repeating-radial-gradient(circle, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)` }} />
            <div className="absolute rounded-full" style={{ inset: 78, border: '2px solid rgba(255,255,255,0.12)' }} />
            {/* album art center 145px */}
            <div className="absolute rounded-full overflow-hidden" style={{ inset: 87 }}>
              <img src={vinylCover} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute rounded-full" style={{ inset: 152, backgroundColor: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.3)' }} />
          </div>

          {/* ===== FROSTED GLASS overlay — full card, blur + mood tint ===== */}
          <motion.div className="absolute inset-0"
            animate={{ backgroundColor: moodGlass[currentMood] }} transition={{ duration: 0.8 }}
            style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} />
          {/* Extra darker glass over the left photo half (Figma stacks photo-card glass + overlay) */}
          <motion.div className="absolute left-0 top-0 bottom-0" style={{ width: 184 }}
            animate={{ backgroundColor: moodGlass[currentMood] }} transition={{ duration: 0.8 }} />

          {/* ===== Content on top of glass (sharp) ===== */}
          {/* Weather particles — scattered faint dots */}
          {[[60,60],[120,40],[250,50],[300,90],[90,300],[280,260],[200,310],[150,200],[320,180]].map(([x,y],i)=>(
            <div key={i} className="absolute rounded-full bg-white" style={{ left: x, top: y, width: 3, height: 3, opacity: 0.35 }} />
          ))}

          {/* Title ⊕ — icon at (13.7,22.5), text at (30.3,15.7) */}
          <svg className="absolute" style={{ left: 13.7, top: 22.5, width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v8M8 12h8"/></svg>
          <p className="absolute font-semibold text-white" style={{ left: 30.3, top: 15.7, width: 139, fontSize: 18.39, lineHeight: 1.5, fontFamily: "'PingFang HK', sans-serif" }}>记录此刻心情和动人音乐</p>
          {/* Date — (260,20.7) */}
          <span className="absolute text-white" style={{ left: 246, top: 20.7, fontSize: 10.7, fontFamily: "'Noto Sans SC', sans-serif" }}>2026.6.23</span>

          {/* Coordinate cross — H-line (13.7,174.2 w322.9), V-line (178.1,7.8 h319) */}
          <div className="absolute" style={{ left: 13.7, top: 174.2, width: 322.9, height: 1, backgroundColor: 'rgba(255,255,255,0.4)' }} />
          <div className="absolute" style={{ left: 178.1, top: 7.8, width: 1, height: 319, backgroundColor: 'rgba(255,255,255,0.4)' }} />

          {/* Mood labels — clustered around crosshair (exact Figma card-relative) */}
          <div className="absolute flex items-center gap-[3px]" style={{ left: 127.2, top: 145.8 }}><img src="/mood/angry.svg" alt="" style={{ width: 19, height: 19 }}/><span className="font-bold text-white" style={{ fontSize: 10, fontFamily: "'Oxygen', sans-serif" }}>愤怒</span></div>
          <div className="absolute flex items-center gap-[3px]" style={{ left: 185.9, top: 144.8 }}><span className="font-bold text-white" style={{ fontSize: 10, fontFamily: "'Oxygen', sans-serif" }}>开心</span><img src="/mood/happy.svg" alt="" style={{ width: 22, height: 22 }}/></div>
          <div className="absolute flex items-center gap-[3px]" style={{ left: 127.2, top: 183 }}><img src="/mood/sad.svg" alt="" style={{ width: 19, height: 19 }}/><span className="font-bold text-white" style={{ fontSize: 10, fontFamily: "'Oxygen', sans-serif" }}>悲伤</span></div>
          <div className="absolute flex items-center gap-[3px]" style={{ left: 185.9, top: 183 }}><span className="font-bold text-white" style={{ fontSize: 10, fontFamily: "'Oxygen', sans-serif" }}>安逸</span><img src="/mood/relaxed.svg" alt="" style={{ width: 19, height: 19 }}/></div>

          {/* Trail dots — fading trail leading to the mood-quadrant cursor */}
          {[0,1,2,3,4,5].map(i => {
            const cur = cursorPos[currentMood]
            const cx = cur.left + 15.5, cy = cur.top + 15.5
            const t = 0.18 + i * 0.16
            return (
              <div key={i} className="absolute rounded-full bg-white" style={{
                left: cx + (178 - cx) * t - (9 - i) / 2,
                top: cy + (174 - cy) * t - (9 - i) / 2,
                width: 18 - i * 2, height: 18 - i * 2,
                opacity: 0.5 - i * 0.06,
              }} />
            )
          })}

          {/* Cursor — white glow circle with current-mood icon, in the mood's quadrant */}
          <div className="absolute flex items-center justify-center rounded-full" style={{
            left: cursorPos[currentMood].left, top: cursorPos[currentMood].top,
            width: 31, height: 31,
            backgroundColor: 'rgba(255,255,255,0.92)', boxShadow: '0 0 14px rgba(255,255,255,0.55)',
          }}>
            <img src={theme.iconSrc} alt="" style={{ width: 21, height: 21 }} />
          </div>
        </div>
      </div>
      <MiniPlayer /><TabBar />
    </motion.div>
  )
}
