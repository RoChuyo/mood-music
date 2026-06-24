import { Song, MoodRecord, Mood } from '@/store/useMoodStore'

export const songsByMood: Record<Mood, Song[]> = {
  happy: [
    { id: 'h1', title: '稻香', artist: '周杰伦', album: '魔杰座', cover: '/covers/daoxiang.jpg', date: '2026.5.24', duration: '03:43', mood: 'happy', lyrics: ['对这个世界如果你有太多的抱怨', '跌倒了就不敢继续往前走', '为什么人要这么的脆弱 堕落', '请你打开电视看看', '多少人为生命在努力勇敢的走下去', '我们是不是该知足', '珍惜一切 就算没有拥有', '', '还记得你说家是唯一的城堡', '随着稻香河流继续奔跑', '微微笑 小时候的梦我知道', '不要哭让萤火虫带着你逃跑', '乡间的歌谣永远的依靠', '回家吧 回到最初的美好'] },
    { id: 'h2', title: '小幸运', artist: '田馥甄', album: '小幸运 - Single', cover: '/covers/xiaoxingyun.jpg', date: '2026.5.25', duration: '04:36', mood: 'happy', lyrics: ['我听见雨滴落在青青草地', '我听见远方下课钟声响起', '可是我没有听见你的声音', '认真呼唤我姓名', '爱上你的时候还不懂感情', '离别了才觉得刻骨铭心', '为什么没有发现遇见了你', '是生命最好的事情'] },
    { id: 'h3', title: '爱你', artist: '王心凌', album: 'My! Cyndi!', cover: '/covers/aini.jpg', date: '2026.5.26', duration: '03:24', mood: 'happy' },
    { id: 'h4', title: '日不落', artist: '蔡依林', album: '特务J', cover: '/covers/ribuluo.jpg', date: '2026.5.27', duration: '03:52', mood: 'happy' },
    { id: 'h5', title: '快乐崇拜', artist: '潘玮柏&张韶涵', album: 'Wu Ha', cover: '/covers/kuaile.jpg', date: '2026.5.28', duration: '04:01', mood: 'happy' },
  ],
  sad: [
    { id: 's1', title: '可惜不是你', artist: '梁静茹', album: '丝路', cover: '/covers/kexi.jpg', date: '2026.6.5', duration: '04:58', mood: 'sad', lyrics: ['这一刻突然觉得好熟悉', '像昨天今天同时在放映', '我这才发现不是我不快乐', '只是我仍然活在过去', '那些美丽的小插曲', '是你给我最好的事情', '可惜不是你 陪我到最后', '曾坐在我身后的那个女孩'] },
    { id: 's2', title: '好久不见', artist: '陈奕迅', album: '认了吧', cover: '/covers/haojiubujian.jpg', date: '2026.6.6', duration: '03:30', mood: 'sad' },
    { id: 's3', title: '我不难过', artist: '林宥嘉', album: '感官/世界', cover: '/covers/wobunanguo.jpg', date: '2026.6.7', duration: '04:22', mood: 'sad' },
    { id: 's4', title: '搁浅', artist: '周杰伦', album: '七里香', cover: '/covers/geqian.jpg', date: '2026.6.8', duration: '04:29', mood: 'sad', lyrics: ['雨声停在窗边', '回忆缓慢经过', '呼吸跟着节拍变轻', '先让这一刻安静下来', '不急着回答所有问题', '灯光会一点点亮起', '下一首歌正在靠近'] },
    { id: 's5', title: '勇气', artist: '周杰伦', album: '七里香', cover: '/covers/yongqi.jpg', date: '2026.6.9', duration: '04:15', mood: 'sad' },
  ],
  angry: [
    { id: 'a1', title: '怒放的生命', artist: '汪峰', album: '怒放的生命 - Single', cover: '/covers/nufang.jpg', date: '2026.6.17', duration: '04:45', mood: 'angry', lyrics: ['曾经多少次跌倒在路上', '曾经多少次折断过翅膀', '如今我已不再感到彷徨', '我想超越这平凡的生活', '我想要怒放的生命', '就像飞翔在辽阔天空', '就像穿行在无边的旷野', '拥有挣脱一切的力量'] },
    { id: 'a2', title: '无地自容', artist: '黑豹乐队', album: '黑豹', cover: '/covers/wudi.jpg', date: '2026.6.18', duration: '05:12', mood: 'angry' },
    { id: 'a3', title: '海阔天空', artist: 'Beyond', album: '乐与怒', cover: '/covers/haikuo.jpg', date: '2026.6.19', duration: '05:26', mood: 'angry' },
    { id: 'a4', title: '天高地厚', artist: '信乐团', album: '天高地厚', cover: '/covers/tiangao.jpg', date: '2026.6.20', duration: '04:38', mood: 'angry' },
    { id: 'a5', title: '晴天', artist: '周杰伦', album: '叶惠美', cover: '/covers/qingtian.jpg', date: '2026.6.21', duration: '04:29', mood: 'angry' },
  ],
  relaxed: [
    { id: 'r1', title: '旅行的意义', artist: '陈绮贞', album: '华丽的冒险', cover: '/covers/lvxing.jpg', date: '2026.5.18', duration: '03:50', mood: 'relaxed', lyrics: ['你看过了许多美景', '你看过了许多美女', '你迷失在地图上每一道短暂的光阴', '你品尝了夜的巴黎', '你踏过下雪的北京', '你熟记书本里每一句你最爱的真理', '却说不出你爱我的原因', '却说不出在什么场合我曾让你动心'] },
    { id: 'r2', title: '贝加尔湖畔', artist: '李健', album: '依然', cover: '/covers/beijiahu.jpg', date: '2026.5.19', duration: '05:08', mood: 'relaxed' },
    { id: 'r3', title: '慢慢喜欢你', artist: '莫文蔚', album: '我们在中场相遇', cover: '/covers/manman.jpg', date: '2026.5.20', duration: '04:22', mood: 'relaxed' },
    { id: 'r4', title: '奇妙能力歌', artist: '陈粒', album: '小梦大半', cover: '/covers/qimiao.jpg', date: '2026.5.21', duration: '03:55', mood: 'relaxed' },
    { id: 'r5', title: '遇见', artist: '孙燕姿', album: '一刻', cover: '/covers/yujian.jpg', date: '2026.5.22', duration: '04:10', mood: 'relaxed' },
  ],
}

