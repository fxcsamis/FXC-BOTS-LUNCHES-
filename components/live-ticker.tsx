'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LIVE_EARNERS } from '@/lib/data'
import { formatBills } from '@/lib/format'

// Deterministic lime/emerald-ish avatar tints so each user keeps its color
const TINTS = [
  'bg-primary/25 text-primary',
  'bg-emerald-400/25 text-emerald-300',
  'bg-lime-400/25 text-lime-300',
  'bg-teal-400/25 text-teal-300',
  'bg-green-400/25 text-green-300',
]

/**
 * Tiny transparent "live earners" ticker.
 * Shows one earner at a time, sliding up and out while the next rises from below,
 * so it reads as a continuous stream of people earning right now.
 */
export function LiveTicker({ className = '' }: { className?: string }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % LIVE_EARNERS.length), 1800)
    return () => clearInterval(t)
  }, [])

  const e = LIVE_EARNERS[i]
  const tint = TINTS[i % TINTS.length]

  return (
    <div
      className={`relative flex h-5 items-center overflow-hidden ${className}`}
      aria-live="polite"
    >
      {/* live dot */}
      <span className="relative mr-1.5 flex size-1.5 shrink-0 items-center justify-center">
        <span className="absolute size-1.5 animate-ping rounded-full bg-primary/70" />
        <span className="size-1 rounded-full bg-primary" />
      </span>

      <div className="relative h-5 flex-1 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={e.id + i}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center gap-1.5"
          >
            <span
              className={`flex size-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold ${tint}`}
            >
              {e.initial}
            </span>
            <span className="truncate text-[10px] font-medium text-foreground/80">
              {e.name}
            </span>
            <span className="ml-auto shrink-0 font-mono text-[10px] font-semibold text-primary">
              +{formatBills(e.amount)}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
