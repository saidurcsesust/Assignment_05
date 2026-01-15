import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import TaskList from './pages/TaskList.jsx'
import TaskDetails from './pages/TaskDetails.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main className = "app__main">
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path = "/task" element = {<TaskList/>} />
          <Route path = "/tast/:id" element = {<TaskDetails/>} />
          <Route path = "*" element = {<NotFound/>} />
        </Routes>
      </main>
    </>
  )
}

export default App
