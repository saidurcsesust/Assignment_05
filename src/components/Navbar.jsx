import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'


export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span>Task Manager</span>
      </div>
      <nav className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
        >
          Tasks
        </NavLink>
      </nav>
      <button className="navbar__toggle" onClick={toggleTheme} type="button">
        {theme === 'light' ? 'Night Mode' : 'Day Mode'}
      </button>
    </header>
  )
}
