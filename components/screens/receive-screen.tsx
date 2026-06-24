'use client'

import { useState } from 'react'
import { ArrowLeft, Check, Copy, QrCode, Share2 } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { USER } from '@/lib/data'

const ADDRESS = 'fxc1q9k4z8rakib7m2v0p3xq5h'

export function ReceiveScreen({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard?.writeText(ADDRESS).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="flex min-h-screen flex-col px-4 pb-6 pt-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="glass flex size-10 items-center justify-center rounded-2xl transition active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="font-heading text-base font-semibold">Receive BILLS</h1>
        <span className="size-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 flex flex-col items-center"
      >
        {/* QR card */}
        <div className="glass relative w-full max-w-xs rounded-[2rem] p-6">
          <div className="pointer-events-none absolute -left-6 -top-8 size-32 rounded-full bg-primary/20 blur-2xl" />
          <div className="relative flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Image src="/images/fxc-coin.png" alt="" width={28} height={28} className="size-7 object-contain" />
              <span className="font-heading text-lg font-bold">FXC BILLS</span>
            </div>

            {/* faux QR */}
            <div className="relative mt-5 rounded-3xl bg-foreground p-4">
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 49 }).map((_, i) => {
                  const on = [0, 1, 2, 5, 6, 7, 9, 12, 14, 16, 18, 20, 21, 24, 26, 28, 30, 33, 35, 36, 40, 42, 43, 44, 47, 48].includes(i)
                  return (
                    <span
                      key={i}
                      className={`size-5 rounded-[3px] ${on ? 'bg-background' : 'bg-transparent'}`}
                    />
                  )
                })}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary">
                  <QrCode className="size-5 text-primary-foreground" />
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm font-medium">{USER.name}</p>
            <p className="text-xs text-muted-foreground">{USER.username}</p>
          </div>
        </div>

        {/* Address */}
        <div className="mt-5 w-full max-w-xs">
          <p className="mb-1.5 text-xs text-muted-foreground">Your wallet address</p>
          <button
            onClick={copy}
            className="glass flex w-full items-center gap-3 rounded-2xl p-3.5 text-left transition active:scale-[0.99]"
          >
            <span className="min-w-0 flex-1 truncate font-mono text-sm">{ADDRESS}</span>
            {copied ? (
              <Check className="size-5 shrink-0 text-primary" />
            ) : (
              <Copy className="size-5 shrink-0 text-muted-foreground" />
            )}
          </button>
        </div>
      </motion.div>

      <div className="mt-auto flex gap-3 pt-8">
        <button
          onClick={copy}
          className="glass flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 font-semibold transition active:scale-95"
        >
          <Copy className="size-4" /> {copied ? 'Copied' : 'Copy'}
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition active:scale-95">
          <Share2 className="size-4" /> Share
        </button>
      </div>
    </div>
  )
}
