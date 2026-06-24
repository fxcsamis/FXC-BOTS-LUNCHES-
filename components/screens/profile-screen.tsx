'use client'

import { useEffect, useState } from 'react'
import {
  Award,
  BadgeCheck,
  ChevronRight,
  Crown,
  ImageIcon,
  Lock,
  Pencil,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Trophy,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import type { Screen } from '@/components/bottom-nav'
import { BADGES, LEADERBOARD, PROFILE_FEATURES, TRANSACTIONS, USER } from '@/lib/data'
import { formatBills } from '@/lib/format'

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  wallet: Wallet,
  users: Users,
  rocket: Rocket,
  award: Award,
  image: ImageIcon,
  lock: Lock,
  store: Store,
  settings: Settings,
}

// Which working features jump to another screen
const FEATURE_NAV: Record<string, Screen> = {
  pf1: 'home',
  pf2: 'tasks',
  pf3: 'mining',
}

export function ProfileScreen({ onNavigate }: { onNavigate?: (s: Screen) => void }) {
  const recentSent = TRANSACTIONS.filter((t) => t.type === 'sent').concat(
    TRANSACTIONS.filter((t) => t.type !== 'sent'),
  )
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 1800)
    return () => clearTimeout(t)
  }, [toast])

  function handleFeature(f: (typeof PROFILE_FEATURES)[number]) {
    if (f.soon) {
      setToast(`${f.label} is coming soon`)
      return
    }
    const dest = FEATURE_NAV[f.id]
    if (dest && onNavigate) {
      onNavigate(dest)
      return
    }
    setToast(`${f.label} opened`)
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.05 }}
      className="space-y-5 px-4"
    >
      {/* Header */}
      <motion.div variants={item} className="flex flex-col items-center pt-2 text-center">
        <div className="relative">
          <div className="size-20 overflow-hidden rounded-3xl ring-2 ring-primary/50">
            <Image
              src="/images/mascot.png"
              alt="Avatar"
              width={80}
              height={80}
              className="size-20 object-cover"
            />
          </div>
          <button className="glass absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full text-foreground">
            <Pencil className="size-3.5" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <h1 className="font-heading text-xl font-bold">{USER.name}</h1>
          {USER.verified && <BadgeCheck className="size-5 fill-primary text-background" />}
        </div>
        <p className="text-sm text-muted-foreground">{USER.username}</p>
      </motion.div>

      {/* Quick stats */}
      <motion.div variants={item} className="glass grid grid-cols-3 rounded-3xl p-4">
        <Stat icon={<Crown className="size-4 text-primary" />} value={`#${USER.rank}`} label="Rank" />
        <Stat
          icon={<Trophy className="size-4 text-primary" />}
          value={`${USER.winRate}%`}
          label="Win Rate"
          border
        />
        <Stat
          icon={<Award className="size-4 text-primary" />}
          value={`${USER.streakDays}`}
          label="Days"
        />
      </motion.div>

      {/* Profile completion / Verify */}
      <motion.div variants={item} className="glass rounded-3xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            <p className="text-sm font-semibold">Profile {USER.profileCompletion}% complete</p>
          </div>
          <button className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition active:scale-95">
            Verify now
          </button>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${USER.profileCompletion}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-primary"
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Verify to unlock withdrawals and a 500 BILLS bonus.
        </p>
      </motion.div>

      {/* Level progress */}
      <motion.div variants={item} className="glass rounded-3xl p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold">Level {USER.level}</span>
          <span className="text-muted-foreground tabular-nums">
            {formatBills(USER.xp)} / {formatBills(USER.xpToNext)} XP
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${(USER.xp / USER.xpToNext) * 100}%` }}
          />
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold">Badges</h2>
          <button className="text-xs font-medium text-primary">View all</button>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {BADGES.map((b) => (
            <div
              key={b}
              className="glass flex shrink-0 flex-col items-center gap-1.5 rounded-2xl px-4 py-3"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/15">
                <Award className="size-5 text-primary" />
              </span>
              <span className="text-[11px] font-medium">{b}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold">Leaderboard</h2>
          <button className="text-xs font-medium text-primary">Full list</button>
        </div>
        <div className="glass space-y-1 rounded-3xl p-2">
          {LEADERBOARD.map((row) => (
            <div
              key={row.rank}
              className={`flex items-center gap-3 rounded-2xl p-2.5 ${
                row.you ? 'bg-primary/15' : ''
              }`}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  row.rank <= 3 ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-muted-foreground'
                }`}
              >
                {row.rank}
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                {row.name[0]}
              </span>
              <p className={`flex-1 truncate text-sm ${row.you ? 'font-semibold text-primary' : 'font-medium'}`}>
                {row.name} {row.you && <span className="text-xs">(You)</span>}
              </p>
              <span className="font-mono text-sm font-semibold tabular-nums">
                {formatBills(row.score)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent sent coins */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="font-heading text-base font-semibold">Recent Transfers</h2>
        <div className="glass space-y-1 rounded-3xl p-2">
          {recentSent.slice(0, 4).map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 rounded-2xl p-2.5">
              <span
                className={`flex size-9 items-center justify-center rounded-xl ${
                  tx.amount < 0 ? 'bg-destructive/15 text-destructive' : 'bg-primary/15 text-primary'
                }`}
              >
                <ChevronRight className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{tx.title}</p>
                <p className="truncate text-xs text-muted-foreground">{tx.sub}</p>
              </div>
              <span
                className={`font-mono text-sm font-semibold tabular-nums ${
                  tx.amount < 0 ? 'text-destructive' : 'text-primary'
                }`}
              >
                {tx.amount < 0 ? '-' : '+'}
                {formatBills(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Feature buttons — some active, some coming soon */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold">More Features</h2>
          <span className="flex items-center gap-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" /> {PROFILE_FEATURES.filter((f) => !f.soon).length} active
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {PROFILE_FEATURES.map((f) => {
            const Icon = FEATURE_ICONS[f.icon] ?? Award
            return (
              <motion.button
                key={f.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleFeature(f)}
                className="glass relative flex items-center gap-2.5 overflow-hidden rounded-2xl p-3 text-left"
              >
                {f.soon && (
                  <span className="absolute right-2 top-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] font-semibold text-muted-foreground">
                    SOON
                  </span>
                )}
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                    f.soon ? 'bg-white/5 text-muted-foreground' : 'bg-primary/15 text-primary'
                  }`}
                >
                  <Icon className="size-[18px]" strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold leading-tight">{f.label}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{f.sub}</p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Sign out */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.98 }}
        onClick={() => setToast('Signed out')}
        className="w-full rounded-2xl bg-destructive/10 py-3 text-sm font-semibold text-destructive transition active:scale-95"
      >
        Sign Out
      </motion.button>

      {/* lightweight toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-strong fixed inset-x-0 bottom-24 z-40 mx-auto flex w-fit max-w-[80%] items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-2xl"
          >
            <Sparkles className="size-4 text-primary" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Stat({
  icon,
  value,
  label,
  border,
}: {
  icon: React.ReactNode
  value: string
  label: string
  border?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${
        border ? 'border-x border-white/10' : ''
      }`}
    >
      {icon}
      <span className="font-heading text-lg font-bold tabular-nums">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}
