type Props = {
  label: string
  type?: string
  name: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput: React.FC<Props> = ({
  label,
  type,
  name,
  placeholder,
  onChange
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={onChange}
      />
    </div>
  )
}

export default FormInput
