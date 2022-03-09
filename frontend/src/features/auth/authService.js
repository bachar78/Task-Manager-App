import axios from 'axios'

const API_URL = '/api/members'

//Register Member
const register = async (memberData) => {
  const response = await axios.post(API_URL, memberData)
  if (response.data) {
    localStorage.setItem('member', JSON.stringify(response.data))
  }
  return response.data
}

//Login member
const login = async (memberData) => {
  const { data } = await axios.post(`${API_URL}/login`, memberData)
  if (data) {
    localStorage.setItem('member', JSON.stringify(data))
  }
  return data
}

//Logout member
const logout = () => localStorage.removeItem('member')

const authService = {
  register,
  logout,
  login
}

export default authService
