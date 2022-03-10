import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateTask, reset } from '../features/tasks/taskSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import axios from 'axios'

const UpdateTask = () => {
  const { state } = useLocation()
  const { member } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message, isUpdated } = useSelector(
    (state) => state.tasks
  )
  const [task, setTask] = useState(state.task)
  const [description, setDescription] = useState(state.description)
  const [status, setStatus] = useState(state.status)
  const [deadline, setDeadline] = useState(state.deadline)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { taskId } = useParams()

  const onSubmit = (e) => {
    e.preventDefault()
    const data = { taskData: { task, description, status, deadline }, taskId }
    dispatch(updateTask(data))
  }
  useEffect(() => {
    if (isUpdated) {
      toast.success('Message Updated Successfully')
      dispatch(reset())
      navigate('/profile/tasks')
    }
    dispatch(reset())
  }, [isError, message, dispatch, navigate, isUpdated])
  return (
    <>
      <BackButton url={'/profile'} />
      <section>
        <h1>
          Update your task
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='task'>Task</label>
            <input
              type='text'
              id='task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
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
          <div className='form-group'>
            <label htmlFor='deadline'>Set a deadline</label>
            <input
              type='date'
              id='deadline'
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-back'>Update</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default UpdateTask
