'use client'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useMoodStore, moodThemes } from '@/store/useMoodStore'

const tabs = [
  { path: '/', label: '首页', icon: '/icons/home.svg' },
  { path: '/playlist', label: '歌单', icon: '/icons/playlist.svg' },
  { path: '/records', label: '记录', icon: '/icons/record.svg' },
  { path: '/profile', label: '我的', icon: '/icons/profile.svg' },
]

export default function TabBar() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentMood } = useMoodStore()
  const theme = moodThemes[currentMood]

  if (pathname.startsWith('/player')) return null

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 mx-auto h-[87px] overflow-hidden"
      style={{ maxWidth: 402 }}
    >
      {/* Glass background */}
      <div className="absolute inset-0" style={{
        backgroundColor: 'rgba(240,245,232,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }} />

      {/* Active indicator line */}
      <motion.div
        className="absolute top-0 left-0 h-[3px]"
        style={{ width: 243 }}
        animate={{ backgroundColor: theme.primary }}
        transition={{ duration: 0.8 }}
      />

      {/* Tab items */}
      <div className="relative flex items-start justify-around pt-[19px] px-[6.13%]">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className="flex flex-col items-center w-[51.5px] h-[49px]"
            >
              <img
                src={tab.icon}
                alt={tab.label}
                className="w-[24px] h-[24px]"
                style={{ opacity: isActive ? 1 : 0.4 }}
              />
              <span
                className="mt-[5px] text-[10px] tracking-[-0.24px] leading-normal"
                style={{
                  color: theme.textPrimary,
                  fontFamily: "'PingFang HK', 'PingFang SC', sans-serif",
                  fontWeight: 500,
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
