import { useSelector } from 'react-redux'
import styles from './noteItem.module.css'
const NoteItem = ({ note }) => {
  const { member } = useSelector((state) => state.auth)

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
      <p>{note.text}</p>
      <div className={styles['note-date']}>
        {new Date(note.createdAt).toLocaleString('en', 'NL')}
      </div>

      <button className={styles['btn-checked']}>Checked</button>
    </div>
  )
}

export default NoteItem
