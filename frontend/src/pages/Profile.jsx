import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { member } = useSelector((state) => state.auth)
  return (
    <>
      <section className='heading'>
        <h3>Name: {member.name}</h3>
        <h3>Email: {member.email}</h3>
        <h3>Position: {member.position}</h3>
      </section>

      <Link to='tasks' className='btn btn-block'>
        <FaTicketAlt /> View My Tasks
      </Link>
      <Link to='new-task' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Task
      </Link>
    </>
  )
}

export default Profile
