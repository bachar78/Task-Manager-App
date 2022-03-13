import { useSelector } from 'react-redux'

const NoteItem = ({ note }) => {
  const { member } = useSelector((state) => state.auth)

  return (
    <div
      className='note'
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
      <h4>
        Note of {note.isAdmin ? <span>Admin</span> : <span>{member.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en', 'NL')}
      </div>
      <div className='note-checked'>
        <button className='btn-checked'>Checked</button>
      </div>
    </div>
  )
}

export default NoteItem
