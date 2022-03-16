import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks, reset } from '../features/tasks/taskSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import TaskItem from '../components/TaskItem'
import styles from './tasks.module.css'

const Tasks = () => {
  const { tasks, isLoading, isSuccess } = useSelector((state) => state.tasks)
  const { member } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  //To clear the state on unmount (we can use the same one)
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={styles.tasks}>
      <div className={styles['tasks-heading']}>
        <BackButton url={'/profile'} />
        <h1>{member.name}'s tasks</h1>
      </div>
      <div>
        <div className={styles['tasks-title']}>
          <div className=''>Task</div>
          <div className=''>Status</div>
          <div className=''>Details</div>
          <div>Deadline</div>
        </div>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default Tasks
