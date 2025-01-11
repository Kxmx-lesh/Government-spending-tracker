import { NavBar } from '@/components/nav-bar'
import { HeroSection } from '@/components/hero-section'
import { WalletConnect } from '@/components/wallet-connect'
import { SpendingForm } from '@/components/spending-form'
import { SpendingChart } from '@/components/spending-chart'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <WalletConnect />
        </div>
        <HeroSection />
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Submit Spending Record</h2>
            <SpendingForm />
          </div>
          <div>
            <SpendingChart />
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
 </main>
)
}