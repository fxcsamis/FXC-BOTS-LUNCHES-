'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Check,
  Copy,
  Gift,
  QrCode,
  Share2,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { LiveTicker } from '@/components/live-ticker'
import { REFERRAL, REFERRALS } from '@/lib/data'
import { formatBills } from '@/lib/format'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 26 } },
} as const

export function InviteScreen({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)

  const copy = () => {
    navigator.clipboard?.writeText(REFERRAL.link).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="relative min-h-screen px-4 pb-10 pt-4">
      {/* header with tiny ticker top-left */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="glass flex size-10 items-center justify-center rounded-2xl transition active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-heading text-base font-semibold">Invite Friends</h1>
        <span className="size-10" />
      </div>

      {/* transparent tiny live ticker, top-left aligned */}
      <div className="mt-2 flex">
        <div className="w-40 max-w-[55%]">
          <LiveTicker />
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="mt-4 space-y-4">
        {/* Hero */}
        <motion.div variants={item} className="glass relative overflow-hidden rounded-3xl p-5 text-center">
          <div className="pointer-events-none absolute -right-10 -top-12 size-44 rounded-full bg-primary/25 blur-3xl" />
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative mx-auto w-fit"
          >
            <Image
              src="/images/mascot.png"
              alt="FXC fox"
              width={88}
              height={88}
              className="size-20 object-contain drop-shadow-[0_8px_24px_rgba(132,204,22,0.35)]"
            />
          </motion.div>
          <h2 className="relative mt-2 font-heading text-lg font-bold text-balance">
            Invite friends, earn together
          </h2>
          <p className="relative mx-auto mt-1 max-w-xs text-pretty text-xs text-muted-foreground">
            Share your personal link and get{' '}
            <span className="font-semibold text-primary">{REFERRAL.perInvite} FXC BILLS</span> for
            every friend who joins and starts mining.
          </p>

          {/* invite stats (no main balance) */}
          <div className="relative mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <p className="flex items-center justify-center gap-1 font-heading text-lg font-bold tabular-nums text-primary">
                <Users className="size-4" /> {REFERRAL.totalInvited}
              </p>
              <p className="text-[10px] text-muted-foreground">Friends invited</p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <p className="flex items-center justify-center gap-1 font-heading text-lg font-bold tabular-nums text-primary">
                <Gift className="size-4" /> {formatBills(REFERRAL.totalEarned)}
              </p>
              <p className="text-[10px] text-muted-foreground">BILLS from referrals</p>
            </div>
          </div>
        </motion.div>

        {/* Invite link */}
        <motion.div variants={item} className="space-y-2">
          <p className="text-xs text-muted-foreground">Your invite link</p>
          <button
            onClick={copy}
            className="glass flex w-full items-center gap-3 rounded-2xl p-3.5 text-left transition active:scale-[0.99]"
          >
            <span className="min-w-0 flex-1 truncate font-mono text-sm">{REFERRAL.link}</span>
            {copied ? (
              <Check className="size-5 shrink-0 text-primary" />
            ) : (
              <Copy className="size-5 shrink-0 text-muted-foreground" />
            )}
          </button>
          <p className="text-[11px] text-muted-foreground">
            Referral code: <span className="font-mono font-semibold text-foreground">{REFERRAL.code}</span>
          </p>
        </motion.div>

        {/* Invited by */}
        <motion.div variants={item} className="space-y-2">
          <h3 className="font-heading text-sm font-semibold">Your inviter</h3>
          <div className="glass flex items-center gap-3 rounded-2xl p-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
              {REFERRAL.invitedBy.initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{REFERRAL.invitedBy.name}</p>
              <p className="truncate text-xs text-muted-foreground">{REFERRAL.invitedBy.username}</p>
            </div>
            <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
              Inviter
            </span>
          </div>
        </motion.div>

        {/* Friends earn history */}
        <motion.div variants={item} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold">Friends earn history</h3>
            <span className="text-[11px] text-muted-foreground">{REFERRALS.length} friends</span>
          </div>
          <div className="glass space-y-1 rounded-3xl p-2">
            {REFERRALS.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-2xl p-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {r.initial}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{r.time}</p>
                </div>
                {r.status === 'active' ? (
                  <span className="shrink-0 font-mono text-sm font-semibold text-primary">
                    +{formatBills(r.earned)}
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Pending
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Two action buttons: Invite friend + QR code */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'Join FXC', url: REFERRAL.link }).catch(() => {})
            } else {
              copy()
            }
          }}
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition active:scale-95"
        >
          <UserPlus className="size-4" /> Invite Friend
        </button>
        <button
          onClick={() => setShowQr(true)}
          className="glass flex items-center justify-center gap-2 rounded-2xl py-4 font-semibold transition active:scale-95"
        >
          <QrCode className="size-4" /> QR Code
        </button>
      </div>

      {/* QR modal */}
      <AnimatePresence>
        {showQr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQr(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-xs rounded-[2rem] p-6"
            >
              <button
                onClick={() => setShowQr(false)}
                className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/10 transition active:scale-90"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <Image src="/images/fxc-coin.png" alt="" width={24} height={24} className="size-6 object-contain" />
                  <span className="font-heading text-base font-bold">Scan to join</span>
                </div>
                <div className="relative mt-5 rounded-3xl bg-foreground p-4">
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 49 }).map((_, i) => {
                      const on = [0, 1, 2, 5, 6, 7, 9, 12, 14, 16, 18, 20, 21, 24, 26, 28, 30, 33, 35, 36, 40, 42, 43, 44, 47, 48].includes(i)
                      return (
                        <span key={i} className={`size-5 rounded-[3px] ${on ? 'bg-background' : 'bg-transparent'}`} />
                      )
                    })}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-primary">
                      <QrCode className="size-5 text-primary-foreground" />
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-center font-mono text-xs text-muted-foreground">{REFERRAL.code}</p>
                <button
                  onClick={copy}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition active:scale-95"
                >
                  <Share2 className="size-4" /> {copied ? 'Link copied' : 'Share link'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
