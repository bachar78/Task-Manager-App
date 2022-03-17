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
import { setIsChecked } from '../features/notes/notesSlice'
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
    padding: '3rem',
    border: '2px solid var(--color-primary-dark)', 
    boxShadow: '0 2rem 2rem rgba(0, 0, 0, 0.7)'
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
  const { notes, isLoading: notesIsLoading, isChecked } = useSelector(
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
    if (isChecked) {
      dispatch(setIsChecked())
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
      <BackButton url={'/profile/tasks'} />
      <h1 className={styles.task}>
        Task: <span>{task.task}</span>
      </h1>
      <h1>
        Created At:{' '}
        <span> {new Date(task.createdAt).toLocaleString('en-NL')} </span>
      </h1>
      <h1>
        Status:{' '}
        <span className={`${styles.status} ${styles[`status-${task.status}`]}`}>
          {task.status}
        </span>
      </h1>
      <h1>Deadline: <span>{task.deadline}</span></h1>
      <div className={styles['task-desc']}>
        <h3>Description</h3>
        <p>{task.description}</p>
      </div>
      <button
        className={`${styles.btn} ${styles['btn-sm']}`}
        onClick={openModal}>
        <FaPlus /> Add note
      </button>
      <div className={styles['notes-body']}>
        {notes.length === 0 ? (
          <h3>There is no note</h3>
        ) : (
          notes.map((note) => <NoteItem key={note._id} note={note} />)
        )}
        {}
      </div>
      <button
        className={`${styles.btn} ${styles['btn-update']}`}
        onClick={() => navigate('update', { state: task })}>
        Update Task
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <button className={styles['btn-close']} onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className={styles['form-group']}>
          <label htmlFor='noteText'>Add Note</label>
            <textarea
              name='noteText'
              id='noteText'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className={`${styles.btn} ${styles['btn-modal']}`}>Submit</button>
          </div>
        </form>
      </Modal>
      {task.status === 'finished' ? (
        <button
          className={`${styles.btn} ${styles['btn-delete']}`}
          onClick={onDelete}>
          Delete Task
        </button>
      ) : null}
    </div>
  )
}

export default Task
