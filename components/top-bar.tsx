'use client'

import { Bell, Plus, Settings, Zap } from 'lucide-react'
import Image from 'next/image'
import { formatBills } from '@/lib/format'

export function TopBar({
  balance,
  onAdd,
}: {
  balance: number
  onAdd?: () => void
}) {
  return (
    <header className="sticky top-0 z-30 px-4 pb-2 pt-3">
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-background via-background/85 to-transparent" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="glass flex size-10 items-center justify-center rounded-2xl text-muted-foreground transition active:scale-95"
            aria-label="Settings"
          >
            <Settings className="size-[18px]" />
          </button>
          <button
            className="glass relative flex size-10 items-center justify-center rounded-2xl text-muted-foreground transition active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary ring-2 ring-background" />
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
          <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
            {formatBills(balance)}
          </span>
          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Plus className="size-4" strokeWidth={2.5} />
          </span>
        </button>
      </div>
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
