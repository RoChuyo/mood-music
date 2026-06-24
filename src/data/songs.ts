import { Song, MoodRecord, Mood } from '@/store/useMoodStore'

// All song data + album covers sourced directly from the Figma design file
export const songsByMood: Record<Mood, Song[]> = {
  happy: [
    { id: 'h1', title: '稻香', artist: '周杰伦', album: '魔杰座', cover: '/covers/daoxiang.jpg', date: '2026.5.24', duration: '03:43', mood: 'happy' },
    { id: 'h2', title: '小幸运', artist: '田馥甄', album: '小幸运 - Single', cover: '/covers/xiaoxingyun.jpg', date: '2026.5.25', duration: '04:36', mood: 'happy' },
    { id: 'h3', title: '爱你', artist: '王心凌', album: 'My! Cyndi!', cover: '/covers/aini.jpg', date: '2026.5.26', duration: '03:24', mood: 'happy' },
    { id: 'h4', title: '日不落', artist: '蔡依林', album: '特务J', cover: '/covers/ribuluo.jpg', date: '2026.5.27', duration: '03:52', mood: 'happy' },
    { id: 'h5', title: '快乐崇拜', artist: '潘玮柏&张韶涵', album: 'Wu Ha', cover: '/covers/kuaile.jpg', date: '2026.5.28', duration: '04:01', mood: 'happy' },
    { id: 'h6', title: '有点甜', artist: '汪苏泷&BY2', album: '万有引力', cover: '/covers/youdiantian.jpg', date: '2026.5.29', duration: '03:48', mood: 'happy' },
  ],
  sad: [
    { id: 's1', title: '搁浅', artist: '周杰伦', album: '七里香', cover: '/covers/geqian.jpg', date: '2026.6.11', duration: '04:29', mood: 'sad' },
    { id: 's2', title: '可惜不是你', artist: '梁静茹', album: '丝路', cover: '/covers/kexibushini.jpg', date: '2026.6.12', duration: '04:58', mood: 'sad' },
    { id: 's3', title: '好久不见', artist: '陈奕迅', album: '认了吧', cover: '/covers/haojiubujian.jpg', date: '2026.6.13', duration: '03:30', mood: 'sad' },
    { id: 's4', title: '我不难过', artist: '孙燕姿', album: '未完成', cover: '/covers/wobunanguo.jpg', date: '2026.6.14', duration: '04:22', mood: 'sad' },
    { id: 's5', title: '说谎', artist: '林宥嘉', album: '感官/世界', cover: '/covers/shuohuang.jpg', date: '2026.6.15', duration: '04:05', mood: 'sad' },
    { id: 's6', title: '勇气', artist: '梁静茹', album: '勇气', cover: '/covers/yongqi.jpg', date: '2026.6.16', duration: '04:15', mood: 'sad' },
  ],
  angry: [
    { id: 'a1', title: '逆战', artist: '张杰', album: 'One Chance', cover: '/covers/nizhan.jpg', date: '2026.6.17', duration: '03:58', mood: 'angry' },
    { id: 'a2', title: '怒放的生命', artist: '汪峰', album: '怒放的生命 - Single', cover: '/covers/nufang.jpg', date: '2026.6.18', duration: '04:45', mood: 'angry' },
    { id: 'a3', title: '无地自容', artist: '黑豹乐队', album: '黑豹', cover: '/covers/wudizirong.jpg', date: '2026.6.19', duration: '05:12', mood: 'angry' },
    { id: 'a4', title: '离歌', artist: '信乐团', album: '天高地厚', cover: '/covers/liige.jpg', date: '2026.6.20', duration: '04:38', mood: 'angry' },
    { id: 'a5', title: '海阔天空', artist: 'Beyond', album: '乐与怒', cover: '/covers/haikuotiankong.jpg', date: '2026.6.21', duration: '05:26', mood: 'angry' },
    { id: 'a6', title: '倔强', artist: '五月天', album: '神的孩子都在跳舞', cover: '/covers/juejiang.jpg', date: '2026.6.22', duration: '04:01', mood: 'angry' },
  ],
  relaxed: [
    { id: 'r1', title: '旅行的意义', artist: '陈绮贞', album: '华丽的冒险', cover: '/covers/lvxing.jpg', date: '2026.5.30', duration: '03:50', mood: 'relaxed' },
    { id: 'r2', title: '小半', artist: '陈粒', album: '小梦大半', cover: '/covers/xiaoban.jpg', date: '2026.5.31', duration: '03:55', mood: 'relaxed' },
    { id: 'r3', title: '贝加尔湖畔', artist: '李健', album: '依然', cover: '/covers/beijiaerhupan.jpg', date: '2026.6.1', duration: '05:08', mood: 'relaxed' },
    { id: 'r4', title: '红豆', artist: '王菲', album: '唱游', cover: '/covers/hongdou.jpg', date: '2026.6.2', duration: '04:18', mood: 'relaxed' },
    { id: 'r5', title: '慢慢喜欢你', artist: '莫文蔚', album: '我们在中场相遇', cover: '/covers/manman.jpg', date: '2026.6.3', duration: '04:22', mood: 'relaxed' },
    { id: 'r6', title: '遇见', artist: '孙燕姿', album: '这一刻', cover: '/covers/yujian.jpg', date: '2026.6.4', duration: '04:10', mood: 'relaxed' },
  ],
}

// Helper to look up a song's cover by title for record cards
const allSongs = Object.values(songsByMood).flat()
export const coverForTitle = (title: string): string =>
  allSongs.find((s) => title.includes(s.title) || s.title.includes(title))?.cover ?? '/covers/daoxiang.jpg'

