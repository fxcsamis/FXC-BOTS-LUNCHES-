'use client'

import { useState } from 'react'
import { Check, ChevronRight, Flame, Pickaxe } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { PlatformIcon } from '@/components/platform-icon'
import { TASKS, type Task } from '@/lib/data'
import { formatBills } from '@/lib/format'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const STREAK = [true, true, true, true, false, false, false]

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

export function TasksScreen() {
  const [done, setDone] = useState<Record<string, boolean>>(
    Object.fromEntries(TASKS.filter((t) => t.done).map((t) => [t.id, true])),
  )

  const social = TASKS.filter((t) => t.platform !== 'app')
  const special = TASKS.filter((t) => t.platform === 'app')

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.05 }}
      className="space-y-5 px-4"
    >
      <motion.div variants={item} className="pt-1">
        <h1 className="font-heading text-2xl font-bold">Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Earn FXC BILLS by completing actions
        </p>
      </motion.div>

      {/* Streak card */}
      <motion.div variants={item} className="glass rounded-3xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-400">
              <Flame className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">7-Day Streak</p>
              <p className="text-xs text-muted-foreground">Keep it going!</p>
            </div>
          </div>
          <button className="rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition active:scale-95">
            Claim +100
          </button>
        </div>
        <div className="flex justify-between">
          {DAYS.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span
                className={`flex size-9 items-center justify-center rounded-2xl text-xs font-semibold ${
                  STREAK[i]
                    ? 'bg-primary text-primary-foreground'
                    : 'glass text-muted-foreground'
                }`}
              >
                {STREAK[i] ? <Check className="size-4" strokeWidth={3} /> : d}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mining banner */}
      <motion.div variants={item}>
        <div className="glass relative flex items-center gap-3 overflow-hidden rounded-3xl p-4">
          <div className="pointer-events-none absolute -left-6 -top-8 size-32 rounded-full bg-primary/20 blur-2xl" />
          <Image
            src="/images/mining-3d.png"
            alt=""
            width={64}
            height={64}
            className="relative size-16 object-contain"
          />
          <div className="relative flex-1">
            <p className="font-heading text-base font-semibold">Mining Active</p>
            <p className="text-xs text-muted-foreground">+12 BILLS / hour · 4h left</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-primary" />
            </div>
          </div>
          <button className="relative flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition active:scale-90">
            <Pickaxe className="size-5" />
          </button>
        </div>
      </motion.div>

      {/* Social tasks */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="font-heading text-base font-semibold">Social Tasks</h2>
        <div className="space-y-2.5">
          {social.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              done={!!done[t.id]}
              onToggle={() => setDone((d) => ({ ...d, [t.id]: !d[t.id] }))}
            />
          ))}
        </div>
      </motion.div>

      {/* Special tasks */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="font-heading text-base font-semibold">Special</h2>
        <div className="space-y-2.5">
          {special.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              done={!!done[t.id]}
              onToggle={() => setDone((d) => ({ ...d, [t.id]: !d[t.id] }))}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function TaskRow({
  task,
  done,
  onToggle,
}: {
  task: Task
  done: boolean
  onToggle: () => void
}) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} className="glass flex items-center gap-3 rounded-3xl p-3">
      <PlatformIcon platform={task.platform} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{task.title}</p>
        <p className="truncate text-xs text-muted-foreground">{task.desc}</p>
        {typeof task.progress === 'number' && (
          <div className="mt-1.5 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{task.progress}%</span>
          </div>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="flex items-center gap-1 font-mono text-xs font-semibold text-primary">
          <Image src="/images/fxc-coin.png" alt="" width={14} height={14} className="size-3.5" />
          +{formatBills(task.reward)}
        </span>
        <button
          onClick={onToggle}
          className={`flex h-7 items-center gap-1 rounded-full px-3 text-[11px] font-semibold transition active:scale-95 ${
            done
              ? 'bg-primary/15 text-primary'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          {done ? (
            <>
              <Check className="size-3.5" strokeWidth={3} /> Done
            </>
          ) : (
            <>
              Go <ChevronRight className="size-3.5" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
