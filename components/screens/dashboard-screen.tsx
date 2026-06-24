'use client'

import {
  ArrowLeftRight,
  ChevronRight,
  Gamepad2,
  Gift,
  ListChecks,
  Megaphone,
  Pickaxe,
  Radio,
  TrendingUp,
  Trophy,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'
import type { Screen } from '@/components/bottom-nav'
import { LIVE_EARNERS, UPDATES, USER } from '@/lib/data'
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
  { id: 'q6', label: 'Games', Icon: Gamepad2, screen: 'games' },
  { id: 'q7', label: 'Rewards', Icon: Gift, screen: 'tasks' },
  { id: 'q8', label: 'Ranks', Icon: Trophy, screen: 'profile' },
]

export function DashboardScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 px-4">
      {/* Profile header */}
      <motion.div variants={item} className="flex items-center gap-3 pt-1">
        <div className="size-11 overflow-hidden rounded-2xl ring-2 ring-primary/40">
          <Image src="/images/mascot.png" alt="Avatar" width={44} height={44} className="size-11 object-cover" />
        </div>
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

      {/* Live earners feed */}
      <motion.div variants={item}>
        <div className="glass relative overflow-hidden rounded-3xl p-4">
          <div className="pointer-events-none absolute -left-8 -top-10 size-32 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5 items-center justify-center">
                <span className="absolute size-2.5 animate-ping rounded-full bg-primary/70" />
                <span className="size-2 rounded-full bg-primary" />
              </span>
              <h2 className="font-heading text-sm font-semibold">Live Earnings</h2>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Radio className="size-3.5" /> 4.2k online
            </span>
          </div>

          {/* vertical marquee */}
          <div className="relative h-32 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)]">
            <motion.div
              animate={{ y: ['0%', '-50%'] }}
              transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
              className="flex flex-col gap-2"
            >
              {[...LIVE_EARNERS, ...LIVE_EARNERS].map((e, i) => (
                <div key={`${e.id}-${i}`} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {e.initial}
                  </span>
                  <p className="min-w-0 flex-1 truncate text-xs">
                    <span className="font-semibold">{e.name}</span>
                    <span className="text-muted-foreground"> {e.action}</span>
                  </p>
                  <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-primary">
                    +{formatBills(e.amount)}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

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
        <Image
          src="/images/fox-miner.png"
          alt=""
          width={56}
          height={56}
          className="relative size-14 shrink-0 object-contain drop-shadow-lg"
        />
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
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary/10 py-3 text-xs font-medium text-primary"
      >
        <Users className="size-4" />
        Invite friends & earn 250 BILLS each
      </motion.button>
    </motion.div>
  )
}
