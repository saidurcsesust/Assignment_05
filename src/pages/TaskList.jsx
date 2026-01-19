import { useEffect, useMemo, useState } from 'react'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import useFetch from '../hooks/useFetch.js'
import TaskCard from '../components/TaskCard.jsx'

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos'
const PAGE_SIZE = 20
const STORAGE_KEY = 'taskStatusOverrides'

export default function TaskList() {

  // fetch data using API
  const { data: tasks, loading, error } = useFetch(TASKS_URL)
  const [taskItems, setTaskItems] = useState([])
  const [statusOverrides, setStatusOverrides] = useState({})
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)


  useEffect(() => {
    if (!tasks) return
    setTaskItems(
      tasks.map((task) => {
        const override = statusOverrides[task.id]
        return override === undefined
          ? task
          : { ...task, completed: override }
      }),
    )
  }, [tasks, statusOverrides])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statusOverrides))
  }, [statusOverrides])

  const filteredTasks = useMemo(() => {
    if (!taskItems) return []
    const normalized = query.trim().toLowerCase()
    if (!normalized) return taskItems
    return taskItems.filter((task) =>
      task.title.toLowerCase().includes(normalized),
    )
  }, [taskItems, query])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / PAGE_SIZE),
  )

  const pagedTasks = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredTasks.slice(start, start + PAGE_SIZE)
  }, [filteredTasks, page]) 

  const handleStatusClick = (taskId) => {
    setStatusOverrides((prev) => ({ ...prev, [taskId]: true }))
  }

  return (
    <section className="tasks">
      <header className="tasks__header">
          
          {/* search Bar */}
          <label className="tasks__search">
            <span>Search</span>
            <input
              type="search"
              placeholder="Search by title"
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
            Showing {page*PAGE_SIZE} of {filteredTasks.length} tasks
          </p>

          {/* card start here */}
          <div className="tasks__grid">
            {pagedTasks.map(( task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusClick={handleStatusClick}
              />
            ))}
          </div>

           {/* add pagination here */}
          {totalPages > 1 && (
            <div className="tasks__pagination">
              <button
                type="button"
                className="pagination__button"
                onClick={() => setPage(page - 1)}
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
                onClick={() => setPage(page + 1)}
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
