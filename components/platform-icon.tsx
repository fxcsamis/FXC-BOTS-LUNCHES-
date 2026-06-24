import { Pickaxe, Users } from 'lucide-react'
import type { Task } from '@/lib/data'

type SvgProps = { className?: string }

function Telegram({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.94 4.6 18.7 19.86c-.24 1.08-.88 1.35-1.78.84l-4.92-3.63-2.37 2.28c-.26.26-.48.48-.99.48l.35-5.01 9.1-8.22c.4-.35-.08-.55-.62-.2L4.22 13.16l-4.85-1.52C-1.68 11.28-1.71 10.5.7 9.55l20-7.7c.88-.32 1.65.2 1.24 2.75Z" transform="translate(2 0)" />
    </svg>
  )
}
function FacebookGlyph({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  )
}
function XGlyph({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.83L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  )
}
function TikTok({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.3v13.05a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .73-5.07v-3.4a5.9 5.9 0 0 0-.73-.05A5.92 5.92 0 1 0 15.27 16V9.4a7.56 7.56 0 0 0 4.42 1.42V7.5a4.27 4.27 0 0 1-3.09-1.68Z" />
    </svg>
  )
}
function InstagramGlyph({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

const MAP: Record<
  Task['platform'],
  { Glyph: (p: SvgProps) => React.ReactNode; color: string; bg: string }
> = {
  telegram: { Glyph: Telegram, color: 'text-sky-300', bg: 'bg-sky-500/15' },
  facebook: { Glyph: FacebookGlyph, color: 'text-blue-300', bg: 'bg-blue-500/15' },
  twitter: { Glyph: XGlyph, color: 'text-foreground', bg: 'bg-white/10' },
  tiktok: { Glyph: TikTok, color: 'text-pink-300', bg: 'bg-pink-500/15' },
  instagram: { Glyph: InstagramGlyph, color: 'text-rose-300', bg: 'bg-rose-500/15' },
  mining: { Glyph: (p) => <Pickaxe className={p.className} />, color: 'text-primary', bg: 'bg-primary/15' },
  app: { Glyph: (p) => <Users className={p.className} />, color: 'text-primary', bg: 'bg-primary/15' },
}

export function PlatformIcon({
  platform,
  className = 'size-11',
}: {
  platform: Task['platform']
  className?: string
}) {
  const { Glyph, color, bg } = MAP[platform]
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-2xl ${bg} ${className}`}>
      <span className={color}>
        <Glyph className="size-5" />
      </span>
    </div>
  )
}
