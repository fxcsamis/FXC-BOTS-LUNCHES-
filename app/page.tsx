'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BottomNav, type Screen } from '@/components/bottom-nav'
import { TopBar } from '@/components/top-bar'
import { HomeScreen } from '@/components/screens/home-screen'
import { DashboardScreen } from '@/components/screens/dashboard-screen'
import { TasksScreen } from '@/components/screens/tasks-screen'
import { ProfileScreen } from '@/components/screens/profile-screen'
import { SendScreen } from '@/components/screens/send-screen'
import { ReceiveScreen } from '@/components/screens/receive-screen'
import { MiningScreen } from '@/components/screens/mining-screen'
import { InviteScreen } from '@/components/screens/invite-screen'
import { BattleScreen } from '@/components/screens/battle-screen'
import { SwapScreen } from '@/components/screens/swap-screen'
import { FundingScreen } from '@/components/screens/funding-screen'
import { USER } from '@/lib/data'

const TABS: Screen[] = ['dashboard', 'home', 'tasks', 'mining', 'profile']

export default function Page() {
  const [screen, setScreen] = useState<Screen>('dashboard')
  const isTab = TABS.includes(screen)

  useEffect(() => {
    const ping = () => void fetch('/api/keep-alive', { cache: 'no-store' }).catch(() => undefined)
    ping()
    const interval = window.setInterval(ping, 5 * 60 * 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-background">
      {/* ambient background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-20 top-0 size-72 rounded-full bg-primary/10 blur-[90px]" />
        <div className="absolute -right-24 top-1/3 size-72 rounded-full bg-emerald-500/10 blur-[90px]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        {isTab && <TopBar balance={USER.balance} onAdd={() => setScreen('receive')} />}

        <main className={`flex-1 ${isTab ? 'pb-28 pt-1' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {screen === 'dashboard' && <DashboardScreen onNavigate={setScreen} />}
              {screen === 'home' && <HomeScreen onNavigate={setScreen} />}
              {screen === 'tasks' && <TasksScreen />}
              {screen === 'profile' && <ProfileScreen onNavigate={setScreen} />}
              {screen === 'send' && <SendScreen onBack={() => setScreen('home')} />}
              {screen === 'receive' && <ReceiveScreen onBack={() => setScreen('home')} />}
              {screen === 'mining' && <MiningScreen onBack={() => setScreen('dashboard')} />}
              {screen === 'invite' && <InviteScreen onBack={() => setScreen('dashboard')} />}
              {screen === 'battle' && <BattleScreen onBack={() => setScreen('dashboard')} />}
              {screen === 'swap' && <SwapScreen onBack={() => setScreen('home')} />}
              {screen === 'topup' && <FundingScreen mode="topup" onBack={() => setScreen('home')} />}
              {screen === 'withdraw' && <FundingScreen mode="withdraw" onBack={() => setScreen('home')} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {isTab && <BottomNav active={screen} onChange={setScreen} />}
      </div>
    </div>
  )
}
