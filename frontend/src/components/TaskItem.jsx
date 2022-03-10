import React from 'react'
import { Link } from 'react-router-dom'

const TaskItem = ({ task }) => {
  return (
    <div className='ticket'>
      {/* <div>{new Date(task.createdAt).toLocaleString('en-US')}</div> */}
      <div className=''>{task.task}</div>
      <div className={`status status-${task.status}`}>{task.status}</div>
      <Link to={`/profile/task/${task._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
      <div>{task.deadline}</div>
    </div>
  )
}

export default TaskItem
