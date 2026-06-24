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
  const recentRecords = moodRecords.slice(0, 1)

  return (
    <motion.div
      className="flex flex-col min-h-full"
      style={{ backgroundColor: '#F7FFEB' }}
    >
      {/* Cover photo - 466px tall, with gradient overlay */}
      <div className="relative h-[466px] w-full overflow-hidden">
        <img src="/covers/profile-cover.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-[253px]" style={{ background: 'linear-gradient(to bottom, rgba(217,217,217,0), #4a6525)' }} />

        {/* Header text */}
        <p className="absolute top-[64px] left-[22px] text-[24px] font-semibold text-white leading-[1.5]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>个人主页</p>

        {/* Add button */}
        <motion.button
          className="absolute top-[64px] right-[22px] w-[28px] h-[28px] rounded-full flex items-center justify-center"
          animate={{ backgroundColor: theme.primary }}
        >
          <svg className="w-[14px] h-[14px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </motion.button>

        {/* Avatar - 49x49 */}
        <img src="/ui/avatar-bordered.png" alt="" className="absolute bottom-[110px] left-[11px] w-[49px] h-[49px]" />

        {/* Username + mood */}
        <div className="absolute bottom-[30px] left-[16px]">
          <h2 className="text-[32px] font-semibold text-white leading-normal" style={{ fontFamily: "'PingFang SC', sans-serif" }}>用户名</h2>
          <div className="flex items-center gap-[4px] mt-[2px]">
            <img src={theme.iconSrc} alt="" className="w-[20px] h-[20px]" />
            <p className="text-[14px] font-bold text-white leading-[1.5]" style={{ fontFamily: "'Oxygen', sans-serif" }}>{theme.label}</p>
          </div>
        </div>
      </div>

      <div className="px-[16px] mt-[30px]">
        {/* HRV section */}
        <div className="flex items-baseline gap-[8px] mb-[8px]">
          <p className="text-[18px] font-semibold opacity-80" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>心迹趋势波动</p>
          <span className="text-[15px] opacity-80" style={{ color: `${theme.textPrimary}80`, fontFamily: "'Inter', sans-serif" }}>HRV</span>
        </div>

        {/* HRV chart card - glass */}
        <motion.div
          className="rounded-[20px] p-[16px] mb-[24px] opacity-80"
          style={{
            backgroundColor: '#EEFADC',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div className="h-[110px] relative">
            <svg className="w-full h-full" viewBox="0 0 340 110">
              {/* Grid dots and line */}
              {[
                { x: 40, y: 55 }, { x: 90, y: 40 }, { x: 140, y: 60 },
                { x: 190, y: 45 }, { x: 230, y: 35 }, { x: 240, y: 50 },
                { x: 290, y: 55 },
              ].map((p, i, arr) => (
                <g key={i}>
                  <line x1={p.x} y1={p.y} x2={p.x} y2={100} stroke={`${theme.primary}40`} strokeWidth={3} strokeLinecap="round" />
                  <circle cx={p.x} cy={p.y} r={4.5} fill={theme.primary} opacity={0.8} />
                  {i < arr.length - 1 && (
                    <line x1={p.x} y1={p.y} x2={arr[i + 1].x} y2={arr[i + 1].y}
                      stroke={`${theme.primary}60`} strokeWidth={2} strokeLinecap="round" />
                  )}
                </g>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Recent records */}
        <p className="text-[18px] font-semibold opacity-80 mb-[12px]" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>最近记录</p>
        <div className="space-y-[12px] mb-[24px]">
          {recentRecords.map((record) => {
            const rTheme = moodThemes[record.mood]
            return (
              <div key={record.id} className="rounded-t-[5.6px] overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                {/* Header bar */}
                <div className="px-[12px] py-[8px] flex items-center justify-between" style={{ backgroundColor: `rgba(75,109,0,0.5)` }}>
                  <div className="flex items-center gap-[4px]">
                    <img src={rTheme.iconSrc} alt="" className="w-[14px] h-[14px]" />
                    <span className="text-[12px] text-white font-semibold leading-[1.5]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>
                      第一天-孙燕姿
                    </span>
                  </div>
                  <span className="text-[9.3px] text-white leading-[1.5]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>2026.6.22 星期一</span>
                </div>
                {/* Content */}
                <div className="p-[12px] flex items-start gap-[12px]" style={{ backgroundColor: '#ECF9D8' }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-[18px] font-semibold leading-[1.5]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>标题</p>
                    <p className="text-[13px] font-semibold leading-[1.5]" style={{ fontFamily: "'PingFang HK', sans-serif" }}>记录的具体内容</p>
                  </div>
                  <div className="w-[86px] h-[84px] rounded-[4px] overflow-hidden flex-shrink-0" style={{ boxShadow: '-11px 4px 2.1px -3px rgba(0,0,0,0.25)' }}>
                    <img src="/covers/record-detail.jpg" alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recently played */}
        <p className="text-[18px] font-semibold opacity-80 mb-[12px]" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>最近在听</p>
        <motion.div className="rounded-[20px] overflow-hidden" animate={{ backgroundColor: theme.cardBgAlpha }} transition={{ duration: 0.8 }}>
          <div className="py-[7px]">
            {recentSongs.map((song, i) => (
              <div key={song.id}>
                <div className="flex items-center px-[8px]">
                  <div className="w-[67px] h-[67px] rounded-[10px] flex-shrink-0 overflow-hidden">
                    <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 ml-[23px]">
                    <p className="text-[18px] font-medium leading-normal truncate" style={{ color: theme.textPrimary, fontFamily: "'PingFang SC', sans-serif" }}>{song.title}</p>
                    <p className="text-[14px] leading-normal truncate" style={{ color: theme.textSecondary, fontFamily: "'PingFang SC', sans-serif" }}>{song.artist}</p>
                    <p className="text-[14px] leading-[1.5]" style={{ color: `${theme.textPrimary}80`, fontFamily: "'PingFang HK', sans-serif" }}>2026.6.22 星期一</p>
                  </div>
                  <button className="flex-shrink-0 w-[28px] h-[28px]">
                    <img src="/icons/play-btn.svg" alt="play" className="w-full h-full" />
                  </button>
                </div>
                {i < recentSongs.length - 1 && <div className="ml-[98px] h-px" style={{ backgroundColor: `${theme.textPrimary}12` }} />}
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
