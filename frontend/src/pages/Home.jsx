import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUser, FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import MemberItem from '../components/MemberItem'
import styles from './home.module.css'
import axios from 'axios'
function Home() {
  const navigate = useNavigate()
  const { member } = useSelector((state) => state.auth)
  const [members, setMembers] = useState([])
  useEffect(() => {
    if (member) {
      navigate('/profile')
    } else {
      ;(async () => {
        const { data } = await axios.get('/api/members')
        setMembers(data)
      })()
    }
  }, [member, navigate, setMembers])

  return (
    <>
      <section className={styles.heading}>
        <div className={styles['heading-left']}>
          <h3>Welcome to Solidarity Team</h3>
          <h1>Teams divide tasks and receive success</h1>
          <div className={styles['heading-group']}>
            <p>Already a member? </p>
            <Link className={styles.btn} to='/login'>
              {' '}
              <FaSignInAlt /> Sign In
            </Link>
          </div>
          <div className={styles['heading-group']}>
            <p>New member? </p>
            <Link className={styles.btn} to='/register'>
              <FaUser /> Sign Up
            </Link>
          </div>
        </div>
        <div className={styles['heading-right']}>
          <h1>The Team</h1>
          <div className={styles.members}>
            {members &&
              members.length > 0 &&
              members.map((member) => (
                <MemberItem member={member} key={member.name} />
              ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
