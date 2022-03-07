import { Link } from 'react-router-dom'
import {FaUser, FaSignInAlt} from 'react-icons/fa'
function Home() {
  return (
    <>
      <section className='heading'>
        <p>
          Already a member? {' '}
        </p>
        <Link className='btn btn-block btn-reverse' to='/login'> <FaSignInAlt/> Sign In</Link>
        <p>
          New member? {' '}
        </p>
        <Link className='btn btn-block' to='/register'><FaUser/> Sign Up</Link>
      </section>
    </>
  )
}

export default Home
