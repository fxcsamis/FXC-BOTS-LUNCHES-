'use client'

import { Bell, Check, Plus, Zap } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { formatBills } from '@/lib/format'

export function TopBar({
  balance,
  onAdd,
}: {
  balance: number
  onAdd?: () => void
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [offersEnabled, setOffersEnabled] = useState(true)

  useEffect(() => {
    if (!notificationsOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [notificationsOpen])

  return (
    <header className="sticky top-0 z-30 px-4 pb-2 pt-3">
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-background via-background/85 to-transparent" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setNotificationsOpen(true)}
            className="glass relative flex size-10 items-center justify-center rounded-2xl text-muted-foreground transition active:scale-95"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell className="size-[18px]" />
            {offersEnabled && <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary ring-2 ring-background" />}
          </button>
        </div>

        <button
          onClick={onAdd}
          className="glass flex items-center gap-2 rounded-full py-1.5 pl-2 pr-1.5 transition active:scale-95"
        >
          <Image
            src="/images/fxc-coin.png"
            alt="FXC BILLS"
            width={22}
            height={22}
            className="size-[22px] object-contain"
          />
          <span className="font-mono text-sm font-semibold tabular-nums text-foreground">{formatBills(balance)}</span>
          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Plus className="size-4" strokeWidth={2.5} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {notificationsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="fixed inset-0 z-50 min-h-dvh overflow-y-auto rounded-none bg-[#07110c] p-5 text-foreground shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-heading text-base font-bold">Notifications</p>
                <p className="mt-1 text-xs text-muted-foreground">Control special offers and reward alerts.</p>
              </div>
              <button onClick={() => setNotificationsOpen(false)} aria-label="Close notifications" className="rounded-full p-1.5 text-muted-foreground transition active:scale-90">
                <Check className="size-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-primary/10 p-3">
              <div>
                <p className="text-sm font-semibold">Offers & rewards</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">New task bonuses and limited events</p>
              </div>
              <button
                onClick={() => setOffersEnabled((enabled) => !enabled)}
                role="switch"
                aria-checked={offersEnabled}
                className={`relative h-7 w-12 rounded-full p-1 transition ${offersEnabled ? 'bg-primary' : 'bg-white/15'}`}
              >
                <span className={`block size-5 rounded-full bg-white shadow transition-transform ${offersEnabled ? 'translate-x-5' : ''}`} />
              </button>
            </div>
            <div className="mt-3 rounded-2xl border border-primary/15 bg-background/40 p-3">
              <p className="text-xs font-semibold text-primary">Active offer</p>
              <p className="mt-1 text-sm font-medium">Complete 3 tasks today and unlock a 25 FXC bonus.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export function EnergyPill({ value, max }: { value: number; max: number }) {
  return (
    <div className="glass flex items-center gap-1.5 rounded-full px-2.5 py-1">
      <Zap className="size-3.5 fill-primary text-primary" />
      <span className="text-xs font-semibold tabular-nums">
        {value}/{max}
      </span>
    </div>
  )
}
