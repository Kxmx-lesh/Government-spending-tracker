'use client'

import { useEthereum } from '@/hooks/useEthereum'
import { Button } from '@/components/ui/button'

export function WalletConnect() {
  const { address } = useEthereum()

  return (
    <div>
      {address ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Button onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
          Connect Wallet
        </Button>
      )}
    </div>
  )
}