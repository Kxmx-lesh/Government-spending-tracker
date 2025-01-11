import { ethers } from 'ethers'
import { SPENDING_TRACKER_ABI } from '@/contracts/abi'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

if (!contractAddress) {
  throw new Error('Contract address is not set in environment variables')
}

export function getContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(contractAddress, SPENDING_TRACKER_ABI, signerOrProvider)
}

export async function addRecord(
  signer: ethers.Signer,
  department: string,
  amount: string,
  description: string,
  ipfsHash: string
) {
  const contract = getContract(signer)
  const tx = await contract.addRecord(department, ethers.utils.parseEther(amount), description, ipfsHash)
  await tx.wait()
  return tx.hash
}

export async function getRecord(provider: ethers.providers.Provider, id: number) {
  const contract = getContract(provider)
  return await contract.getRecord(id)
}

export async function getRecordCount(provider: ethers.providers.Provider) {
  const contract = getContract(provider)
  return await contract.getRecordCount()
}