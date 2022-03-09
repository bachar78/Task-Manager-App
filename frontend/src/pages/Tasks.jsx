import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks, reset } from '../features/tasks/taskSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import TaskItem from '../components/TaskItem'

const Tasks = () => {
  const { tasks, isLoading, isSuccess } = useSelector((state) => state.tasks)
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
    <>
      <BackButton url={"/profile"}/>
      <h1>All tasks</h1>
      <div>
      <div className='ticket-headings'>
          
          <div className=''>Task</div>
          <div className=''>Status</div>
          <div className=''></div>
          <div>Deadline</div>
        </div>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </>
  )
}

export default Tasks
