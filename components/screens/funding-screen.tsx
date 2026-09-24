'use client'

import { ArrowDownToLine, ArrowLeft, ArrowUpFromLine, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'motion/react'

export function FundingScreen({ mode: initialMode, onBack }: { mode: 'topup' | 'withdraw'; onBack: () => void }) {
  const [mode, setMode] = useState(initialMode)
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const isValidAddress = /^(0x[a-fA-F0-9]{40}|T[a-zA-Z0-9]{33})$/.test(address.trim())
  const canSubmit = isValidAddress && Number(amount) > 0

  return (
    <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 px-4 pt-3">
      <div className="flex items-center gap-3">
        <button onClick={onBack} aria-label="Go back" className="glass flex size-10 items-center justify-center rounded-2xl"><ArrowLeft className="size-4" /></button>
        <div><p className="font-heading text-lg font-bold">{mode === 'topup' ? 'Top up' : 'Withdrawal'}</p><p className="text-xs text-muted-foreground">Move FXC BILLS securely</p></div>
      </div>

      <div className="glass grid grid-cols-2 gap-2 rounded-2xl p-1.5">
        {(['topup', 'withdraw'] as const).map((value) => <button key={value} onClick={() => { setMode(value); setSubmitted(false) }} className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${mode === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
          {value === 'topup' ? <ArrowDownToLine className="size-4" /> : <ArrowUpFromLine className="size-4" />}{value === 'topup' ? 'Topup' : 'Withdrawal'}
        </button>)}
      </div>

      <div className="glass space-y-4 rounded-3xl p-5">
        <div><label htmlFor="fund-address" className="mb-2 block text-xs font-medium text-muted-foreground">{mode === 'topup' ? 'Your wallet address' : 'Withdrawal wallet address'}</label><input id="fund-address" value={address} onChange={(e) => { setAddress(e.target.value); setSubmitted(false) }} placeholder="0x... or T..." className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none ring-primary/50 placeholder:text-muted-foreground/60 focus:ring-2" /></div>
        {address && !isValidAddress && <p className="flex items-center gap-1.5 text-xs text-destructive"><ShieldAlert className="size-3.5" /> Invalid wallet address. Request rejected.</p>}
        <div><label htmlFor="fund-amount" className="mb-2 block text-xs font-medium text-muted-foreground">Amount (FXC BILLS)</label><input id="fund-amount" inputMode="decimal" value={amount} onChange={(e) => { setAmount(e.target.value.replace(/[^0-9.]/g, '')); setSubmitted(false) }} placeholder="0.00" className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none ring-primary/50 placeholder:text-muted-foreground/60 focus:ring-2" /></div>
        <p className="text-[11px] leading-relaxed text-muted-foreground">Always double-check the address. Requests with an invalid or unsupported address are automatically declined.</p>
        <button disabled={!canSubmit} onClick={() => setSubmitted(true)} className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-40">{mode === 'topup' ? 'Submit topup request' : 'Submit withdrawal request'}</button>
        {submitted && <p className="rounded-2xl bg-primary/10 px-3 py-2 text-center text-xs font-medium text-primary">Request submitted for review.</p>}
      </div>
    </motion.div>
  )
}
