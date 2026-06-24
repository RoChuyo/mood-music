'use client'

interface StatusBarProps {
  color?: string
}

// iOS status bar (9:41 + cellular/wifi/battery) matching Figma frames
export default function StatusBar({ color = '#000000' }: StatusBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 h-[44px] z-[60] pointer-events-none">
      <div className="flex items-center justify-between h-[17px] mt-[15px] px-[21px]">
        {/* Time */}
        <span
          className="text-[14px] tracking-[-0.28px] font-semibold leading-none"
          style={{ color, fontFamily: "-apple-system, 'SF Pro Text', sans-serif", width: 54, textAlign: 'center' }}
        >
          9:41
        </span>
        {/* Right icons */}
        <div className="flex items-center gap-[5px]">
          {/* Cellular */}
          <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
            <rect x="0" y="7" width="3" height="4" rx="1" fill={color} />
            <rect x="5" y="5" width="3" height="6" rx="1" fill={color} />
            <rect x="10" y="2.5" width="3" height="8.5" rx="1" fill={color} />
            <rect x="15" y="0" width="3" height="11" rx="1" fill={color} />
          </svg>
          {/* Wifi */}
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <path d="M8 2.2c2.4 0 4.6 0.9 6.3 2.5 0.2 0.2 0.5 0.2 0.7 0L16 3.7c0.2-0.2 0.2-0.5 0-0.7C13.9 1 11 0 8 0 5 0 2.1 1 0 3c-0.2 0.2-0.2 0.5 0 0.7l1 1c0.2 0.2 0.5 0.2 0.7 0C3.4 3.1 5.6 2.2 8 2.2z" fill={color} />
            <path d="M8 5.5c1.3 0 2.5 0.5 3.4 1.4 0.2 0.2 0.5 0.2 0.7 0l1-1c0.2-0.2 0.2-0.5 0-0.7C11.8 3.9 10 3.1 8 3.1S4.2 3.9 2.9 5.2c-0.2 0.2-0.2 0.5 0 0.7l1 1c0.2 0.2 0.5 0.2 0.7 0C5.5 6 6.7 5.5 8 5.5z" fill={color} />
            <path d="M8 8c0.6 0 1.1 0.2 1.5 0.6 0.2 0.2 0.5 0.2 0.7 0l1.1-1.1c0.2-0.2 0.2-0.5 0-0.7C11.4 6 9.8 5.3 8 5.3S4.6 6 3.7 6.8c-0.2 0.2-0.2 0.5 0 0.7l1.1 1.1c0.2 0.2 0.5 0.2 0.7 0C5.9 8.2 6.4 8 8 8z" fill={color} opacity="0.5" />
            <path d="M8 8c0.6 0 1.1 0.2 1.5 0.6L8 10.2 6.5 8.6C6.9 8.2 7.4 8 8 8z" fill={color} />
          </svg>
          {/* Battery */}
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={color} strokeOpacity="0.35" fill="none" />
            <rect x="2" y="2" width="18" height="8" rx="1.5" fill={color} />
            <path d="M23 4v4c0.8-0.3 1.3-1.1 1.3-2S23.8 4.3 23 4z" fill={color} fillOpacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  )
}
