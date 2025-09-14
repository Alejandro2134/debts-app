import client from 'api/client'
import { useEffect, useState } from 'react'

type Debt = {
  id: number
  creditor: string
  status: string
}

const useDebts = () => {
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const res = await client.get('/debts')
        setDebts(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDebts()
  }, [])

  return { debts, loading }
}

export default useDebts
