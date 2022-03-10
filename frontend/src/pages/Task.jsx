import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTask, reset, deleteTask } from '../features/tasks/taskSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const Task = () => {
  const { taskId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { task, isLoading, isSuccess, isDeleted, isError, message } =
    useSelector((state) => state.tasks)

  //To clear the state on unmount (we can use the same one)
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isDeleted) {
      toast.success('Task Deleted Successfully')
      dispatch(reset())
      navigate('/profile/tasks')
    }
    dispatch(getTask(taskId))
  }, [message, isError, taskId, isDeleted])

  const onDelete = () => {
    dispatch(deleteTask(taskId))
  }

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h3>Some Thing Went Wrong</h3>
  }
  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url={'/profile/tasks'} />
        <h1>Task: {task.task}</h1>
        <h2>
          Created At:{' '}
          {new Date(task.createdAt).toLocaleString('en-NL', {
            timeZone: 'Europe/Amsterdam',
            timeZoneName: 'long',
          })}
        </h2>
        <h2>
          Status:{' '}
          <span className={`status status-${task.status}`}>{task.status}</span>
        </h2>
        <div className='ticket-desc'>
          <h3>Description of the Task</h3>
          <p>{task.description}</p>
        </div>
        <h2>The expected Deadline: {task.deadline}</h2>
      </header>
      <section>
        <button
          className='btn btn-update btn-block'
          onClick={() => navigate('update', { state: task })}>
          Update Task
        </button>
        {task.status === 'finished' ? (
          <>
            <p>Done!! Want to close the task?</p>
            <button className='btn btn-danger btn-block' onClick={onDelete}>
              Delete Task
            </button>
          </>
        ) : null}
      </section>
    </div>
  )
}

export default Task
