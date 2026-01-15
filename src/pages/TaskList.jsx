import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import useFetch from '../hooks/useFetch.js'

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos'
const PAGE_SIZE = 20

export default function TaskList() {
  const { data: tasks, loading, error } = useFetch(TASKS_URL)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filteredTasks = useMemo(() => {
    if (!tasks) return []
    const normalized = query.trim().toLowerCase()
    if (!normalized) return tasks
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(normalized),
    )
  }, [tasks, query])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / PAGE_SIZE),
  )

  useEffect(() => {
    setPage(1)
  }, [query, tasks])

  const pagedTasks = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredTasks.slice(start, start + PAGE_SIZE)
  }, [filteredTasks, page])

  const handlePageChange = (nextPage) => {
    setPage((current) => {
      const clamped = Math.min(Math.max(nextPage, 1), totalPages)
      return clamped
    })
  }

  return (
    <section className="tasks">
      <header className="tasks__header">

          <label className="tasks__search">
            <span>Search</span>
            <input
              type="search"
              placeholder="Filter by title"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        
        <div className='tasks__lead'>
          <h1>Task List</h1>
        </div>
        

      </header>

      {loading && <Loader label="Loading tasks..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <p className="tasks__count">
            Showing {pagedTasks.length} of {filteredTasks.length} tasks
          </p>
          <div className="tasks__grid">
            {pagedTasks.map((task) => (
              <article
                key={task.id}
                className={`task-card ${task.completed ? 'task-card--done' : ''
                  }`}
              >
                <div>
                  <p className="task-card__meta">Task #{task.id}</p>
                  <h3>{task.title}</h3>
                </div>
                <div className="task-card__footer">
                  {task.completed ? (
                    <span className="badge">Done</span>
                  ) : (
                    <span className="badge badge--pending">Pending</span>
                  )}
                  <Link className="task-card__link" to={`/tasks/${task.id}`}>
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="tasks__pagination">
              <button
                type="button"
                className="pagination__button"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              <p className="pagination__meta">
                Page {page} of {totalPages}
              </p>
              <button
                type="button"
                className="pagination__button"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
          {filteredTasks.length === 0 && (
            <p className="tasks__empty">No tasks match your search.</p>
          )}
        </>
      )}
    </section>
  )
}
