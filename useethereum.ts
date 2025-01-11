import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export function useEthereum() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const address = await signer.getAddress()
          const network = await provider.getNetwork()

          setProvider(provider)
          setSigner(signer)
          setAddress(address)
          setChainId(network.chainId)

          window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setAddress(accounts[0])
          })

          window.ethereum.on('chainChanged', (_chainId: string) => {
            window.location.reload()
          })
        } catch (error) {
          console.error('Failed to connect to wallet:', error)
        }
      } else {
        console.log('Please install MetaMask!')
      }
    }

    connectWallet()

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners()
      }
    }
  }, [])

  return { provider, signer, address, chainId }
}