// Record entries shown on the 记录 page (song-artist label + mood + date)
export const moodRecords: MoodRecord[] = [
  { id: 'rec1', songTitle: '晴天', artist: '周杰伦', mood: 'happy', date: '2026.6.22', title: '晴朗的一天', content: '阳光正好，微风不燥', cover: '/covers/daoxiang.jpg' },
  { id: 'rec2', songTitle: '搁浅', artist: '周杰伦', mood: 'sad', date: '2026.6.21', title: '搁浅的心', content: '有些感情只能留在记忆里', cover: '/covers/geqian.jpg' },
  { id: 'rec3', songTitle: '第一天', artist: '孙燕姿', mood: 'relaxed', date: '2026.6.20', title: '新的开始', content: '慢慢品味生活', cover: '/covers/yujian.jpg' },
  { id: 'rec4', songTitle: '怒放的生命', artist: '汪峰', mood: 'angry', date: '2026.6.19', title: '冲劲十足', content: '今天的状态特别好', cover: '/covers/nufang.jpg' },
  { id: 'rec5', songTitle: '小幸运', artist: '田馥甄', mood: 'happy', date: '2026.6.18', title: '幸运日', content: '感觉今天运气特别好', cover: '/covers/xiaoxingyun.jpg' },
  { id: 'rec6', songTitle: '好久不见', artist: '陈奕迅', mood: 'sad', date: '2026.6.17', title: '想念远方', content: '突然想起老朋友', cover: '/covers/haojiubujian.jpg' },
  { id: 'rec7', songTitle: '旅行的意义', artist: '陈绮贞', mood: 'relaxed', date: '2026.6.16', title: '安逸的午后', content: '今天下午阳光正好', cover: '/covers/lvxing.jpg' },
  { id: 'rec8', songTitle: '海阔天空', artist: 'Beyond', mood: 'angry', date: '2026.6.15', title: '不服输', content: '面对困难不退缩', cover: '/covers/haikuotiankong.jpg' },
  { id: 'rec9', songTitle: '日不落', artist: '蔡依林', mood: 'happy', date: '2026.6.14', title: '快乐的一天', content: '和朋友一起出去玩', cover: '/covers/ribuluo.jpg' },
  { id: 'rec10', songTitle: '说谎', artist: '林宥嘉', mood: 'sad', date: '2026.6.13', title: '释然', content: '有些事情要学会放下', cover: '/covers/shuohuang.jpg' },
  { id: 'rec11', songTitle: '慢慢喜欢你', artist: '莫文蔚', mood: 'relaxed', date: '2026.6.12', title: '心安', content: '安静地待着', cover: '/covers/manman.jpg' },
  { id: 'rec12', songTitle: '逆战', artist: '张杰', mood: 'angry', date: '2026.6.11', title: '战斗力满满', content: '今天的状态特别好', cover: '/covers/nizhan.jpg' },
  { id: 'rec13', songTitle: '爱你', artist: '王心凌', mood: 'happy', date: '2026.6.10', title: '甜甜的', content: '今天心情很甜', cover: '/covers/aini.jpg' },
  { id: 'rec14', songTitle: '可惜不是你', artist: '梁静茹', mood: 'sad', date: '2026.6.9', title: '遗憾', content: '有些遗憾注定无法弥补', cover: '/covers/kexibushini.jpg' },
  { id: 'rec15', songTitle: '红豆', artist: '王菲', mood: 'relaxed', date: '2026.6.8', title: '平静时光', content: '慢慢品味生活', cover: '/covers/hongdou.jpg' },
  { id: 'rec16', songTitle: '无地自容', artist: '黑豹乐队', mood: 'angry', date: '2026.6.7', title: '释放', content: '把压力都释放出来', cover: '/covers/wudizirong.jpg' },
]

// Personal playlist — different songs from the Figma 个人歌单 view
export const personalSongs: Song[] = [
  { id: 'p1', title: '关于我在地铁上莫名其妙...', artist: '孙天宇', album: '个人单曲', cover: '/covers/xiaoxingyun.jpg', date: '2026.6.22', duration: '03:28', mood: 'happy' },
  { id: 'p2', title: '坏天气', artist: '孙燕姿', album: '是时候', cover: '/covers/yujian.jpg', date: '2026.6.22', duration: '04:12', mood: 'relaxed' },
  { id: 'p3', title: '越来越不懂', artist: '蔡健雅', album: 'Goodbye & Hello', cover: '/covers/manman.jpg', date: '2026.6.22', duration: '04:35', mood: 'sad' },
  { id: 'p4', title: '鲜花', artist: '回春丹', album: '鲜花', cover: '/covers/kuaile.jpg', date: '2026.6.22', duration: '03:45', mood: 'happy' },
  { id: 'p5', title: '万物盛开法则', artist: '大张伟', album: '万物盛开法则', cover: '/covers/ribuluo.jpg', date: '2026.6.22', duration: '03:52', mood: 'happy' },
  { id: 'p6', title: '第一天', artist: '孙燕姿', album: '第一天', cover: '/covers/diyitian.jpg', date: '2026.6.22', duration: '04:10', mood: 'relaxed' },
]

export const aiMessages: Record<Mood, string> = {
  happy: '不用立刻变好，先让心安静下来',
  sad: '先允许自己难过，再慢慢呼吸',
  angry: '先允许自己难过，再慢慢呼吸',
  relaxed: '不用立刻变好，先让心安静下来',
}
