import axios from 'axios'
const API_URL = '/api/tasks'

//Create a new task
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, taskData, config)
  console.log(response.data)
  return response.data
}
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(API_URL, config)
  return data
}

const taskService = { createTask, getTasks }

export default taskService
