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
          <Route path = "/tasks" element = {<TaskList/>} />
          <Route path = "/tasks/:id" element = {<TaskDetails/>} />
          <Route path = "*" element = {<NotFound/>} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <p>Copyrights © 2026 All Rights Reserved by W3 Engineers Ltd.</p>
          <p>Terms and Conditions</p>
        </div>
      </footer>
    </>
  )
}

export default App
