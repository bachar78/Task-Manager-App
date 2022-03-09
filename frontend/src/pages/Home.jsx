import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUser, FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate()
  const { member } = useSelector((state) => state.auth)
  useEffect(() => {
    if (member) {
      navigate('/profile')
    }
  }, [member, navigate])
  return (
    <>
      <section className='heading'>
        <p>Already a member? </p>
        <Link className='btn btn-block btn-reverse' to='/login'>
          {' '}
          <FaSignInAlt /> Sign In
        </Link>
        <p>New member? </p>
        <Link className='btn btn-block' to='/register'>
          <FaUser /> Sign Up
        </Link>
      </section>
    </>
  )
}

export default Home
