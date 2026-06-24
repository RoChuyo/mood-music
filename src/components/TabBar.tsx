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
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{ maxWidth: 430, margin: '0 auto' }}
    >
      <div
        className="relative h-[87px] w-full bg-contain bg-no-repeat bg-bottom"
        style={{ backgroundImage: `url(/ui/tab-bg.svg)` }}
      >
        <motion.div
          className="absolute top-0 left-0 h-[3px]"
          style={{ width: 243 }}
          animate={{ backgroundColor: theme.primary }}
          transition={{ duration: 0.8 }}
        />
        <div className="flex items-start justify-around pt-[19px] px-[6%]">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path
            return (
              <button
                key={tab.path}
                onClick={() => router.push(tab.path)}
                className="flex flex-col items-center gap-1 w-[52px] h-[49px]"
              >
                <img
                  src={tab.icon}
                  alt={tab.label}
                  className="w-6 h-6"
                  style={{ opacity: isActive ? 1 : 0.5 }}
                />
                <span
                  className="text-[10px] tracking-[-0.24px]"
                  style={{
                    color: theme.textPrimary,
                    fontFamily: "'PingFang SC', 'PingFang HK', sans-serif",
                    fontWeight: 500,
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tab-dot"
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
