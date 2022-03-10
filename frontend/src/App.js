import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import Tasks from './pages/Tasks'
import NewTask from './pages/NewTask'
import Task from './pages/Task'
import UpdateTask from './pages/UpdateTask'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='tasks' element={<Tasks />} />
              <Route path='new-task' element={<NewTask />} />
              <Route path='task/:taskId' element={<Task />} />
              <Route path='task/:taskId/update' element={<UpdateTask />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
