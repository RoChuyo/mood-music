'use client'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useMoodStore, moodThemes } from '@/store/useMoodStore'

const tabs = [
  { path: '/', label: '首页', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
  { path: '/playlist', label: '歌单', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
  { path: '/records', label: '记录', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { path: '/profile', label: '我的', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

export default function TabBar() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentMood } = useMoodStore()
  const theme = moodThemes[currentMood]

  if (pathname.startsWith('/player')) return null

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 pb-6 pt-2 backdrop-blur-xl"
      style={{ backgroundColor: `${theme.bg}F0`, maxWidth: 430, margin: '0 auto' }}
      animate={{ backgroundColor: `${theme.bg}F0` }}
      transition={{ duration: 0.8 }}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className="flex flex-col items-center gap-0.5 relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
            </svg>
            <span className="text-[10px]">{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute -bottom-1 w-1 h-1 rounded-full"
                style={{ backgroundColor: theme.primary }}
              />
            )}
            <style jsx>{`
              button { color: ${isActive ? theme.primary : '#999'} }
            `}</style>
          </button>
        )
      })}
    </motion.nav>
  )
}
