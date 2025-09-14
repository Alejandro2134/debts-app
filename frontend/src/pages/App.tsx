import { Route, Routes } from 'react-router'
import Login from './Login/Login'
import Register from './Register/Register'
import NavBar from 'components/NavBar/NavBar'
import PrivateRoute from 'components/PrivateRoute/PrivateRoute'
import Debts from './Debts/Debts'
import DebtDetail from './DebtDetail/DebtDetail'
import CreateDebt from './CreateDebt/CreateDebt'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/debts"
          element={
            <PrivateRoute>
              <Debts />
            </PrivateRoute>
          }
        />
        <Route
          path="/debts/:id"
          element={
            <PrivateRoute>
              <DebtDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/debts/create"
          element={
            <PrivateRoute>
              <CreateDebt />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
