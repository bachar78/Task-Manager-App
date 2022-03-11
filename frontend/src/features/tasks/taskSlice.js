import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from './taskService'

const initialState = {
  tasks: [],
  task: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdated: false,
  isDeleted: false,
  message: '',
}

// Create a new Task
export const createTask = createAsyncThunk(
  'task/create',
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member.token
      return await taskService.createTask(taskData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Update a Task
export const updateTask = createAsyncThunk(
  'task/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member.token
      return await taskService.updateTask(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

//View a single task
export const getTask = createAsyncThunk(
  'task/get',
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member.token
      return await taskService.getTask(taskId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
// View my Tasks
export const getTasks = createAsyncThunk('task/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.member.token
    return await taskService.getTasks(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})
// Delete a finished Task
export const deleteTask = createAsyncThunk(
  'task/delete',
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member.token
      return await taskService.deleteTask(taskId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTask.pending, (state) => {
        state.isError = true
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isUpdated = true
        state.tasks.map((task) =>
          action.payload._id === task._id ? action.payload : task
        )
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.task = action.payload
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isDeleted = true
        state.tasks.filter((task) => action.payload._id !== task._id)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = tasksSlice.actions

export default tasksSlice.reducer
