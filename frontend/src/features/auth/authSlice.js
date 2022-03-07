import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  member: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Register a new member
export const register = createAsyncThunk(
  'auth/register',
  async (member, thinkAPI) => {
    console.log(member)
  }
)

//Login a member
export const login = createAsyncThunk(
  'auth/login',
  async (member, thinkAPI) => {
    console.log(member)
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  //extraReducers allow us to add cases and change cases
  extraReducers: (builder) => {},
})

export default authSlice.reducer
