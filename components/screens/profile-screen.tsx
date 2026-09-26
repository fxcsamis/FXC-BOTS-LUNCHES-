'use client'

import { useEffect, useState } from 'react'
import {
  Award,
  BadgeCheck,
  ChevronRight,
  Code2,
  Crown,
  ImageIcon,
  Lock,
  MessageCircle,
  Rocket,
  Send,
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
  settings: Code2,
}

// Which working features jump to another screen
const FEATURE_NAV: Record<string, Screen> = {
  pf1: 'home',
  pf2: 'invite',
  pf3: 'mining',
}

export function ProfileScreen({ onNavigate, verified = false }: { onNavigate?: (s: Screen) => void; verified?: boolean }) {
  const recentSent = TRANSACTIONS.filter((t) => t.type === 'sent').concat(
    TRANSACTIONS.filter((t) => t.type !== 'sent'),
  )
  const [toast, setToast] = useState<string | null>(null)
  const [developerOpen, setDeveloperOpen] = useState(false)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 1800)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    if (!developerOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [developerOpen])

  function handleFeature(f: (typeof PROFILE_FEATURES)[number]) {
    if (f.id === 'pf8') {
      setDeveloperOpen(true)
      return
    }
    if (f.soon || f.id === 'pf4') {
      setToast(`${f.label} is locked until launch`)
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
        <div className="relative mt-2">
          <Image src="/sami-profile.jpeg" alt="Rakib Hassan profile picture" width={88} height={88} className="size-[88px] rounded-full object-cover ring-4 ring-primary/20" />
          <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background" aria-label="Verified profile"><BadgeCheck className="size-5" /></span>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <h1 className="font-heading text-xl font-bold">Rakib Hassan</h1>
          <BadgeCheck className="size-5 fill-primary text-background" />
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
          {!verified && <button onClick={() => onNavigate?.('verify')} className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition active:scale-95">Verify now</button>}
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
              className="glass relative flex shrink-0 flex-col items-center gap-1.5 rounded-2xl px-4 py-3 opacity-65"
              aria-label={`${b} locked`}
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-muted-foreground">
                <Lock className="size-5" />
              </span>
              <span className="text-[11px] font-medium">{b}</span>
              <span className="text-[9px] text-muted-foreground">Locked</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold">Leaderboard</h2>
          <button onClick={() => onNavigate?.('user-list')} className="text-xs font-medium text-primary transition active:scale-95">Full list</button>
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
            <Sparkles className="size-3.5" /> All features
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {PROFILE_FEATURES.map((f) => {
            const Icon = FEATURE_ICONS[f.icon] ?? Award
            const locked = Boolean(f.soon || f.id === 'pf4')
            const label = f.id === 'pf8' ? 'Developer' : f.label
            const sub = f.id === 'pf8' ? 'Knowledge & experience' : locked ? 'Locked until launch' : f.sub
            return (
              <motion.button
                key={f.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleFeature(f)}
                aria-label={`${label}${locked ? ' locked' : ''}`}
                className={`relative flex items-center gap-2.5 overflow-hidden rounded-2xl border border-white/10 bg-card/95 p-3 text-left shadow-lg shadow-black/10 backdrop-blur-xl transition-colors hover:border-primary/30 ${locked ? 'opacity-65' : ''}`}
              >
                <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${locked ? 'bg-white/10 text-muted-foreground' : 'bg-primary/15 text-primary'}`}>
                  <Icon className="size-[18px]" strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold leading-tight">{label}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{sub}</p>
                </div>
                {locked && <Lock className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />}
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {developerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-4 backdrop-blur-sm"
            onClick={() => setDeveloperOpen(false)}
          >
            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 28, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-[28px] bg-card p-5 shadow-2xl"
            >
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex flex-1 flex-col items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.72, y: -18, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.08 }}
                    className="size-28 overflow-hidden rounded-3xl ring-2 ring-primary/50 shadow-lg shadow-primary/10"
                  >
                    <Image src="/sami-profile.jpeg" alt="SAMI profile photo" width={112} height={112} className="size-28 object-cover" />
                  </motion.div>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Developer profile</p>
                  <h2 className="mt-1 font-heading text-xl font-bold">SAMI</h2>
                  <p className="text-xs text-muted-foreground">4 years experience</p>
                </div>
                <button onClick={() => setDeveloperOpen(false)} aria-label="Close developer profile" className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">Close</button>
              </div>
              <div className="relative mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>SAMI is the developer behind this FXC experience, with four years of hands-on experience building polished mobile products, reward systems, and practical digital tools.</p>
                <p>The goal is to keep every screen simple to understand while making important actions feel clear, secure, and easy to complete. From mining progress and daily tasks to wallet flows, each detail is shaped around a smoother user journey.</p>
                <p>FXC is continuously improving with a focus on reliable interactions, transparent balances, and a clean interface that helps users stay confident while they earn and manage their virtual coins.</p>
              </div>
              <div className="relative mt-4 grid grid-cols-2 gap-2">
                {['4 years experience', 'Product-focused UI', 'Secure reward flow', 'Clear user journeys'].map((note) => (
                  <div key={note} className="rounded-2xl border border-primary/15 bg-primary/10 p-3 text-xs font-semibold text-primary">{note}</div>
                ))}
              </div>
              <div className="relative mt-4 rounded-2xl bg-background/50 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                <span className="text-primary">const</span> experience = {'{'} clarity: true, craft: '4 years' {'}'}
                <br />
                <span className="text-primary">return</span> buildForRealUsers()
              </div>
              <div className="relative mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Contact</p>
                <div className="grid grid-cols-2 gap-2">
                  <a href="https://t.me/Anos_boldigoad" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground transition active:scale-95"><Send className="size-4" aria-hidden="true" />Telegram</a>
                  <a href="https://wa.me/8801898502319" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-3 py-3 text-sm font-semibold text-primary transition active:scale-95"><MessageCircle className="size-4" aria-hidden="true" />WhatsApp</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
