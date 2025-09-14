import client from 'api/client'
import { useEffect, useState } from 'react'

type Debt = {
  id: number
  creditor: string
  status: string
}

const useDebts = (status?: 'pending' | 'paid') => {
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const url = status ? `/debts?status=${status}` : '/debts'
        const res = await client.get(url)
        setDebts(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDebts()
  }, [status])

  return { debts, loading }
}

export default useDebts
