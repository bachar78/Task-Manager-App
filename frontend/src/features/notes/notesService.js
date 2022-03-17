import axios from 'axios'
const API_URL = '/api/tasks'

//Get tasks notes
const getNotes = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(`${API_URL}/${taskId}/notes`, config)
  return data
}
//Create task note
const createNote = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    `${API_URL}/${data.taskId}/notes`,
    { text: data.noteText },
    config
  )
  return response.data
}

//Check note
const checkNote = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${data.taskId}/notes/${data.noteId}`,{isChecked: true},
    config
  )
  return response.data
 
}
const notesService = { getNotes, createNote, checkNote }

export default notesService
