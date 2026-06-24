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

  const moodColors: Record<Mood, string> = {
    happy: '#6B8F3C',
    sad: '#5B8EA6',
    angry: '#C45B5B',
    relaxed: '#B8963C',
  }

  const moodBgColors: Record<Mood, string> = {
    happy: '#E8F0D8',
    sad: '#D8E8F0',
    angry: '#F0D8D8',
    relaxed: '#F0E8D0',
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
      <motion.div
        className="min-h-screen pb-36"
        initial={{ x: '100%' }}
        animate={{ x: 0, background: recordTheme.bgGradient }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 pt-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">记录</h1>
            <button className="text-sm" style={{ color: recordTheme.primary }} onClick={() => setViewMode('list')}>查看更多&gt;</button>
          </div>

          <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <span>{moodThemes[record.mood].icon}</span>
            <span>{record.songTitle}-{record.artist}</span>
            <span className="ml-auto">{record.date} 星期一</span>
          </div>

          <motion.div
            className="rounded-2xl overflow-hidden mb-4"
            animate={{ backgroundColor: recordTheme.cardBg }}
          >
            <div className="p-4 flex items-center gap-3" style={{ backgroundColor: recordTheme.primary }}>
              <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold">
                {record.songTitle[0]}{record.songTitle[1]}
              </div>
              <div className="flex-1">
                <p className="font-bold text-white">{record.songTitle}</p>
                <p className="text-sm text-white/70">{record.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </button>
                <button className="h-8 w-8 flex items-center justify-center text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                </button>
              </div>
              <div className="text-xs text-white/60">
                <p>🔥愤怒 ☀️开心</p>
                <p>🌊悲伤 🌙安逸</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold">{record.title || '标题'}</h3>
                <span className="text-sm text-gray-500">{record.date} 星期一</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{record.content || '记录的具体内容'}</p>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 w-20 rounded-lg" style={{ backgroundColor: recordTheme.primaryLight + '30' }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <MiniPlayer />
        <TabBar />
      </motion.div>
    )
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        className="min-h-screen pb-36"
        animate={{ background: theme.bgGradient }}
        transition={{ duration: 0.8 }}
      >
        <div className="px-4 pt-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">记录</h1>
            <button className="text-sm text-gray-500" onClick={() => setViewMode('cards')}>返回</button>
          </div>
          <div className="space-y-1">
            {moodRecords.map((record) => (
              <motion.div
                key={record.id}
                className="flex items-center gap-2 py-2.5 px-3 rounded-xl"
                style={{ backgroundColor: moodBgColors[record.mood] }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedRecord(record.id)
                  setViewMode('detail')
                }}
              >
                <span className="text-sm">{moodThemes[record.mood].icon}</span>
                <span className="text-sm flex-1 truncate">
                  {record.songTitle}-{moodThemes[record.mood].label}
                </span>
                <span className="text-xs text-gray-500">{record.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <MiniPlayer />
        <TabBar />
      </motion.div>
    )
  }

  const recentRecords = moodRecords.slice(0, 6)

  return (
    <motion.div
      className="min-h-screen pb-36"
      animate={{ background: theme.bgGradient }}
      transition={{ duration: 0.8 }}
    >
      <div className="px-4 pt-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">记录</h1>
          <button className="text-sm" style={{ color: theme.primary }} onClick={() => setViewMode('list')}>查看更多&gt;</button>
        </div>

        <div className="relative mb-6">
          {recentRecords.map((record, index) => (
            <motion.div
              key={record.id}
              className="rounded-xl px-4 py-2.5 flex items-center gap-2"
              style={{
                backgroundColor: moodBgColors[record.mood],
                marginBottom: index < recentRecords.length - 1 ? -8 : 0,
                position: 'relative',
                zIndex: recentRecords.length - index,
              }}
              animate={expandedCard === record.id ? {
                scale: 1.02,
                y: -10,
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              } : {
                scale: 1,
                y: 0,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
              onClick={() => handleRecordClick(record.id)}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm">{moodThemes[record.mood].icon}</span>
              <span className="text-sm font-medium">{record.songTitle}-{record.artist}</span>
              <span className="ml-auto text-xs text-gray-500">{record.date}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="rounded-2xl overflow-hidden relative"
          animate={{ backgroundColor: theme.cardBg }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-4" style={{ background: `linear-gradient(135deg, ${theme.primary}40 0%, ${theme.primary}20 100%)` }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-1 text-lg font-bold">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  记录此刻心情和
                </div>
                <p className="text-lg font-bold">动人音乐</p>
              </div>
              <span className="text-sm text-gray-500">2026.6.23</span>
            </div>

            <div className="h-32 rounded-xl flex items-center justify-center relative" style={{ backgroundColor: theme.primaryLight + '20' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-black/10" style={{ left: '50%' }} />
                <div className="h-px w-full bg-black/10 absolute" style={{ top: '50%' }} />
              </div>
              <div className="absolute top-2 right-2 text-xs" style={{ color: moodThemes.happy.primary }}>☀️</div>
              <div className="absolute bottom-2 left-2 text-xs" style={{ color: moodThemes.sad.primary }}>🌊悲伤</div>
              <div className="text-4xl">🎵</div>
              <div className="absolute bottom-8 text-xs flex gap-4">
                <span>🔥愤怒</span>
                <span>☀️开心</span>
              </div>
              <div className="absolute bottom-2 text-xs flex gap-4">
                <span>🌊悲伤</span>
                <span>🌙安逸</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <MiniPlayer />
      <TabBar />
    </motion.div>
  )
}
