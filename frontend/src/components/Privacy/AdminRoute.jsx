import { Navigate, Outlet } from 'react-router-dom'
import Spinner from '../Spinner'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const { member } = useSelector((state) => state.auth)
  const { isAdmin } = member

  if (loading) {
    return <Spinner />
  }
  return isAdmin ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute
