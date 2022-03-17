import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notesService from './notesService'

const initialState = {
  notes: [],
  note: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdated: false,
  isDeleted: false,
  isChecked: false,
  message: '',
}

//Get a task notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member.token
      return await notesService.getNotes(taskId, token)
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

//check a note 
export const checkNote = createAsyncThunk(
  'notes/getAll',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member.token
      // return await notesService.getNotes(taskId, token)
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

//Create a task note
export const createNote = createAsyncThunk(
  'notes/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.member.token
      return await notesService.createNote(data, token)
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

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = action.payload
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes.push(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = notesSlice.actions

export default notesSlice.reducer
