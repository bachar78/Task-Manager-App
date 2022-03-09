import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from './taskService'
//Get member from localStorage

const initialState = {
  tasks: [],
  task: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
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
        state.member = null
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
        state.member = null
      })
  },
})

export const { reset } = tasksSlice.actions

export default tasksSlice.reducer
