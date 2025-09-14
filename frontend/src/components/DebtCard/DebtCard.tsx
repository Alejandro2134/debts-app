import { Link } from 'react-router'

type Props = {
  id: number
  creditor: string
  status: string
  onPay: (id: number) => void
}

const DebtCard: React.FC<Props> = ({ creditor, status, id, onPay }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow">
      <div>
        <p className="text-lg font-semibold">{creditor}</p>
        <p
          className={`text-sm ${
            status === 'pending' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {status}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {status === 'pending' && (
          <button
            onClick={() => onPay(id)}
            className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
          >
            Pagar
          </button>
        )}
        <Link to={`/debts/${id}`} className="text-sm text-gray-600 underline">
          Ver detalle
        </Link>
      </div>
    </div>
  )
}

export default DebtCard