export const moodRecords: MoodRecord[] = [
  { id: 'rec1', songTitle: '旅行的意义', artist: '陈绮贞', mood: 'relaxed', date: '2026.6.17', title: '安逸的午后', content: '今天下午阳光正好' },
  { id: 'rec2', songTitle: '好久不见', artist: '陈奕迅', mood: 'sad', date: '2026.6.16', title: '想念远方', content: '突然想起老朋友' },
  { id: 'rec3', songTitle: '怒放的生命', artist: '汪峰', mood: 'angry', date: '2026.6.15', title: '冲劲十足', content: '今天的健身特别有力' },
  { id: 'rec4', songTitle: '红豆', artist: '王菲', mood: 'relaxed', date: '2026.6.14', title: '平静时光', content: '慢慢品味生活' },
  { id: 'rec5', songTitle: '说谎', artist: '林宥嘉', mood: 'sad', date: '2026.6.13', title: '雨天心情', content: '窗外的雨声' },
  { id: 'rec6', songTitle: '日不落', artist: '蔡依林', mood: 'happy', date: '2026.6.12', title: '快乐的一天', content: '和朋友一起出去玩' },
  { id: 'rec7', songTitle: '海阔天空', artist: 'Beyond', mood: 'angry', date: '2026.6.11', title: '不服输', content: '面对困难不退缩' },
  { id: 'rec8', songTitle: '慢慢喜欢你', artist: '莫文蔚', mood: 'relaxed', date: '2026.6.10', title: '心安', content: '安静地待着' },
  { id: 'rec9', songTitle: '淘汰', artist: '陈奕迅', mood: 'sad', date: '2026.6.9', title: '释然', content: '有些事情要学会放下' },
  { id: 'rec10', songTitle: '小半', artist: '陈粒', mood: 'relaxed', date: '2026.6.8', title: '闲暇', content: '听歌发呆的下午' },
  { id: 'rec11', songTitle: '可惜不是你', artist: '梁静茹', mood: 'sad', date: '2026.6.7', title: '遗憾', content: '有些遗憾注定无法弥补' },
  { id: 'rec12', songTitle: '稻香', artist: '周杰伦', mood: 'happy', date: '2026.6.6', title: '童年回忆', content: '听到这首歌就想起小时候' },
  { id: 'rec13', songTitle: '遇见', artist: '孙燕姿', mood: 'relaxed', date: '2026.6.5', title: '美好邂逅', content: '今天遇到了一件开心的事' },
  { id: 'rec14', songTitle: '搁浅', artist: '周杰伦', mood: 'sad', date: '2026.6.4', title: '搁浅的心', content: '有些感情只能留在记忆里' },
  { id: 'rec15', songTitle: '逆战', artist: '张杰', mood: 'angry', date: '2026.6.3', title: '战斗力满满', content: '今天的状态特别好' },
  { id: 'rec16', songTitle: '小幸运', artist: '田馥甄', mood: 'happy', date: '2026.6.1', title: '幸运日', content: '感觉今天运气特别好' },
]

export const aiMessages: Record<Mood, string> = {
  happy: '不用立刻变好，先让心安静下来',
  sad: '先允许自己难过，再慢慢呼吸',
  angry: '先允许自己难过，再慢慢呼吸',
  relaxed: '不用立刻变好，先让心安静下来',
}
