import { useAuth } from 'hooks/useAuth'

const NavBar = () => {
  const { userEmail, logout } = useAuth()

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
      <div className="text-xl font-bold text-gray-800">Debt App</div>
      <div className="flex items-center gap-4">
        {userEmail && (
          <>
            <span className="text-gray-600">Hola, {userEmail}</span>
            <button
              onClick={logout}
              className="rounded-lg bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
