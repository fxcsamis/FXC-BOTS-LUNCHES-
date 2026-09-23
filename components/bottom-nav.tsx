'use client'

import { House, ListChecks, Pickaxe, User, Wallet, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'

export type Screen =
  | 'dashboard'
  | 'home'
  | 'tasks'
  | 'profile'
  | 'send'
  | 'receive'
  | 'mining'
  | 'invite'
  | 'battle'

const SIDE_LEFT: { id: Screen; label: string; Icon: LucideIcon }[] = [
  { id: 'home', label: 'Wallet', Icon: Wallet },
  { id: 'tasks', label: 'Tasks', Icon: ListChecks },
]
const SIDE_RIGHT: { id: Screen; label: string; Icon: LucideIcon }[] = [
  { id: 'mining', label: 'Mining', Icon: Pickaxe },
  { id: 'profile', label: 'Profile', Icon: User },
]

function NavItem({
  id,
  label,
  Icon,
  active,
  onChange,
}: {
  id: Screen
  label: string
  Icon: LucideIcon
  active: boolean
  onChange: (s: Screen) => void
}) {
  return (
    <button
      onClick={() => onChange(id)}
      className="relative flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 transition active:scale-90"
      aria-current={active ? 'page' : undefined}
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-xl bg-primary/15"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
      <Icon
        className={`relative size-[17px] transition-colors ${
          active ? 'text-primary' : 'text-muted-foreground'
        }`}
        strokeWidth={active ? 2.4 : 2}
      />
      <span
        className={`relative text-[9px] font-medium transition-colors ${
          active ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        {label}
      </span>
    </button>
  )
}

export function BottomNav({
  active,
  onChange,
}: {
  active: Screen
  onChange: (s: Screen) => void
}) {
  const homeActive = active === 'dashboard'
  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-3">
      <div className="glass-strong pointer-events-auto flex w-full max-w-md items-center gap-1 rounded-[26px] px-2 py-1.5 shadow-2xl">
        {SIDE_LEFT.map((it) => (
          <NavItem key={it.id} {...it} active={active === it.id} onChange={onChange} />
        ))}

        {/* Center home — larger & highlighted */}
        <div className="flex flex-1 justify-center">
          <button
            onClick={() => onChange('dashboard')}
            className="relative -mt-7 flex flex-col items-center"
            aria-label="Home"
            aria-current={homeActive ? 'page' : undefined}
          >
            <motion.span
              whileTap={{ scale: 0.92 }}
              className={`flex size-14 items-center justify-center rounded-2xl border-4 border-background transition ${
                homeActive
                  ? 'bg-primary text-primary-foreground glow-primary'
                  : 'bg-primary/90 text-primary-foreground'
              }`}
            >
              <House className="size-6" strokeWidth={2.4} />
            </motion.span>
            <span
              className={`mt-0.5 text-[9px] font-semibold ${
                homeActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </span>
          </button>
        </div>

        {SIDE_RIGHT.map((it) => (
          <NavItem key={it.id} {...it} active={active === it.id} onChange={onChange} />
        ))}
      </div>
    </nav>
  )
}
