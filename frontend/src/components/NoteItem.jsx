import { useSelector } from 'react-redux'

const NoteItem = ({ note }) => {
  const { member } = useSelector((state) => state.auth)
  return (
    <div
      className='note'
      style={{
        backgroundColor: note.isAdmin ? 'rgba(0,0,0,0.7' : '#fff',
        color: note.isAdmin ? '#fff' : '#000',
      }}>
      <h4>
        Note of{' '}
        {note.isAdmin ? <span>Note of Admin</span> : <span>{member.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en', 'NL')}
      </div>
    </div>
  )
}

export default NoteItem
