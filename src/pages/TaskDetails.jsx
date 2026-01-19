import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import useFetch from '../hooks/useFetch.js'

const STORAGE_KEY = 'taskStatusOverrides'

export default function TaskDetails() {
  const { id } = useParams()
  const location = useLocation()
  const [statusOverrides, setStatusOverrides] = useState({})
  const taskFromList = location.state?.task
  const { data: task, loading, error } = useFetch(
    taskFromList ? null : `https://jsonplaceholder.typicode.com/todos/${id}`,
  )
  const activeTask = taskFromList || task
  const displayTask = activeTask
    ? {
        ...activeTask,
        completed:
          statusOverrides[activeTask.id] ?? activeTask.completed,
      }
    : null

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      setStatusOverrides(JSON.parse(stored))
    } catch {
      setStatusOverrides({})
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statusOverrides))
  }, [statusOverrides])

  const handleToggleStatus = () => {
    if (!displayTask) return
    setStatusOverrides((prev) => ({
      ...prev,
      [displayTask.id]: !displayTask.completed,
    }))
  }

  return (
    <section className="task-detail">
      <div className="task-detail__header">
        <div>
          <h1 className="task-detail__eyebrow">Task Details</h1>
        </div>
        <Link className="button button--ghost task-detail__back" to="/tasks">
          Back to list
        </Link>
      </div>

      {loading && !taskFromList && <Loader label="Loading task..." />}
      {error && <ErrorMessage message={error} />}

      {displayTask && !loading && !error && (
        <div className="task-detail__content">
          <article
            className={`task-detail__card ${
              displayTask.completed ? 'task-detail__card--done' : ''
            }`}
          >
            <div className="task-detail__status">
              <button
                type="button"
                className={`status-pill ${
                  displayTask.completed ? '' : 'status-pill--pending'
                }`}
                onClick={handleToggleStatus}
              >
                {displayTask.completed ? 'Completed' : 'Pending'}
              </button>
            </div>
            <h2 className="task-detail__title">{displayTask.title}</h2>
            
            <div className="task-detail__metrics">
              
              <div className="task-detail__metric">
                <span>User ID</span>
                <strong>#{displayTask.userId}</strong>
              </div>
              <div className="task-detail__metric">
                <span>Task ID</span>
                <strong>#{displayTask.id}</strong>
              </div>
            </div>
          </article>

        </div>
      )}
    </section>
  )
}
