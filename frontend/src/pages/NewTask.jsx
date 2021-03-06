import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTask, reset } from '../features/tasks/taskSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import styles from './newTask.module.css'

function NewTask() {
  const { member } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tasks
  )
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('new')
  const [deadline, setDeadline] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      dispatch(reset())
      navigate('/profile/tasks')
    }
    dispatch(reset())
  }, [isError, message, isSuccess, dispatch, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTask({ task, description, status, deadline }))
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className={styles.register}>
      <section className={styles['task-heading']}>
        <BackButton url={'/profile'} />
        <h1>Developer {member.name}</h1>
      </section>
      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles['form-group']}>
            <label htmlFor='task'>Task</label>
            <input
              type='text'
              id='task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor='status'>Status</label>
            <select
              name='status'
              id='status'
              onChange={(e) => setStatus(e.target.value)}>
              <option value='new'>New</option>
              <option value='started'>Started</option>
              <option value='Progress'>In Progress</option>
              <option value='finished'>Finished</option>
            </select>
          </div>
          <div className={styles['form-group']}>
            <label htmlFor='deadline'>Set a deadline</label>
            <input
              type='date'
              id='deadline'
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className={styles['form-group']}>
            <button className={styles.btn}>Create Task</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default NewTask
