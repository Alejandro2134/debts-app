import client from 'api/client'
import FormInput from 'components/FormInput/FormInput'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

const CreateDebt = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [creditor, setCreditor] = useState<string | null>(null)
  const [amount, setAmount] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await client.post('/debts', { creditor, amount: +amount! })
      navigate('/debts')
    } catch {
      setError('Error creando deuda')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center px-4 pt-20">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">Crear deuda</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormInput
            label="Acreditador"
            type="text"
            name="creditor"
            placeholder="Daniel"
            onChange={(e) => setCreditor(e.target.value)}
          />

          <FormInput
            label="Monto"
            type="number"
            name="amount"
            placeholder="15000"
            onChange={(e) => setAmount(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              {loading ? 'Cargando...' : 'Crear'}
            </button>
            <button
              onClick={() => navigate('/debts')}
              className="flex-1 rounded-lg bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-400"
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateDebt
