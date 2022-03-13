import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import styles from './register.module.css'
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    password: '',
    password2: '',
  })
  const { name, email, position, password, password2 } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { member, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when registered
    if (isSuccess || member) {
      navigate('/profile')
    }

    dispatch(reset())
  }, [isError, isSuccess, member, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error("Password don't much")
    } else {
      const memberData = {
        name,
        email,
        position,
        password,
      }
      dispatch(register(memberData))
      toast.success('Welcome in our team')
    }
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className={styles.register}>
      <h1>
        <FaUser /> Register
      </h1>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your Name'
              autoComplete='off'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your Email'
              autoComplete='off'
              required
            />
          </div>
          <div className='form-group'>
            <select name='position' id='position' onChange={onChange}>
              <option value='Front-end'>Front-end</option>
              <option value='Backend'>Backend</option>
              <option value='Full-stack'>Full-stack</option>
              <option value='Design'>Design</option>
              <option value='Admin'>Admin</option>
            </select>
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter Password'
              autoComplete='off'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm your Password'
              autoComplete='off'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Register
