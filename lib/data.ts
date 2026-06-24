export const USER = {
  name: 'Rakib Hasan',
  username: '@rakib_fxc',
  level: 12,
  xp: 5240,
  xpToNext: 8000,
  rank: 341,
  balance: 14098.5,
  todayEarned: 350.2,
  winRate: 70,
  streakDays: 76,
  verified: true,
  profileCompletion: 80,
}

export type Tx = {
  id: string
  type: 'sent' | 'received' | 'reward'
  title: string
  sub: string
  amount: number
  time: string
}

export const TRANSACTIONS: Tx[] = [
  { id: '1', type: 'received', title: 'Mining Reward', sub: 'Auto mining · Today', amount: 120, time: '2m' },
  { id: '2', type: 'sent', title: 'Sent to @nayeem', sub: 'Transfer · Today', amount: -250, time: '1h' },
  { id: '3', type: 'reward', title: 'Task Completed', sub: 'Follow on X · Today', amount: 50, time: '3h' },
  { id: '4', type: 'received', title: 'From @sadia', sub: 'Transfer · Yesterday', amount: 800, time: '1d' },
  { id: '5', type: 'reward', title: 'Daily Streak', sub: '7 day bonus', amount: 100, time: '1d' },
]

export type Task = {
  id: string
  title: string
  desc: string
  reward: number
  platform: 'telegram' | 'facebook' | 'twitter' | 'tiktok' | 'instagram' | 'mining' | 'app'
  done?: boolean
  progress?: number
}

export const TASKS: Task[] = [
  { id: 't1', title: 'Join Telegram Channel', desc: 'Join @FXC_official channel', reward: 80, platform: 'telegram' },
  { id: 't2', title: 'Follow on X (Twitter)', desc: 'Follow @FXC_network', reward: 50, platform: 'twitter', done: true },
  { id: 't3', title: 'Like on Facebook', desc: 'Like the FXC page', reward: 40, platform: 'facebook' },
  { id: 't4', title: 'Follow on TikTok', desc: 'Follow & watch latest reel', reward: 60, platform: 'tiktok' },
  { id: 't5', title: 'Follow on Instagram', desc: 'Follow @fxc.app', reward: 45, platform: 'instagram' },
  { id: 't6', title: 'Invite 5 Friends', desc: 'Earn for every referral', reward: 250, platform: 'app', progress: 60 },
]

export type Game = {
  id: string
  title: string
  tag: string
  players: string
  hot?: boolean
  soon?: boolean
}

export const GAMES: Game[] = [
  { id: 'g1', title: 'Tap Miner', tag: 'Clicker', players: '12.4k', hot: true },
  { id: 'g2', title: 'Lucky Spin', tag: 'Reward', players: '8.1k', hot: true },
  { id: 'g3', title: 'Coin Flip Duel', tag: 'PvP', players: '5.9k' },
  { id: 'g4', title: 'Quiz Battle', tag: 'Trivia', players: '3.2k' },
  { id: 'g5', title: 'Crash Rocket', tag: 'Multiplier', players: 'Soon', soon: true },
  { id: 'g6', title: 'Memory Match', tag: 'Puzzle', players: 'Soon', soon: true },
]

export const LEADERBOARD = [
  { rank: 1, name: 'CryptoKing', score: 98420, you: false },
  { rank: 2, name: 'Sadia_99', score: 87110, you: false },
  { rank: 3, name: 'NayeemX', score: 79550, you: false },
  { rank: 4, name: 'Tania', score: 64200, you: false },
  { rank: 5, name: 'Rakib Hasan', score: 52400, you: true },
]

export const CONTACTS = [
  { id: 'c1', name: 'Nayeem', username: '@nayeem', initial: 'N' },
  { id: 'c2', name: 'Sadia', username: '@sadia', initial: 'S' },
  { id: 'c3', name: 'Tania', username: '@tania', initial: 'T' },
  { id: 'c4', name: 'Arif', username: '@arif', initial: 'A' },
  { id: 'c5', name: 'Mim', username: '@mim', initial: 'M' },
]

export const BADGES = ['Early Bird', 'Top Miner', 'Streak Master', 'Social Star', 'Verified']

// Live earners feed (scrolls up on the dashboard)
export type Earner = {
  id: string
  name: string
  initial: string
  amount: number
  action: string
}

export const LIVE_EARNERS: Earner[] = [
  { id: 'e1', name: 'Sadia_99', initial: 'S', amount: 120, action: 'mined' },
  { id: 'e2', name: 'NayeemX', initial: 'N', amount: 50, action: 'task reward' },
  { id: 'e3', name: 'Tania', initial: 'T', amount: 250, action: 'referral' },
  { id: 'e4', name: 'CryptoKing', initial: 'C', amount: 80, action: 'mined' },
  { id: 'e5', name: 'Arif', initial: 'A', amount: 45, action: 'task reward' },
  { id: 'e6', name: 'Mim', initial: 'M', amount: 300, action: 'game win' },
  { id: 'e7', name: 'Rdx_77', initial: 'R', amount: 65, action: 'mined' },
  { id: 'e8', name: 'Lima', initial: 'L', amount: 95, action: 'streak bonus' },
]

// Daily update / announcement cards
export type Update = {
  id: string
  tag: string
  title: string
  desc: string
}

export const UPDATES: Update[] = [
  { id: 'u1', tag: 'NEW', title: 'Mining boost is live', desc: 'Earn 2x BILLS for the next 24 hours' },
  { id: 'u2', tag: 'EVENT', title: 'Weekend leaderboard', desc: 'Top 10 miners share a 50k BILLS pool' },
  { id: 'u3', tag: 'UPDATE', title: 'New referral rewards', desc: 'Get 250 BILLS for every friend you invite' },
]

// Profile feature buttons — some active, some coming soon
export type ProfileFeature = {
  id: string
  label: string
  sub: string
  icon: string
  soon?: boolean
}

export const PROFILE_FEATURES: ProfileFeature[] = [
  { id: 'pf1', label: 'My Wallet', sub: 'Balance & transfers', icon: 'wallet' },
  { id: 'pf2', label: 'Invite Friends', sub: 'Earn 250 BILLS each', icon: 'users' },
  { id: 'pf3', label: 'Boosters', sub: 'Speed up mining', icon: 'rocket' },
  { id: 'pf4', label: 'Achievements', sub: 'Badges & milestones', icon: 'award' },
  { id: 'pf5', label: 'NFT Collection', sub: 'Coming soon', icon: 'image', soon: true },
  { id: 'pf6', label: 'Staking', sub: 'Coming soon', icon: 'lock', soon: true },
  { id: 'pf7', label: 'Marketplace', sub: 'Coming soon', icon: 'store', soon: true },
  { id: 'pf8', label: 'Settings', sub: 'Account & security', icon: 'settings' },
]
