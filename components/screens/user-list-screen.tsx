'use client'

import { ArrowLeft, BadgeCheck, Search, Users } from 'lucide-react'
import { motion } from 'motion/react'

const PEOPLE = Array.from({ length: 56 }, (_, index) => {
  const names = ['Nayeem', 'Sadia_99', 'Tania', 'Arif', 'Mim', 'Rdx_77', 'Lima', 'CryptoKing']
  const name = names[index % names.length]
  return { id: index + 1, name: index < names.length ? name : `${name}${index + 1}`, username: `@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`, initial: name[0], verified: index % 3 !== 1, score: 98420 - index * 1130 }
})

export function UserListScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen px-4 pb-8 pt-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} aria-label="Back" className="glass flex size-10 items-center justify-center rounded-2xl"><ArrowLeft className="size-5" /></button>
        <h1 className="font-heading text-base font-semibold">All users</h1>
        <span className="size-10" />
      </div>
      <div className="mt-6 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary"><Users className="size-7" /></div>
        <h2 className="mt-3 font-heading text-2xl font-bold">FXC community</h2>
        <p className="mt-1 text-sm text-muted-foreground">Discover 50+ active users</p>
      </div>
      <label className="glass mt-5 flex items-center gap-2 rounded-2xl px-4 py-3"><Search className="size-4 text-muted-foreground" /><span className="sr-only">Search users</span><input placeholder="Search users" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" /></label>
      <div className="mt-4 space-y-2">
        {PEOPLE.map((person, index) => <motion.div key={person.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.015, 0.3) }} className="glass flex items-center gap-3 rounded-2xl p-3"><span className="flex size-11 items-center justify-center rounded-full bg-primary/15 font-heading font-bold text-primary">{person.initial}</span><div className="min-w-0 flex-1"><div className="flex items-center gap-1.5"><p className="truncate text-sm font-semibold">{person.name}</p>{person.verified && <BadgeCheck className="size-4 fill-primary text-background" aria-label="Verified" />}</div><p className="text-xs text-muted-foreground">{person.username}</p></div><div className="text-right"><p className="font-mono text-xs font-semibold text-primary">{person.score.toLocaleString()}</p><p className="text-[10px] text-muted-foreground">FXC score</p></div></motion.div>)}
      </div>
    </div>
  )
}
