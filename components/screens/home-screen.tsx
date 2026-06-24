'use client'

import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  Eye,
  Gamepad2,
  Gift,
  Grid2x2,
  ListChecks,
  Pickaxe,
  TrendingUp,
} from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { BannerButton } from '@/components/banner-button'
import type { Screen } from '@/components/bottom-nav'
import { TRANSACTIONS, USER } from '@/lib/data'
import { formatBills } from '@/lib/format'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 26 } },
} as const

function ActionButton({
  Icon,
  label,
  onClick,
  accent,
}: {
  Icon: typeof ArrowUpRight
  label: string
  onClick?: () => void
  accent?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 flex-col items-center gap-2 transition active:scale-95"
    >
      <span
        className={`flex size-14 items-center justify-center rounded-2xl ${
          accent ? 'bg-primary text-primary-foreground glow-primary' : 'glass text-primary'
        }`}
      >
        <Icon className="size-5" strokeWidth={2.2} />
      </span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </button>
  )
}

export function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 px-4"
    >
      {/* Greeting */}
      <motion.div variants={item} className="flex items-center gap-3 pt-1">
        <div className="relative">
          <div className="size-12 overflow-hidden rounded-2xl ring-2 ring-primary/40">
            <Image
              src="/images/mascot.png"
              alt="Avatar"
              width={48}
              height={48}
              className="size-12 object-cover"
            />
          </div>
          {USER.verified && (
            <BadgeCheck className="absolute -bottom-1 -right-1 size-5 rounded-full bg-background fill-primary text-background" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Good evening</p>
          <p className="truncate font-heading text-base font-semibold">{USER.name}</p>
        </div>
        <span className="ml-auto rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
          Lv {USER.level}
        </span>
      </motion.div>

      {/* Balance card */}
      <motion.div variants={item}>
        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="pointer-events-none absolute -right-10 -top-12 size-44 rounded-full bg-primary/25 blur-3xl" />
          <Image
            src="/images/fxc-coin.png"
            alt=""
            width={120}
            height={120}
            className="pointer-events-none absolute -right-3 top-2 size-28 rotate-12 object-contain opacity-90"
          />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              Total Balance
              <Eye className="size-3.5" />
            </div>
            <div className="mt-1 flex items-end gap-2">
              <span className="font-heading text-4xl font-bold tracking-tight tabular-nums">
                {formatBills(USER.balance)}
              </span>
              <span className="mb-1 text-sm font-semibold text-primary">BILLS</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
              <TrendingUp className="size-3.5" />
              +{formatBills(USER.todayEarned)} today
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action row */}
      <motion.div variants={item} className="glass flex items-center gap-1 rounded-3xl p-3">
        <ActionButton Icon={ArrowUpRight} label="Send" accent onClick={() => onNavigate('send')} />
        <ActionButton Icon={ArrowDownLeft} label="Receive" onClick={() => onNavigate('receive')} />
        <ActionButton Icon={Pickaxe} label="Mine" onClick={() => onNavigate('mining')} />
        <ActionButton Icon={Grid2x2} label="More" onClick={() => onNavigate('games')} />
      </motion.div>

      {/* Banner buttons */}
      <motion.div variants={item} className="space-y-3">
        <BannerButton
          title="Daily Tasks & Rewards"
          subtitle="Complete tasks, earn up to 250 BILLS"
          image="/images/trophy-3d.png"
          badge="6 NEW"
          accent
          onClick={() => onNavigate('tasks')}
        />
        <div className="grid grid-cols-2 gap-3">
          <CompactBanner
            Icon={Pickaxe}
            title="Auto Mining"
            sub="Tap to boost"
            onClick={() => onNavigate('mining')}
          />
          <CompactBanner
            Icon={Gamepad2}
            title="Mini Games"
            sub="6 live now"
            onClick={() => onNavigate('games')}
          />
        </div>
        <BannerButton
          title="Verify Your Account"
          subtitle="Unlock withdrawals & bonus 500 BILLS"
          image="/images/mascot.png"
          badge="ACTION NEEDED"
          onClick={() => onNavigate('profile')}
        />
      </motion.div>

      {/* Recent activity */}
      <motion.div variants={item} className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold">Recent Activity</h2>
          <button className="text-xs font-medium text-primary">See all</button>
        </div>
        <div className="glass space-y-1 rounded-3xl p-2">
          {TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 rounded-2xl p-2.5">
              <span
                className={`flex size-10 items-center justify-center rounded-xl ${
                  tx.type === 'sent' ? 'bg-destructive/15 text-destructive' : 'bg-primary/15 text-primary'
                }`}
              >
                {tx.type === 'sent' ? (
                  <ArrowUpRight className="size-4" />
                ) : tx.type === 'reward' ? (
                  <Gift className="size-4" />
                ) : (
                  <ArrowDownLeft className="size-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{tx.title}</p>
                <p className="truncate text-xs text-muted-foreground">{tx.sub}</p>
              </div>
              <span
                className={`shrink-0 font-mono text-sm font-semibold tabular-nums ${
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

      <motion.div variants={item} className="flex items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
        <ListChecks className="size-3.5" />
        Tip: finish daily tasks to keep your streak alive
      </motion.div>
    </motion.div>
  )
}

function CompactBanner({
  Icon,
  title,
  sub,
  onClick,
}: {
  Icon: typeof Pickaxe
  title: string
  sub: string
  onClick?: () => void
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="glass relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl p-4 text-left"
    >
      <div className="pointer-events-none absolute -right-4 -top-6 size-20 rounded-full bg-primary/20 blur-2xl" />
      <span className="relative flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="relative">
        <p className="font-heading text-sm font-semibold leading-tight">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
      </div>
    </motion.button>
  )
}
