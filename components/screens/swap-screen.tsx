'use client'

import { useMemo, useState } from 'react'
import { ArrowDownUp, ArrowLeft, Check, ChevronDown, Wallet } from 'lucide-react'
import { motion } from 'motion/react'
import { USER } from '@/lib/data'
import { formatBills } from '@/lib/format'

const COINS = [
  { symbol: 'USDT', name: 'Tether USD', rate: 0.0012 },
  { symbol: 'BTC', name: 'Bitcoin', rate: 0.000000018 },
  { symbol: 'ETH', name: 'Ethereum', rate: 0.00000042 },
]

export function SwapScreen({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState('1000')
  const [coin, setCoin] = useState(COINS[0])
  const [withdrawn, setWithdrawn] = useState(false)
  const numeric = Math.min(Math.max(Number(amount) || 0, 0), USER.balance)
  const received = useMemo(() => numeric * coin.rate, [numeric, coin.rate])

  if (withdrawn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex size-20 items-center justify-center rounded-full bg-primary glow-primary">
          <Check className="size-10 text-primary-foreground" strokeWidth={3} />
        </motion.div>
        <h1 className="mt-5 font-heading text-2xl font-bold">Withdrawal requested</h1>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">Your FXC BILLS were swapped to {received.toFixed(coin.symbol === 'USDT' ? 2 : 8)} {coin.symbol} and sent for withdrawal.</p>
        <button onClick={onBack} className="mt-8 w-full max-w-xs rounded-2xl bg-primary py-4 font-semibold text-primary-foreground active:scale-95">Back to wallet</button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col px-4 pb-6 pt-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="glass flex size-10 items-center justify-center rounded-2xl active:scale-95" aria-label="Back"><ArrowLeft className="size-5" /></button>
        <h1 className="font-heading text-base font-semibold">Swap & Withdraw</h1>
        <span className="size-10" />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-7 space-y-4">
        <div>
          <p className="text-xs text-muted-foreground">Swap your FXC BILLS before withdrawal</p>
          <h2 className="mt-1 font-heading text-2xl font-bold">Choose your crypto</h2>
        </div>
        <div className="glass rounded-3xl p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground"><span>From</span><span>Balance: {formatBills(USER.balance)} FXC</span></div>
          <div className="mt-3 flex items-center gap-3"><Wallet className="size-5 text-primary" /><input value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ''))} inputMode="decimal" className="min-w-0 flex-1 bg-transparent font-heading text-3xl font-bold outline-none" aria-label="FXC amount" /><span className="font-semibold text-primary">FXC</span></div>
        </div>
        <div className="flex justify-center"><span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><ArrowDownUp className="size-4" /></span></div>
        <div className="glass rounded-3xl p-4">
          <label htmlFor="coin" className="text-xs text-muted-foreground">To</label>
          <div className="mt-3 flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-2xl bg-primary/15 font-bold text-primary">{coin.symbol.slice(0, 1)}</div><select id="coin" value={coin.symbol} onChange={(event) => setCoin(COINS.find((entry) => entry.symbol === event.target.value) ?? COINS[0])} className="flex-1 appearance-none bg-transparent font-semibold outline-none"><option value="USDT">USDT · Tether USD</option><option value="BTC">BTC · Bitcoin</option><option value="ETH">ETH · Ethereum</option></select><ChevronDown className="size-4 text-muted-foreground" /></div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-sm"><span className="text-muted-foreground">You receive</span><span className="font-mono font-semibold text-primary">{received.toFixed(coin.symbol === 'USDT' ? 2 : 8)} {coin.symbol}</span></div>
        </div>
        <div className="rounded-2xl bg-primary/10 p-3 text-xs leading-relaxed text-muted-foreground">FXC BILLS must be swapped to another crypto currency before you can withdraw. Network fees may apply.</div>
        <button disabled={numeric <= 0} onClick={() => setWithdrawn(true)} className="w-full rounded-2xl bg-primary py-4 font-semibold text-primary-foreground active:scale-[.98] disabled:opacity-40">Swap FXC & Withdraw</button>
      </motion.div>
    </div>
  )
}
