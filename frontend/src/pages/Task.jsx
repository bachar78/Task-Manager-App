import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTask, reset, deleteTask } from '../features/tasks/taskSlice'
import { getNotes, createNote } from '../features/notes/notesSlice'
import { useParams, useNavigate } from 'react-router-dom'
import NoteItem from '../components/NoteItem'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import styles from './task.module.css'
const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

const Task = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { taskId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { task, isLoading, isSuccess, isDeleted, isError, message } =
    useSelector((state) => state.tasks)
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  )

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
    dispatch(getNotes(taskId))
  }, [message, isError, taskId, isDeleted, navigate])

  const onNoteSubmit = (e) => {
    e.preventDefault()
    const data = { noteText, taskId }
    dispatch(createNote(data))

    setNoteText('')
    closeModal()
  }
  const onDelete = () => {
    dispatch(deleteTask(taskId))
  }

  //Open or close a model
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (isLoading || notesIsLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h3>Some Thing Went Wrong</h3>
  }
  return (
    <div className={styles['task-page']}>
      <header className='ticket-header'>
        <BackButton url={'/profile/tasks'} />
        <h2>Task: {task.task}</h2>
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
        <h2>Notes</h2>
      </header>
      <button className={`${styles.btn} ${styles['btn-sm']}`} onClick={openModal}>
        <FaPlus /> Add note
      </button>
      {notes.length === 0 ? (
        <h3>There is no note</h3>
      ) : (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      )}
      {}
      <button
        className={styles.btn}
        onClick={() => navigate('update', { state: task })}>
        Update Task
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn'>Submit</button>
          </div>
        </form>
      </Modal>
      {task.status === 'finished' ? (
        <>
          <p>Done!! Want to close the task?</p>
          <button className='btn btn-danger btn-block' onClick={onDelete}>
            Delete Task
          </button>
        </>
      ) : null}
    </div>
  )
}

export default Task
