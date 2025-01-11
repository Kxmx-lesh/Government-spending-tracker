'use client'

import { useEffect, useState } from 'react'
import { useEthereum } from '@/hooks/useEthereum'
import { Card } from '@/components/ui/card'
import { getRecord, getRecordCount } from '@/lib/contract-service'
import { ethers } from 'ethers'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export function SpendingChart() {
  const { provider } = useEthereum()
  const [spendingData, setSpendingData] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      if (!provider) return

      try {
        const count = await getRecordCount(provider)
        const records = await Promise.all(
          Array.from({ length: Number(count) }, (_, i) => getRecord(provider, i))
        )

        const formattedData = records.map(record => ({
          timestamp: new Date(Number(record.timestamp) * 1000).toLocaleDateString(),
          amount: Number(ethers.utils.formatEther(record.amount)),
          department: record.department,
        }))

        setSpendingData(formattedData)
      } catch (error) {
        console.error('Error fetching spending data:', error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [provider])

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Government Spending Overview</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={spendingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}