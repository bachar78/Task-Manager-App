import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkNote, setIsChecked } from '../features/notes/notesSlice'
import styles from './noteItem.module.css'

const NoteItem = ({ note }) => {
  const { member } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { taskId } = useParams()

  const onCheck = () => {
    dispatch(setIsChecked())
    const data = { taskId, noteId: note._id }
    dispatch(checkNote(data, member.token))
    toast.success('Note is checked')
  }

  return (
    <div
      className={styles.note}
      style={{
        backgroundColor:
          note.isAdmin && note.isChecked
            ? '#b83131f0'
            : note.isAdmin
            ? 'rgba(0,0,0,0.7'
            : note.isChecked
            ? 'rgba(56, 110, 131, 0.507)'
            : '#fff',
        color: note.isAdmin || note.isChecked ? '#fff' : '#000',
      }}>
      <h3>
        Note of {note.isAdmin ? <span>Admin</span> : <span>{member.name}</span>}
      </h3>
      <p style={{ textDecoration: note.isChecked ? 'line-through' : 'none' }}>
        {note.text}
      </p>
      <div className={styles['note-date']}>
        {new Date(note.createdAt).toLocaleString('en', 'NL')}
      </div>

      <button className={styles['btn-checked']} onClick={onCheck}>
        {note.isChecked ? 'Checked' : 'Check'}
      </button>
    </div>
  )
}

export default NoteItem
