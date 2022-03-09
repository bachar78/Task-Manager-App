import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { member } = useSelector((state) => state.auth)
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'><FaHome/> Home</Link>
      </div>
      <ul>
        {member ? (
          <>
            <li>
              <button onClick={onLogout} className='btn'>
                {' '}
                <FaSignOutAlt /> Logout
              </button>
            </li>
            <li>
              <FaUser /> {member.name}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
