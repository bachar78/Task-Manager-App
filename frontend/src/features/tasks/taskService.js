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

  return response.data
}
//Update a task
const updateTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${data.taskId}`,
    data.taskData,
    config
  )
  return response.data
}

//Get all tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(API_URL, config)
  return data
}

//Get a single task
const getTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get(`${API_URL}/${taskId}`, config)

  return data
}

//Delete a task
const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.delete(`${API_URL}/${taskId}`, config)
  return data
}

const taskService = { createTask, getTasks, getTask, updateTask, deleteTask }

export default taskService
