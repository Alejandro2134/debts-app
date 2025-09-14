import client from 'api/client'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

type Debt = {
  id: number
  creditor: string
  status: string
  amount: number
  created_at: string
}

const DebtDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [debt, setDebt] = useState<Debt | null>(null)
  const [loading, setLoading] = useState(true)

  const handlePay = async (id: number) => {
    try {
      await client.patch(`/debts/${id}`, { status: 'paid' })
      window.location.reload()
    } catch (err) {
      console.error('Error paying debt:', err)
    }
  }

  useEffect(() => {
    const fetchDebt = async () => {
      try {
        const res = await client.get(`/debts/${id}`)
        setDebt(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDebt()
  }, [id])

  if (loading) return <p className="p-4">Cargando...</p>
  if (!debt) return <p className="p-4">No se encontró la deuda.</p>

  return (
    <div className="flex justify-center px-4 pt-20">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Detalle de deuda</h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Acreedor:</span> {debt.creditor}
          </p>
          <p>
            <span className="font-semibold">Monto:</span> {debt.amount}
          </p>
          <p>
            <span className="font-semibold">Estado:</span> {debt.status}
          </p>
          <p>
            <span className="font-semibold">Creada:</span>{' '}
            {new Date(debt.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          {debt.status === 'pending' && (
            <button
              onClick={() => handlePay(+id!)}
              className="flex-1 rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
            >
              Pagar deuda
            </button>
          )}
          <button
            onClick={() => navigate('/debts')}
            className="flex-1 rounded-lg bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-400"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}

export default DebtDetail
