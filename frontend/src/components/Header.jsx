import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import styles from './header.module.css'

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
    <header className={styles.header}>
      <div className='logo'>
        <Link to='/'>
          <FaHome /> Home
        </Link>
      </div>
      <ul>
        {member ? (
          <>
            <li>
              <button onClick={onLogout} className={styles.logout}>
                {' '}
                <FaSignOutAlt /> Logout
              </button>
            </li>
            <li className={styles.user}>
              <img src={member.image} alt='user image' />
              <h5>{member.name}</h5>
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
