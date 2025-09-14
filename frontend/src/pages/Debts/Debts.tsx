import client from 'api/client'
import DebtCard from 'components/DebtCard/DebtCard'
import useDebts from 'hooks/useDebts'
import { useNavigate } from 'react-router'

const Debts = () => {
  const navigate = useNavigate()
  const { debts, loading } = useDebts()

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
      {debts.length === 0 ? (
        <p>No tienes deudas registradas</p>
      ) : (
        <>
          <div>
            <button
              onClick={() => navigate('/debts/create')}
              className="w-full rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
            >
              Crear deuda
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
      )}
    </div>
  )
}

export default Debts
