'use client'

import { useState } from 'react'
import { ArrowLeft, Check, Delete } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { CONTACTS, USER } from '@/lib/data'
import { formatBills } from '@/lib/format'

const QUICK = [100, 500, 1000]
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del']

export function SendScreen({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState('0')
  const [selected, setSelected] = useState(CONTACTS[0].id)
  const [sent, setSent] = useState(false)

  const press = (k: string) => {
    setAmount((prev) => {
      if (k === 'del') return prev.length <= 1 ? '0' : prev.slice(0, -1)
      if (k === '.') return prev.includes('.') ? prev : prev + '.'
      if (prev === '0') return k
      return prev.length >= 9 ? prev : prev + k
    })
  }

  const numeric = Number.parseFloat(amount) || 0
  const fee = numeric > 0 ? Math.max(1, Math.round(numeric * 0.01)) : 0

  if (sent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="flex size-24 items-center justify-center rounded-full bg-primary glow-primary"
        >
          <Check className="size-12 text-primary-foreground" strokeWidth={3} />
        </motion.div>
        <h1 className="mt-6 font-heading text-2xl font-bold">Sent!</h1>
        <p className="mt-1 text-muted-foreground">
          {formatBills(numeric)} BILLS sent successfully
        </p>
        <button
          onClick={onBack}
          className="mt-8 w-full max-w-xs rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition active:scale-95"
        >
          Back to wallet
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col px-4 pb-6 pt-4">
      <Header title="Send BILLS" onBack={onBack} />

      {/* Amount */}
      <div className="mt-6 flex flex-col items-center">
        <p className="text-xs text-muted-foreground">Amount to send</p>
        <div className="mt-2 flex items-center gap-2">
          <Image src="/images/fxc-coin.png" alt="" width={32} height={32} className="size-8 object-contain" />
          <span className="font-heading text-5xl font-bold tabular-nums">{amount}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Balance: {formatBills(USER.balance)} BILLS · Fee {fee}
        </p>
      </div>

      {/* Quick amounts */}
      <div className="mt-5 flex justify-center gap-2">
        {QUICK.map((q) => (
          <button
            key={q}
            onClick={() => setAmount(String(q))}
            className="glass rounded-full px-4 py-2 text-sm font-medium transition active:scale-95"
          >
            +{q}
          </button>
        ))}
      </div>

      {/* Recipients */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-semibold">Send to</p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {CONTACTS.map((c) => {
            const active = selected === c.id
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className="flex shrink-0 flex-col items-center gap-1.5"
              >
                <span
                  className={`flex size-14 items-center justify-center rounded-2xl text-lg font-semibold transition ${
                    active
                      ? 'bg-primary text-primary-foreground glow-primary'
                      : 'glass text-foreground'
                  }`}
                >
                  {c.initial}
                </span>
                <span className={`text-[11px] ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                  {c.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Keypad */}
      <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
        {KEYS.map((k) => (
          <button
            key={k}
            onClick={() => press(k)}
            className="flex h-14 items-center justify-center rounded-2xl text-xl font-semibold text-foreground transition active:bg-white/5"
          >
            {k === 'del' ? <Delete className="size-6 text-muted-foreground" /> : k}
          </button>
        ))}
      </div>

      <button
        disabled={numeric <= 0}
        onClick={() => setSent(true)}
        className="mt-4 w-full rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition active:scale-95 disabled:opacity-40"
      >
        Send {numeric > 0 ? `${formatBills(numeric)} BILLS` : ''}
      </button>
    </div>
  )
}

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onBack}
        className="glass flex size-10 items-center justify-center rounded-2xl transition active:scale-95"
        aria-label="Back"
      >
        <ArrowLeft className="size-5" />
      </button>
      <h1 className="font-heading text-base font-semibold">{title}</h1>
      <span className="size-10" />
    </div>
  )
}
