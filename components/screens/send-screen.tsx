'use client'

import { useState } from 'react'
import { ArrowLeft, Check, Delete, QrCode, ScanLine, ShieldCheck, UserRound, X } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { CONTACTS, USER } from '@/lib/data'
import { formatBills } from '@/lib/format'

const QUICK = [100, 500, 1000]
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del']

type Step = 'amount' | 'recipient' | 'password' | 'success'

export function SendScreen({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState('0')
  const [selected, setSelected] = useState(CONTACTS[0].id)
  const [step, setStep] = useState<Step>('amount')
  const [recipientMode, setRecipientMode] = useState<'qr' | 'manual'>('qr')
  const [accountId, setAccountId] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [scannerOpen, setScannerOpen] = useState(false)
  const [regular, setRegular] = useState(false)
  const [password, setPassword] = useState('')

  const press = (k: string) => setAmount((prev) => {
    if (k === 'del') return prev.length <= 1 ? '0' : prev.slice(0, -1)
    if (k === '.') return prev.includes('.') ? prev : `${prev}.`
    if (prev === '0') return k
    return prev.length >= 9 ? prev : `${prev}${k}`
  })
  const numeric = Number.parseFloat(amount) || 0
  const fee = numeric > 0 ? Math.max(1, Math.round(numeric * 0.01)) : 0
  const contact = CONTACTS.find((item) => item.id === selected) ?? CONTACTS[0]

  if (step === 'success') return <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center"><motion.div initial={{ scale: .6 }} animate={{ scale: 1 }} className="flex size-24 items-center justify-center rounded-full bg-primary glow-primary"><Check className="size-12 text-primary-foreground" strokeWidth={3} /></motion.div><h1 className="mt-6 font-heading text-2xl font-bold">Transfer complete</h1><p className="mt-1 text-muted-foreground">{formatBills(numeric)} FXC sent to {contact.name}</p><p className="mt-3 text-xs text-muted-foreground">{regular ? 'Added to your regular transactions.' : 'You can add this user later from your regular transactions.'}</p><button onClick={onBack} className="mt-8 w-full max-w-xs rounded-2xl bg-primary py-4 font-semibold text-primary-foreground">Back to wallet</button></div>

  return <div className="flex min-h-screen flex-col px-4 pb-6 pt-4">
    <Header title={step === 'password' ? 'Confirm transfer' : 'Send FXC'} onBack={onBack} />
    {step === 'password' ? <PasswordStep password={password} setPassword={setPassword} onConfirm={() => setStep('success')} /> : step === 'recipient' ? <RecipientStep mode={recipientMode} setMode={setRecipientMode} accountId={accountId} setAccountId={setAccountId} transactionId={transactionId} setTransactionId={setTransactionId} scannerOpen={scannerOpen} setScannerOpen={setScannerOpen} onContinue={() => setStep('password')} /> : <>
      <div className="mt-6 flex flex-col items-center"><p className="text-xs text-muted-foreground">Amount to send</p><div className="mt-2 flex items-center gap-2"><Image src="/images/fxc-coin.png" alt="FXC" width={32} height={32} className="size-8 object-contain" /><span className="font-heading text-5xl font-bold tabular-nums">{amount}</span></div><p className="mt-2 text-xs text-muted-foreground">Balance: {formatBills(USER.balance)} FXC · Fee {fee}</p></div>
      <div className="mt-5 flex justify-center gap-2">{QUICK.map((q) => <button key={q} onClick={() => setAmount(String(q))} className="glass rounded-full px-4 py-2 text-sm font-medium">+{q}</button>)}</div>
      <div className="mt-6"><p className="mb-2 text-sm font-semibold">Send to</p><div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">{CONTACTS.slice(0, 10).map((c) => <button key={c.id} onClick={() => setSelected(c.id)} className="flex shrink-0 flex-col items-center gap-1.5"><span className={`flex size-14 items-center justify-center rounded-2xl text-lg font-semibold ${selected === c.id ? 'bg-primary text-primary-foreground glow-primary' : 'glass'}`}>{c.initial}</span><span className="text-[11px] text-muted-foreground">{c.name}</span></button>)}</div></div>
      <div className="mt-auto grid grid-cols-3 gap-2 pt-6">{KEYS.map((k) => <button key={k} onClick={() => press(k)} className="flex h-14 items-center justify-center rounded-2xl text-xl font-semibold">{k === 'del' ? <Delete className="size-6 text-muted-foreground" /> : k}</button>)}</div>
      <button disabled={numeric <= 0} onClick={() => setStep('recipient')} className="mt-4 w-full rounded-2xl bg-primary py-4 font-semibold text-primary-foreground disabled:opacity-40">Send {numeric > 0 ? `${formatBills(numeric)} FXC` : ''}</button>
    </>}
  </div>
}

function RecipientStep({ mode, setMode, accountId, setAccountId, transactionId, setTransactionId, scannerOpen, setScannerOpen, onContinue }: any) { return <div className="mt-8"><div className="glass rounded-3xl p-4"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Recipient verification</p><h2 className="mt-2 font-heading text-xl font-bold">Choose how to identify</h2></div><button onClick={() => setMode('qr')} className="text-muted-foreground"><X className="size-5" /></button></div><div className="mt-5 grid grid-cols-2 gap-2"><button onClick={() => setMode('qr')} className={`rounded-2xl p-3 text-left text-sm font-semibold ${mode === 'qr' ? 'bg-primary text-primary-foreground' : 'bg-background/50'}`}><QrCode className="mb-2 size-5" />Use QR code<span className="mt-1 block text-[11px] font-normal opacity-75">Recommended</span></button><button onClick={() => setMode('manual')} className={`rounded-2xl p-3 text-left text-sm font-semibold ${mode === 'manual' ? 'bg-primary text-primary-foreground' : 'bg-background/50'}`}><UserRound className="mb-2 size-5" />Manual ID</button></div>{mode === 'qr' ? <><button onClick={() => setScannerOpen(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/30 py-4 font-semibold text-primary"><ScanLine className="size-5" />Open phone QR scanner</button><p className="mt-3 text-center text-xs text-muted-foreground">Scan the recipient&apos;s QR code to continue.</p></> : <><input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Enter transaction ID" className="mt-5 w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-4 text-sm outline-none focus:border-primary" /><p className="mt-3 text-xs text-muted-foreground">Use the transaction ID shared by the recipient.</p></>}<button disabled={mode === 'manual' && !transactionId} onClick={onContinue} className="mt-5 w-full rounded-2xl bg-primary py-4 font-semibold text-primary-foreground disabled:opacity-40">Verify recipient</button></div>{scannerOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-5"><div className="glass w-full max-w-sm rounded-3xl p-5 text-center"><button onClick={() => setScannerOpen(false)} className="ml-auto block"><X /></button><div className="mx-auto mt-2 flex aspect-square max-w-[250px] items-center justify-center rounded-3xl border-2 border-dashed border-primary bg-primary/5"><ScanLine className="size-20 text-primary" /></div><h2 className="mt-5 font-heading text-lg font-bold">Scan account QR</h2><button onClick={() => { setScannerOpen(false); setAccountId('FXC-RAKIB-2048') }} className="mt-5 w-full rounded-2xl bg-primary py-3 font-semibold text-primary-foreground">QR scanned</button></div></div>}</div> }
function PasswordStep({ password, setPassword, onConfirm }: any) { return <div className="mt-10"><div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-primary/15 text-primary"><ShieldCheck className="size-10" /></div><h2 className="mt-5 text-center font-heading text-2xl font-bold">Enter wallet password</h2><p className="mt-2 text-center text-sm text-muted-foreground">Confirm with your wallet password. Coins will transfer shortly.</p><input type="password" inputMode="numeric" maxLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Wallet password" className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-lg tracking-[0.5em] outline-none focus:border-primary" /><button disabled={password.length < 4} onClick={onConfirm} className="mt-4 w-full rounded-2xl bg-primary py-4 font-semibold text-primary-foreground disabled:opacity-40">Confirm and send</button></div> }
function Header({ title, onBack }: { title: string; onBack: () => void }) { return <div className="flex items-center justify-between"><button onClick={onBack} aria-label="Back" className="glass flex size-10 items-center justify-center rounded-2xl"><ArrowLeft className="size-5" /></button><h1 className="font-heading text-base font-semibold">{title}</h1><span className="size-10" /></div> }

export { CONTACTS }
