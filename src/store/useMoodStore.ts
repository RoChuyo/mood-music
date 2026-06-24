import { create } from 'zustand'

export type Mood = 'happy' | 'sad' | 'angry' | 'relaxed'

export interface MoodTheme {
  primary: string
  primaryLight: string
  bg: string
  bgGradient: string
  cardBg: string
  cardBgAlpha: string
  accent: string
  textPrimary: string
  textSecondary: string
  label: string
  iconSrc: string
  coordinate: { x: number; y: number }
}

export const moodThemes: Record<Mood, MoodTheme> = {
  happy: {
    primary: '#75B01C',
    primaryLight: '#CAE5A3',
    bg: '#F9FFF0',
    bgGradient: 'linear-gradient(167deg, #F9FFF0 18%, #E9F8D3 36%, #FFFFFF 66%)',
    cardBg: '#E9F8D3',
    cardBgAlpha: 'rgba(233,248,211,0.5)',
    accent: '#75B01C',
    textPrimary: '#3A580E',
    textSecondary: 'rgba(58,88,14,0.7)',
    label: '开心',
    iconSrc: '/mood/happy.svg',
    coordinate: { x: 1, y: -2 },
  },
  sad: {
    primary: '#1C6FB0',
    primaryLight: '#A3C5E5',
    bg: '#F7FCFF',
    bgGradient: 'linear-gradient(171deg, #F7FCFF 18%, #EBF7FF 45%, #FFFFFF 99%)',
    cardBg: '#D3E8F8',
    cardBgAlpha: 'rgba(211,232,248,0.5)',
    accent: '#1C6FB0',
    textPrimary: '#0E3A58',
    textSecondary: 'rgba(14,58,88,0.7)',
    label: '悲伤',
    iconSrc: '/mood/sad.svg',
    coordinate: { x: -1, y: -2 },
  },
  angry: {
    primary: '#B01C3A',
    primaryLight: '#E5A3B3',
    bg: '#FFF0F3',
    bgGradient: 'linear-gradient(167deg, #FFF0F3 18%, #F8D3DB 36%, #FFFFFF 66%)',
    cardBg: '#F8D3DB',
    cardBgAlpha: 'rgba(248,211,219,0.5)',
    accent: '#B01C3A',
    textPrimary: '#580E1E',
    textSecondary: 'rgba(88,14,30,0.7)',
    label: '愤怒',
    iconSrc: '/mood/angry.svg',
    coordinate: { x: -1, y: 2 },
  },
  relaxed: {
    primary: '#B0961C',
    primaryLight: '#E5D9A3',
    bg: '#FFFBF0',
    bgGradient: 'linear-gradient(167deg, #FFFBF0 18%, #F8F0D3 36%, #FFFFFF 66%)',
    cardBg: '#F8F0D3',
    cardBgAlpha: 'rgba(248,240,211,0.5)',
    accent: '#B0961C',
    textPrimary: '#58480E',
    textSecondary: 'rgba(88,72,14,0.7)',
    label: '安逸',
    iconSrc: '/mood/relaxed.svg',
    coordinate: { x: 1, y: -2 },
  },
}

export interface Song {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  date: string
  duration: string
  mood: Mood
}

export interface MoodRecord {
  id: string
  songTitle: string
  artist: string
  mood: Mood
  date: string
  title?: string
  content?: string
  images?: string[]
}

interface MoodState {
  currentMood: Mood
  coordinatePosition: { x: number; y: number }
  currentSongIndex: number
  isPlaying: boolean
  showLyrics: boolean
  setMood: (mood: Mood) => void
  setCoordinatePosition: (pos: { x: number; y: number }) => void
  setCurrentSongIndex: (index: number) => void
  togglePlaying: () => void
  setIsPlaying: (playing: boolean) => void
  setShowLyrics: (show: boolean) => void
}

export const useMoodStore = create<MoodState>((set) => ({
  currentMood: 'happy',
  coordinatePosition: { x: 0.5, y: -0.5 },
  currentSongIndex: 0,
  isPlaying: false,
  showLyrics: false,
  setMood: (mood) => set({ currentMood: mood }),
  setCoordinatePosition: (pos) => set({ coordinatePosition: pos }),
  setCurrentSongIndex: (index) => set({ currentSongIndex: index }),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setShowLyrics: (show) => set({ showLyrics: show }),
}))
