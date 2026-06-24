'use client'
import { motion } from 'framer-motion'
import { useMoodStore, moodThemes } from '@/store/useMoodStore'
import { songsByMood, moodRecords } from '@/data/songs'
import MiniPlayer from '@/components/MiniPlayer'
import TabBar from '@/components/TabBar'

export default function ProfilePage() {
  const { currentMood } = useMoodStore()
  const theme = moodThemes[currentMood]
  const recentSongs = songsByMood[currentMood].slice(0, 3)
  const recentRecords = moodRecords.slice(0, 2)

  const hrvData = [40, 55, 35, 60, 45, 70, 50]
  const maxHrv = Math.max(...hrvData)

  return (
    <motion.div
      className="min-h-screen pb-36"
      animate={{ background: theme.bgGradient }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative">
        <motion.div
          className="h-56 w-full"
          animate={{ backgroundColor: theme.primaryLight + '40' }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          <div className="absolute top-12 left-4 text-lg font-bold text-white">个人主页</div>
          <motion.button
            className="absolute top-12 right-4 h-8 w-8 rounded-full flex items-center justify-center"
            animate={{ backgroundColor: theme.primary }}
          >
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </motion.button>
        </motion.div>

        <div className="px-4 -mt-12">
          <div className="flex items-end gap-3 mb-4">
            <div className="h-16 w-16 rounded-full border-3 border-white shadow-lg overflow-hidden flex items-center justify-center text-3xl bg-white">
              😊
            </div>
            <div>
              <h2 className="text-xl font-bold">用户名</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span>{theme.icon}</span> {theme.label}
              </p>
            </div>
          </div>

          <motion.div
            className="rounded-2xl p-4 mb-6"
            animate={{ backgroundColor: theme.cardBg }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">心迹趋势波动</h3>
              <span className="text-sm text-gray-500">HRV</span>
            </div>
            <div className="h-24 flex items-end gap-2">
              {hrvData.map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full relative flex items-end justify-center" style={{ height: 80 }}>
                    <motion.div
                      className="w-1.5 rounded-full"
                      animate={{
                        height: `${(value / maxHrv) * 100}%`,
                        backgroundColor: theme.primary + '60',
                      }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.div
                      className="absolute w-2.5 h-2.5 rounded-full"
                      style={{ bottom: `${(value / maxHrv) * 100}%` }}
                      animate={{ backgroundColor: theme.primary }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <svg className="w-full h-16 -mt-8" viewBox="0 0 300 60">
              <motion.path
                d={`M ${hrvData.map((v, i) => `${(i / (hrvData.length - 1)) * 280 + 10},${60 - (v / maxHrv) * 50}`).join(' L ')}`}
                fill="none"
                animate={{ stroke: theme.primary + '80' }}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <h3 className="text-lg font-bold mb-3">最近记录</h3>
          <div className="space-y-3 mb-6">
            {recentRecords.map((record) => (
              <motion.div
                key={record.id}
                className="rounded-xl p-3"
                animate={{ backgroundColor: moodThemes[record.mood].cardBg }}
              >
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <span>{moodThemes[record.mood].icon}</span>
                  <span>{record.songTitle}-{record.artist}</span>
                  <span className="ml-auto">{record.date} 星期一</span>
                </div>
                <div className="flex items-start gap-3">
                  <div>
                    <p className="font-bold">{record.title || '标题'}</p>
                    <p className="text-sm text-gray-600">{record.content}</p>
                  </div>
                  <div className="h-14 w-14 rounded-lg flex-shrink-0" style={{ backgroundColor: moodThemes[record.mood].primaryLight + '30' }} />
                </div>
              </motion.div>
            ))}
          </div>

          <h3 className="text-lg font-bold mb-3">最近在听</h3>
          <div className="space-y-2">
            {recentSongs.map((song) => (
              <div key={song.id} className="flex items-center gap-3 py-2">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: theme.primaryLight + '60' }}>
                  {song.title.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{song.title}</p>
                  <p className="text-xs text-gray-500">{song.artist}</p>
                  <p className="text-xs text-gray-400">{song.date} 星期一</p>
                </div>
                <button className="h-7 w-7 rounded-full flex items-center justify-center">
                  <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MiniPlayer />
      <TabBar />
    </motion.div>
  )
}
