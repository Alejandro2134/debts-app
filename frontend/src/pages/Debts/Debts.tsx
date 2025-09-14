import client from 'api/client'
import DebtCard from 'components/DebtCard/DebtCard'
import useDebts from 'hooks/useDebts'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Debts = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all')
  const { debts, loading } = useDebts(filter === 'all' ? undefined : filter)

  const handlePay = async (id: number) => {
    try {
      await client.patch(`/debts/${id}`, { status: 'paid' })
      window.location.reload()
    } catch (err) {
      console.error('Error paying debt:', err)
    }
  }

  if (loading) return <p className="p-4">Cargando deudas...</p>

  return (
    <div className="grid gap-4 p-4">
      <>
        <div>
          <button
            onClick={() => navigate('/debts/create')}
            className="w-full rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            Crear deuda
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 rounded-lg px-4 py-2 ${
              filter === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`flex-1 rounded-lg px-4 py-2 ${
              filter === 'pending'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`flex-1 rounded-lg px-4 py-2 ${
              filter === 'paid'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Pagadas
          </button>
        </div>

        {debts.map((debt) => (
          <DebtCard
            key={debt.id}
            creditor={debt.creditor}
            id={debt.id}
            status={debt.status}
            onPay={handlePay}
          />
        ))}
      </>
    </div>
  )
}

export default Debts
