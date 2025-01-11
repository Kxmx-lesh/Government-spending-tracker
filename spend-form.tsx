'use client'

import { useState } from 'react'
import { useEthereum } from '@/hooks/useEthereum'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { uploadToIPFS } from '@/lib/ipfs-service'
import { addRecord } from '@/lib/contract-service'
import { toast } from 'react-hot-toast'

export function SpendingForm() {
  const { signer } = useEthereum()
  const [formData, setFormData] = useState({
    department: '',
    amount: '',
    description: '',
    additionalData: {},
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signer) {
      toast.error('Please connect your wallet')
      return
    }
    setIsSubmitting(true)
    try {
      const ipfsHash = await uploadToIPFS(formData.additionalData)
      
      const txHash = await addRecord(
        signer,
        formData.department,
        formData.amount,
        formData.description,
        ipfsHash
      )
      toast.success(Transaction submitted: ${txHash})
      setFormData({ department: '', amount: '', description: '', additionalData: {} })
    } catch (error) {
      console.error('Error submitting spending record:', error)
      toast.error('Error submitting spending record. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <Input
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Amount (ETH)</label>
        <Input
          type="number"
          step="0.0001"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Spending Record'}
      </Button>
    </form>
  )
}