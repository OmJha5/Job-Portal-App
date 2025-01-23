import { createBrowserRouter } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import { RouterProvider } from 'react-router'
import "./App.css"
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'

const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <Home/>
    },

    {
      path : "/login",
      element : <Login/>
    },

    {
      path : "/signup",
      element : <Signup/>
    },

    {
      path : "/jobs",
      element : <Jobs/>
    },

    {
      path : "/browse",
      element : <Browse/>
    },

    {
      path : "/profile",
      element : <Profile/>
    },

    {
      path : "/jobs/description/:id",
      element : <JobDescription/>
    }
])

function App() {

  return (
    <>
      <RouterProvider router = {appRouter}></RouterProvider>
    </>
  )
}

export default App
