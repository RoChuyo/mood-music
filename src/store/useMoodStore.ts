import { create } from 'zustand'

export type Mood = 'happy' | 'sad' | 'angry' | 'relaxed'

export interface MoodTheme {
  primary: string
  primaryLight: string
  bg: string
  bgGradient: string
  cardBg: string
  accent: string
  label: string
  icon: string
  coordinate: { x: number; y: number }
}

export const moodThemes: Record<Mood, MoodTheme> = {
  happy: {
    primary: '#6B8F3C',
    primaryLight: '#8DB255',
    bg: '#F0F5E8',
    bgGradient: 'linear-gradient(180deg, #E8F0D8 0%, #F5F8EF 100%)',
    cardBg: '#E8F0D8',
    accent: '#6B8F3C',
    label: '开心',
    icon: '☀️',
    coordinate: { x: 1, y: -2 },
  },
  sad: {
    primary: '#5B8EA6',
    primaryLight: '#7BACC2',
    bg: '#E8F0F5',
    bgGradient: 'linear-gradient(180deg, #D8E8F0 0%, #EFF5F8 100%)',
    cardBg: '#D8E8F0',
    accent: '#5B8EA6',
    label: '悲伤',
    icon: '🌊',
    coordinate: { x: -1, y: -2 },
  },
  angry: {
    primary: '#C45B5B',
    primaryLight: '#D88080',
    bg: '#F5E8E8',
    bgGradient: 'linear-gradient(180deg, #F0D8D8 0%, #F8EFEF 100%)',
    cardBg: '#F0D8D8',
    accent: '#C45B5B',
    label: '愤怒',
    icon: '🔥',
    coordinate: { x: -1, y: 2 },
  },
  relaxed: {
    primary: '#B8963C',
    primaryLight: '#D4B45F',
    bg: '#F5F0E0',
    bgGradient: 'linear-gradient(180deg, #F0E8D0 0%, #F8F5E8 100%)',
    cardBg: '#F0E8D0',
    accent: '#B8963C',
    label: '安逸',
    icon: '🌙',
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
  lyrics?: string[]
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
