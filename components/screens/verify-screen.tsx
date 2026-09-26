'use client'

import { useState } from 'react'
import { ArrowLeft, Check, CircleCheck, LockKeyhole, Phone, ShieldCheck, WalletCards } from 'lucide-react'
import { motion } from 'motion/react'

export function VerifyScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [cryptoWallet, setCryptoWallet] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const ready = phone.length >= 6 && Boolean(gender) && password.length >= 4 && cryptoWallet
  const connectWallet = () => { setConnecting(true); window.setTimeout(() => { setConnecting(false); setCryptoWallet(true) }, 800) }

  return <div className="min-h-screen px-4 pb-8 pt-4">
    <div className="flex items-center justify-between"><button onClick={onBack} aria-label="Back" className="glass flex size-10 items-center justify-center rounded-2xl"><ArrowLeft className="size-5" /></button><h1 className="font-heading text-base font-semibold">Verify profile</h1><span className="size-10" /></div>
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-7 text-center"><div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-primary/15 text-primary"><ShieldCheck className="size-10" /></div><h2 className="mt-5 font-heading text-2xl font-bold">Become verified</h2><p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">Complete both wallets and your profile details to receive +500 FXC.</p></motion.div>
    <div className="glass mt-6 space-y-3 rounded-3xl p-4"><Info label="Name" value="Rakib Hassan" /><Info label="Account ID" value="FXC-RAKIB-2048" /><Info label="Reward" value="+500 FXC" accent /></div>
    <div className="mt-5 space-y-3"><label className="block text-sm font-semibold"><span className="mb-2 flex items-center gap-2"><Phone className="size-4 text-primary" />Phone verification</span><input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="Enter phone number" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary" /></label><label className="block text-sm font-semibold">Gender<select value={gender} onChange={(e) => setGender(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary"><option value="">Select gender</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select></label><label className="block text-sm font-semibold"><span className="mb-2 flex items-center gap-2"><LockKeyhole className="size-4 text-primary" />Bit wallet password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Set wallet password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary" /></label></div>
    <div className="mt-5 space-y-3"><WalletCard title="Bit wallet" description="Password protected FXC wallet" connected /><WalletCard title="Crypto wallet" description="Connect an external crypto wallet" connected={cryptoWallet} action={!cryptoWallet ? connectWallet : undefined} connecting={connecting} /></div>
    <button disabled={!ready} onClick={onComplete} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"><Check className="size-4" />Complete verification</button>
  </div>
}

function WalletCard({ title, description, connected, action, connecting }: { title: string; description: string; connected: boolean; action?: () => void; connecting?: boolean }) { return <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"><span className={`flex size-10 items-center justify-center rounded-xl ${connected ? 'bg-primary/15 text-primary' : 'bg-white/10 text-muted-foreground'}`}><WalletCards className="size-5" /></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted-foreground">{description}</p></div>{connected ? <CircleCheck className="size-5 text-primary" aria-label={`${title} connected`} /> : <button onClick={action} className="rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">{connecting ? 'Connecting...' : 'Connect'}</button>}</div> }
function Info({ label, value, accent }: { label: string; value: string; accent?: boolean }) { return <div className="flex items-center justify-between rounded-2xl bg-background/40 px-3 py-3"><span className="text-sm text-muted-foreground">{label}</span><span className={`text-sm font-semibold ${accent ? 'text-primary' : ''}`}>{value}</span></div> }
