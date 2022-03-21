import { Navigate, Outlet } from 'react-router-dom'
import Spinner from '../Spinner'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const { member, isLoading } = useSelector((state) => state.auth)
  const { isAdmin } = member

  if (isLoading) {
    return <Spinner />
  }
  return isAdmin ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute
