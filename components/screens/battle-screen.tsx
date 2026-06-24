'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Crown,
  Loader2,
  Swords,
  Trophy,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { BATTLE_STAKES, OPPONENTS, USER } from '@/lib/data'
import { formatBills } from '@/lib/format'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 26 } },
} as const

export function BattleScreen({ onBack }: { onBack: () => void }) {
  const [stake, setStake] = useState(BATTLE_STAKES[1])
  const [searching, setSearching] = useState(false)

  // auto-stop the matchmaking demo animation
  useEffect(() => {
    if (!searching) return
    const t = setTimeout(() => setSearching(false), 3200)
    return () => clearTimeout(t)
  }, [searching])

  return (
    <div className="relative min-h-screen px-4 pb-10 pt-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="glass flex size-10 items-center justify-center rounded-2xl transition active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-heading text-base font-semibold">Player Duel</h1>
        <div className="glass flex items-center gap-1.5 rounded-full px-2.5 py-1.5">
          <Trophy className="size-3.5 text-primary" />
          <span className="font-mono text-xs font-semibold tabular-nums">{USER.winRate}%</span>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="mt-4 space-y-4">
        {/* Duel arena */}
        <motion.div variants={item}>
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/battle-arena.png"
              alt=""
              width={448}
              height={300}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background/90" />

            <div className="relative p-5">
              <p className="text-center font-heading text-sm font-semibold text-primary">Win Big</p>

              <div className="mt-4 flex items-center justify-between gap-2">
                {/* You */}
                <Fighter
                  name={USER.name.split(' ')[0]}
                  xp={`${USER.xp} XP`}
                  isFox
                  side="left"
                />

                {/* VS swords */}
                <div className="flex flex-col items-center">
                  <motion.span
                    animate={searching ? { rotate: [0, -12, 12, 0] } : { rotate: 0 }}
                    transition={{ duration: 0.8, repeat: searching ? Infinity : 0 }}
                    className="flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary glow-primary"
                  >
                    <Swords className="size-6" strokeWidth={2.4} />
                  </motion.span>
                  <span className="mt-1 font-heading text-[11px] font-bold text-muted-foreground">VS</span>
                </div>

                {/* Opponent */}
                <Fighter
                  name={searching ? 'Searching…' : 'Anonymous'}
                  xp={searching ? '' : '- XP'}
                  side="right"
                  searching={searching}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stake selector */}
        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold">Entry stake</h3>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Zap className="size-3.5 text-primary" /> Winner takes {formatBills(stake * 2)} BILLS
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {BATTLE_STAKES.map((s) => (
              <motion.button
                key={s}
                whileTap={{ scale: 0.94 }}
                onClick={() => setStake(s)}
                className={`rounded-2xl py-3 text-sm font-bold tabular-nums transition ${
                  stake === s
                    ? 'bg-primary text-primary-foreground glow-primary'
                    : 'glass text-foreground'
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Find match */}
        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSearching((v) => !v)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition active:scale-95"
        >
          {searching ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Finding opponent…
            </>
          ) : (
            <>
              <Swords className="size-4" /> Find Match · {stake} BILLS
            </>
          )}
        </motion.button>

        {/* Challenge top players */}
        <motion.div variants={item} className="space-y-2">
          <h3 className="font-heading text-sm font-semibold">Challenge a player</h3>
          <div className="glass space-y-1 rounded-3xl p-2">
            {OPPONENTS.map((o) => (
              <div key={o.id} className="flex items-center gap-3 rounded-2xl p-2.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
                  {o.initial}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{o.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    Lv {o.level} · {o.winRate}% win
                  </p>
                </div>
                <button className="flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary transition active:scale-95">
                  <Swords className="size-3.5" /> Duel
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Win streak note */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary/10 py-3 text-xs font-medium text-primary"
        >
          <Crown className="size-4" /> Win {USER.streakDays} duels in a row for a mega bonus
        </motion.div>
      </motion.div>
    </div>
  )
}

function Fighter({
  name,
  xp,
  isFox,
  side,
  searching,
}: {
  name: string
  xp: string
  isFox?: boolean
  side: 'left' | 'right'
  searching?: boolean
}) {
  return (
    <div className="flex w-24 flex-col items-center gap-2">
      <motion.div
        animate={{ y: [0, side === 'left' ? -6 : 6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex size-20 items-center justify-center rounded-full border border-primary/30 bg-white/[0.04]"
      >
        {isFox ? (
          <Image
            src="/images/mascot.png"
            alt="You"
            width={64}
            height={64}
            className="size-16 object-contain drop-shadow-lg"
          />
        ) : searching ? (
          <Loader2 className="size-7 animate-spin text-primary" />
        ) : (
          <span className="font-heading text-3xl font-bold text-muted-foreground">?</span>
        )}
      </motion.div>
      <p className="truncate text-center text-xs font-semibold">{name}</p>
      {xp && (
        <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
          <Zap className="size-3 fill-primary" /> {xp}
        </span>
      )}
    </div>
  )
}
