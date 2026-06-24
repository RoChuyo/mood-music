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

  return (
    <motion.div
      className="min-h-screen pb-[180px]"
      animate={{ background: theme.bgGradient }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative">
        <div className="h-[466px] w-full overflow-hidden relative">
          <img src="/covers/profile-cover.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#4a6525]" />
        </div>

        <div className="absolute top-[64px] left-[22px]">
          <p className="text-[24px] font-semibold text-white" style={{ fontFamily: "'PingFang HK', sans-serif" }}>个人主页</p>
        </div>

        <motion.button
          className="absolute top-[64px] right-[22px] h-[28px] w-[28px] rounded-full flex items-center justify-center"
          animate={{ backgroundColor: theme.primary }}
        >
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </motion.button>

        <div className="absolute bottom-[110px] left-[11px]">
          <img src="/ui/avatar-bordered.png" alt="" className="w-[49px] h-[49px]" />
        </div>

        <div className="absolute bottom-[60px] left-[16px]">
          <h2 className="text-[32px] font-semibold text-white" style={{ fontFamily: "'PingFang SC', sans-serif" }}>用户名</h2>
          <div className="flex items-center gap-1 mt-1">
            <img src={theme.iconSrc} alt="" className="w-[20px] h-[20px]" />
            <p className="text-[14px] font-bold text-white" style={{ fontFamily: "'Oxygen', sans-serif" }}>{theme.label}</p>
          </div>
        </div>
      </div>

      <div className="px-[16px] -mt-[20px]">
        {/* HRV Chart */}
        <p className="text-[18px] font-semibold mb-1 opacity-80" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>心迹趋势波动</p>
        <span className="text-[15px] opacity-80 ml-2" style={{ color: `${theme.textPrimary}80`, fontFamily: "'Inter', sans-serif" }}>HRV</span>

        <motion.div
          className="rounded-[20px] p-4 mb-6 opacity-80"
          animate={{ backgroundColor: '#EEFADC' }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-[110px] relative">
            <img src="/ui/hrv-chart.svg" alt="" className="w-full h-full object-contain opacity-80" />
            <img src="/ui/hrv-line.svg" alt="" className="absolute bottom-0 left-0 w-full h-[40px] object-contain opacity-80" />
          </div>
        </motion.div>

        {/* Recent Records */}
        <p className="text-[18px] font-semibold mb-3 opacity-80" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>最近记录</p>
        <div className="space-y-3 mb-6">
          {recentRecords.map((record) => {
            const rTheme = moodThemes[record.mood]
            return (
              <div key={record.id} className="rounded-[5.6px] overflow-hidden">
                <div className="px-3 py-2 flex items-center justify-between" style={{ backgroundColor: `${rTheme.primary}80` }}>
                  <div className="flex items-center gap-1">
                    <img src={rTheme.iconSrc} alt="" className="w-[14px] h-[14px]" />
                    <span className="text-[12px] text-white font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>
                      {record.songTitle}-{record.artist}
                    </span>
                  </div>
                  <span className="text-[9px] text-white" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.date} 星期一</span>
                </div>
                <div className="px-3 py-3 flex items-start gap-3" style={{ backgroundColor: theme.cardBg }}>
                  <div className="flex-1">
                    <p className="text-[18px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.title || '标题'}</p>
                    <p className="text-[13px] font-semibold" style={{ fontFamily: "'PingFang HK', sans-serif" }}>{record.content}</p>
                  </div>
                  <div className="w-[86px] h-[84px] rounded overflow-hidden flex-shrink-0">
                    <img src="/covers/record-detail.jpg" alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recently Played */}
        <p className="text-[18px] font-semibold mb-3 opacity-80" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>最近在听</p>
        <motion.div className="rounded-[20px] overflow-hidden" animate={{ backgroundColor: theme.cardBgAlpha }} transition={{ duration: 0.8 }}>
          <div className="px-[8px] py-[7px]">
            {recentSongs.map((song, i) => (
              <div key={song.id}>
                <div className="flex items-center gap-[23px] py-[3.5px]">
                  <div className="h-[67px] w-[67px] rounded-[10px] flex-shrink-0 overflow-hidden">
                    <img src={song.cover} alt={song.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[18px] font-medium truncate" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>{song.title}</p>
                    <p className="text-[14px] truncate" style={{ color: theme.textSecondary, fontFamily: "'PingFang SC', sans-serif" }}>{song.artist}</p>
                    <p className="text-[14px]" style={{ color: `${theme.textPrimary}80`, fontFamily: "'PingFang HK', sans-serif" }}>2026.6.22 星期一</p>
                  </div>
                  <button className="flex-shrink-0">
                    <img src="/icons/play-btn.svg" alt="play" className="w-7 h-7" />
                  </button>
                </div>
                {i < recentSongs.length - 1 && <div className="ml-[90px] h-px" style={{ backgroundColor: `${theme.textPrimary}10` }} />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <MiniPlayer />
      <TabBar />
    </motion.div>
  )
}
