'use client'

import { Flame, Lock, Play, Users } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { GAMES, type Game } from '@/lib/data'

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

export function GamesScreen() {
  const featured = GAMES[0]
  const rest = GAMES.slice(1)

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.05 }}
      className="space-y-5 px-4"
    >
      <motion.div variants={item} className="pt-1">
        <h1 className="font-heading text-2xl font-bold">Mini Games</h1>
        <p className="text-sm text-muted-foreground">Play & earn BILLS instantly</p>
      </motion.div>

      {/* Featured */}
      <motion.div variants={item}>
        <div className="relative overflow-hidden rounded-3xl bg-primary p-5 text-primary-foreground">
          <div className="pointer-events-none absolute -right-8 -top-10 size-44 rounded-full bg-white/20 blur-2xl" />
          <Image
            src="/images/mining-3d.png"
            alt=""
            width={140}
            height={140}
            className="pointer-events-none absolute -bottom-4 -right-3 size-36 rotate-6 object-contain opacity-90"
          />
          <span className="inline-flex items-center gap-1 rounded-full bg-black/15 px-2.5 py-1 text-[10px] font-semibold">
            <Flame className="size-3" /> TRENDING
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold">{featured.title}</h2>
          <p className="mt-1 max-w-[60%] text-sm text-primary-foreground/80">
            Tap fast, multiply your BILLS every round.
          </p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition active:scale-95">
            <Play className="size-4 fill-current" /> Play now
          </button>
        </div>
      </motion.div>

      {/* Stats strip */}
      <motion.div variants={item} className="glass flex items-center justify-around rounded-3xl p-4">
        <Stat label="Games" value="6" />
        <span className="h-8 w-px bg-white/10" />
        <Stat label="Players" value="29k" />
        <span className="h-8 w-px bg-white/10" />
        <Stat label="Pool" value="1.2M" />
      </motion.div>

      {/* Grid */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="font-heading text-base font-semibold">All Games</h2>
        <div className="grid grid-cols-2 gap-3">
          {rest.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </motion.div>

      <motion.p variants={item} className="pt-1 text-center text-xs text-muted-foreground">
        More projects & games are added every week
      </motion.p>
    </motion.div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-heading text-lg font-bold tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}

function GameCard({ game }: { game: Game }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      disabled={game.soon}
      className="glass relative flex flex-col items-start gap-3 overflow-hidden rounded-3xl p-4 text-left disabled:opacity-70"
    >
      <div className="pointer-events-none absolute -right-4 -top-6 size-20 rounded-full bg-primary/20 blur-2xl" />
      <div className="flex w-full items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15">
          <Image src="/images/fxc-coin.png" alt="" width={28} height={28} className="size-7 object-contain" />
        </span>
        {game.hot && (
          <span className="flex items-center gap-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-[10px] font-semibold text-orange-400">
            <Flame className="size-3" /> Hot
          </span>
        )}
        {game.soon && (
          <span className="flex size-7 items-center justify-center rounded-full bg-white/10 text-muted-foreground">
            <Lock className="size-3.5" />
          </span>
        )}
      </div>
      <div>
        <p className="font-heading text-sm font-semibold leading-tight">{game.title}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{game.tag}</p>
      </div>
      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
        <Users className="size-3" />
        {game.soon ? 'Coming soon' : `${game.players} playing`}
      </div>
    </motion.button>
  )
}
