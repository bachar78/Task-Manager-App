import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../pages/tasks.module.css'

const TaskItem = ({ task }) => {
  return (
    <div className={styles.task}>
      <div className=''>{task.task}</div>
      <div className={`${styles.status} ${styles[`status-${task.status}`]}`}>
        {task.status}
      </div>
      <Link to={`/profile/task/${task._id}`} className={styles.btn}>
        View
      </Link>
      <div>{task.deadline}</div>
    </div>
  )
}

export default TaskItem
