'use client'

import {
  ArrowLeftRight,
  ChevronRight,
  Eye,
  Gift,
  ListChecks,
  Megaphone,
  Pickaxe,
  Swords,
  TrendingUp,
  Trophy,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'
import type { Screen } from '@/components/bottom-nav'
import { LiveTicker } from '@/components/live-ticker'
import { UPDATES, USER } from '@/lib/data'
import { formatBills } from '@/lib/format'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 26 } },
} as const

const QUICK: { id: string; label: string; Icon: LucideIcon; screen?: Screen; soon?: boolean }[] = [
  { id: 'q1', label: 'Wallet', Icon: Wallet, screen: 'home' },
  { id: 'q2', label: 'Mining', Icon: Pickaxe, screen: 'mining' },
  { id: 'q3', label: 'Tasks', Icon: ListChecks, screen: 'tasks' },
  { id: 'q4', label: 'History', Icon: ArrowLeftRight, screen: 'home' },
  { id: 'q5', label: 'Promote', Icon: Megaphone, soon: true },
  { id: 'q6', label: 'Mining Stats', Icon: Pickaxe, screen: 'mining' },
  { id: 'q7', label: 'Rewards', Icon: Gift, screen: 'tasks' },
  { id: 'q8', label: 'Ranks', Icon: Trophy, screen: 'profile' },
]

export function DashboardScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 px-4">
      {/* Profile header */}
      <motion.div variants={item} className="flex items-center gap-3 pt-1">
        <motion.div
          whileTap={{ scale: 0.92 }}
          onClick={() => onNavigate('profile')}
          className="size-11 cursor-pointer overflow-hidden rounded-2xl ring-2 ring-primary/40"
        >
          <Image src="/images/mascot.png" alt="Avatar" width={44} height={44} className="size-11 object-cover" />
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-muted-foreground">Welcome back</p>
          <p className="truncate font-heading text-sm font-semibold">{USER.name}</p>
        </div>
        <div className="glass flex items-center gap-1.5 rounded-full px-2.5 py-1">
          <TrendingUp className="size-3.5 text-primary" />
          <span className="font-mono text-xs font-semibold tabular-nums text-primary">
            +{formatBills(USER.todayEarned)}
          </span>
        </div>
      </motion.div>

      {/* Glassy balance card */}
      <motion.div variants={item}>
        <div className="glass relative overflow-hidden rounded-3xl p-5">
          {/* ambient glow */}
          <div className="pointer-events-none absolute -right-12 -top-14 size-48 rounded-full bg-primary/25 blur-3xl" />
          {/* floating crystal */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -right-2 top-3"
          >
            <Image
              src="/images/fxc-crystal.png"
              alt=""
              width={120}
              height={120}
              className="size-28 object-contain drop-shadow-[0_8px_24px_rgba(132,204,22,0.35)]"
            />
          </motion.div>

          <div className="relative">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              Amount Balance
              <Eye className="size-3.5" />
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-heading text-[34px] font-bold leading-none tracking-tight tabular-nums">
                {formatBills(USER.balance)}
              </span>
              <span className="mb-0.5 text-sm font-semibold text-primary">FXC BILLS</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
              <TrendingUp className="size-3.5" />
              +{formatBills(USER.todayEarned)} today
            </div>
          </div>

          {/* tiny live ticker pinned bottom-left */}
          <div className="relative mt-5 flex items-center">
            <div className="glass max-w-[62%] rounded-full px-2.5 py-1">
              <LiveTicker />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Player Battle banner */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('battle')}
        className="relative flex h-28 w-full items-center overflow-hidden rounded-3xl text-left"
      >
        <Image
          src="/images/battle-arena.png"
          alt=""
          fill
          sizes="(max-width: 448px) 100vw, 448px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
        <div className="relative flex w-full items-center gap-3 px-5">
          <motion.span
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary glow-primary"
          >
            <Swords className="size-6" strokeWidth={2.2} />
          </motion.span>
          <div className="min-w-0 flex-1">
            <span className="mb-1 inline-block rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
              PLAYER BATTLE
            </span>
            <p className="font-heading text-base font-bold leading-tight">Player Duel · Win Big</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              Challenge players & win FXC BILLS
            </p>
          </div>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ChevronRight className="size-4" />
          </span>
        </div>
      </motion.button>

      {/* Quick action grid */}
      <motion.div variants={item}>
        <div className="grid grid-cols-4 gap-2">
          {QUICK.map(({ id, label, Icon, screen, soon }) => (
            <motion.button
              key={id}
              whileTap={{ scale: 0.92 }}
              onClick={() => screen && onNavigate(screen)}
              className="glass relative flex flex-col items-center gap-1.5 rounded-2xl py-3"
            >
              {soon && (
                <span className="absolute right-1 top-1 rounded-full bg-white/10 px-1.5 text-[8px] font-semibold text-muted-foreground">
                  soon
                </span>
              )}
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-[18px]" strokeWidth={2.2} />
              </span>
              <span className="text-[10px] font-medium">{label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Featured mining banner */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('mining')}
        className="glass relative flex w-full items-center gap-3 overflow-hidden rounded-3xl p-4 text-left"
      >
        <div className="pointer-events-none absolute -right-6 -top-8 size-28 rounded-full bg-primary/25 blur-2xl" />
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/images/fox-miner.png"
            alt=""
            width={56}
            height={56}
            className="relative size-14 shrink-0 object-contain drop-shadow-lg"
          />
        </motion.div>
        <div className="relative min-w-0 flex-1">
          <span className="mb-1 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
            2X BOOST LIVE
          </span>
          <p className="font-heading text-[15px] font-semibold leading-tight">Start Mining BILLS</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">Tap the fox & earn passively</p>
        </div>
        <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ChevronRight className="size-4" />
        </span>
      </motion.button>

      {/* Daily updates */}
      <motion.div variants={item} className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-sm font-semibold">Daily Updates</h2>
          <button className="text-[11px] font-medium text-primary">See all</button>
        </div>
        <div className="space-y-2">
          {UPDATES.map((u) => (
            <div key={u.id} className="glass flex items-center gap-3 rounded-2xl p-3">
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-bold text-primary">
                {u.tag}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold leading-tight">{u.title}</p>
                <p className="truncate text-[11px] text-muted-foreground">{u.desc}</p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Invite strip */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('invite')}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary/10 py-3 text-xs font-medium text-primary"
      >
        <Users className="size-4" />
        Invite friends & earn 250 BILLS each
      </motion.button>
    </motion.div>
  )
}
