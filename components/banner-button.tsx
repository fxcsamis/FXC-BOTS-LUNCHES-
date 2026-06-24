'use client'

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'

export function BannerButton({
  title,
  subtitle,
  image,
  accent = false,
  badge,
  onClick,
}: {
  title: string
  subtitle: string
  image: string
  accent?: boolean
  badge?: string
  onClick?: () => void
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative flex w-full items-center gap-3 overflow-hidden rounded-3xl p-4 text-left ${
        accent
          ? 'bg-primary text-primary-foreground'
          : 'glass text-foreground'
      }`}
    >
      {/* decorative glow */}
      <div
        className={`pointer-events-none absolute -right-6 -top-10 size-32 rounded-full blur-2xl ${
          accent ? 'bg-white/25' : 'bg-primary/20'
        }`}
      />
      <div className="relative size-14 shrink-0">
        <Image
          src={image}
          alt=""
          width={56}
          height={56}
          className="size-14 object-contain drop-shadow-lg"
        />
      </div>
      <div className="relative min-w-0 flex-1">
        {badge && (
          <span
            className={`mb-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              accent ? 'bg-black/15' : 'bg-primary/15 text-primary'
            }`}
          >
            {badge}
          </span>
        )}
        <p className="truncate text-[15px] font-semibold leading-tight font-heading">
          {title}
        </p>
        <p
          className={`mt-0.5 truncate text-xs ${
            accent ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}
        >
          {subtitle}
        </p>
      </div>
      <span
        className={`relative flex size-8 shrink-0 items-center justify-center rounded-full ${
          accent ? 'bg-black/15' : 'bg-white/10'
        }`}
      >
        <ChevronRight className="size-4" />
      </span>
    </motion.button>
  )
}
