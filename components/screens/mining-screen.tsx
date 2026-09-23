'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Bolt, Coins, Gauge, Hand, Pickaxe, Rocket, Trophy, Users, Zap } from 'lucide-react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { LEADERBOARD, USER } from '@/lib/data'
import { formatBills } from '@/lib/format'

type Pop = { id: number; x: number; amount: number }

export function MiningScreen({ onBack }: { onBack: () => void }) {
  const [mined, setMined] = useState(0)
  const [energy, setEnergy] = useState(820)
  const [pops, setPops] = useState<Pop[]>([])
  const [boosted, setBoosted] = useState(false)
  const [claimed, setClaimed] = useState<number | null>(null)
  const maxEnergy = 1000
  const perTap = boosted ? 4 : 2

  function claim() {
    if (mined < 1) return
    setClaimed(mined)
    setMined(0)
    setTimeout(() => setClaimed(null), 2000)
  }

  // passive regen
  useEffect(() => {
    const t = setInterval(() => setEnergy((e) => Math.min(maxEnergy, e + 5)), 1000)
    return () => clearInterval(t)
  }, [])

  // passive mining
  useEffect(() => {
    const t = setInterval(() => setMined((m) => m + (boosted ? 0.6 : 0.3)), 1000)
    return () => clearInterval(t)
  }, [boosted])

  function tap() {
    if (energy < perTap) return
    setEnergy((e) => Math.max(0, e - perTap))
    setMined((m) => m + perTap)
    const id = Date.now() + Math.random()
    setPops((p) => [...p, { id, x: Math.random() * 80 - 40, amount: perTap }])
    setTimeout(() => setPops((p) => p.filter((x) => x.id !== id)), 900)
  }

  return (
    <div className="relative min-h-screen px-4 pb-10">
      {/* header */}
      <div className="flex items-center justify-between py-3">
        <button
          onClick={onBack}
          className="glass flex size-10 items-center justify-center rounded-2xl transition active:scale-90"
          aria-label="Back"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-heading text-base font-semibold">FXC Mining</h1>
        <div className="glass flex items-center gap-1.5 rounded-full px-2.5 py-1.5">
          <Zap className="size-3.5 fill-primary text-primary" />
          <span className="font-mono text-xs font-semibold tabular-nums">
            {energy}/{maxEnergy}
          </span>
        </div>
      </div>

      {/* mined balance */}
      <div className="mt-2 text-center">
        <p className="text-xs text-muted-foreground">Mined this session</p>
        <div className="mt-1 flex items-center justify-center gap-2">
          <Image src="/images/fxc-coin.png" alt="" width={28} height={28} className="size-7 object-contain" />
          <span className="font-heading text-4xl font-bold tabular-nums">{formatBills(mined)}</span>
          <span className="text-sm font-semibold text-primary">BILLS</span>
        </div>
      </div>

      {/* Fox tap area */}
      <div className="relative mt-6 flex justify-center">
        {/* pulsing rings */}
        <motion.span
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 size-64 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl"
        />
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute top-1/2 size-72 -translate-y-1/2 rounded-full border border-primary/30"
        />

        <motion.button
          onClick={tap}
          whileTap={{ scale: 0.93 }}
          className="relative flex size-60 items-center justify-center rounded-full"
          aria-label="Tap to mine"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/25 to-transparent" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/images/fox-miner.png"
              alt="FXC mining fox"
              width={220}
              height={220}
              className="size-52 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              priority
            />
          </motion.div>

          {/* floating +amount pops */}
          <AnimatePresence>
            {pops.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 0, y: 0, scale: 0.7 }}
                animate={{ opacity: 1, y: -90, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{ left: `calc(50% + ${p.x}px)` }}
                className="pointer-events-none absolute top-6 font-heading text-lg font-bold text-primary"
              >
                +{p.amount}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.button>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Hand className="size-3.5" /> Tap the fox to mine BILLS
      </p>

      {/* energy bar */}
      <div className="mt-6">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Bolt className="size-3.5 text-primary" /> Energy
          </span>
          <span className="font-mono tabular-nums text-muted-foreground">
            {energy}/{maxEnergy}
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${(energy / maxEnergy) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          />
        </div>
      </div>

      {/* stat chips */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <StatChip Icon={Gauge} label="Rate" value={`${perTap}/tap`} />
        <StatChip Icon={Coins} label="Per hour" value={boosted ? '+2.1k' : '+1.0k'} />
        <StatChip Icon={Rocket} label="Boost" value={boosted ? 'ON' : 'OFF'} active={boosted} />
      </div>

      {/* mining status */}
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <div className="glass rounded-2xl p-3">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><Pickaxe className="size-3.5 text-primary" /> Network rate</div>
          <p className="mt-1 font-heading text-base font-bold">{boosted ? '2.1k' : '1.0k'} <span className="text-[10px] font-medium text-primary">BILLS/hr</span></p>
        </div>
        <div className="glass rounded-2xl p-3">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><Users className="size-3.5 text-primary" /> Active miners</div>
          <p className="mt-1 font-heading text-base font-bold">2,486 <span className="text-[10px] font-medium text-primary">online</span></p>
        </div>
      </div>

      {/* top miners */}
      <div className="glass mt-3 rounded-2xl p-3.5">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2"><Trophy className="size-4 text-primary" /><h2 className="font-heading text-sm font-semibold">Top miners</h2></div>
          <span className="text-[10px] text-muted-foreground">This week</span>
        </div>
        <div className="space-y-2">
          {LEADERBOARD.slice(0, 3).map((miner) => (
            <div key={miner.rank} className="flex items-center gap-2.5">
              <span className="w-4 text-center text-[10px] font-bold text-muted-foreground">{miner.rank}</span>
              <div className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">{miner.name.charAt(0)}</div>
              <span className="min-w-0 flex-1 truncate text-xs font-medium">{miner.name}</span>
              <span className="font-mono text-[10px] text-primary">+{formatBills(miner.score)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-muted-foreground"><span>Your rank</span><span className="font-semibold text-foreground">#{USER.rank} · {formatBills(USER.todayEarned)} today</span></div>
        </div>
      </div>

      {/* action buttons */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setBoosted((b) => !b)}
          className={`flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition ${
            boosted ? 'bg-primary text-primary-foreground glow-primary' : 'glass text-foreground'
          }`}
        >
          <Rocket className="size-4" />
          {boosted ? 'Boost Active' : 'Activate Boost'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={claim}
          disabled={mined < 1}
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition active:scale-95 disabled:opacity-40"
        >
          <Coins className="size-4" />
          Claim {formatBills(mined)}
        </motion.button>
      </div>

      <AnimatePresence>
        {claimed !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full bg-primary/15 px-3 py-2 text-xs font-semibold text-primary"
          >
            <Coins className="size-3.5" /> +{formatBills(claimed)} FXC BILLS claimed
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Energy refills automatically over time. Claim anytime to add BILLS to your wallet.
      </p>
    </div>
  )
}

function StatChip({
  Icon,
  label,
  value,
  active,
}: {
  Icon: typeof Gauge
  label: string
  value: string
  active?: boolean
}) {
  return (
    <div className="glass flex flex-col items-center gap-1 rounded-2xl py-3">
      <Icon className={`size-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
      <span className="font-heading text-sm font-bold tabular-nums">{value}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}
