import { FaSignInAlt, FaSignOutAlt, FaTasks } from 'react-icons/fa'
import { AiOutlineTeam } from 'react-icons/ai'
import {GrUserAdmin} from 'react-icons/gr'
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
      <div className={styles.logo}>
        <Link to='/'>
          <FaTasks />
          Task_Manager
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
            {member && member.isAdmin ? (
            <li className={styles.admin}>
              <GrUserAdmin />
                <select>
                  <option value="">Admin</option>
                  <option value="">Members</option>
                  <option value="">Tasks</option>
                </select>
            </li>
        ) : null}
            <li className={styles.user}>
              <div className={styles.image}>
                <img src={member.image} alt='user' />
              </div>
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
                <AiOutlineTeam /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
