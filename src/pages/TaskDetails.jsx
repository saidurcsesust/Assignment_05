import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import useFetch from '../hooks/useFetch.js'

export default function TaskDetails() {
  const { id } = useParams()
  const { data: task, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
  )

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

      {loading && <Loader label="Loading task..." />}
      {error && <ErrorMessage message={error} />}

      {task && !loading && !error && (
        <div className="task-detail__content">
          <article
            className={`task-detail__card ${
              task.completed ? 'task-detail__card--done' : ''
            }`}
          >
            <div className="task-detail__status">
              <span
                className={`status-pill ${
                  task.completed ? '' : 'status-pill--pending'
                }`}
              >
                {task.completed ? 'Completed' : 'In progress'}
              </span>
            </div>
            <h2 className="task-detail__title">{task.title}</h2>
            
            <div className="task-detail__metrics">
              
              <div className="task-detail__metric">
                <span>User ID</span>
                <strong>#{task.userId}</strong>
              </div>
              <div className="task-detail__metric">
                <span>Task ID</span>
                <strong>#{task.id}</strong>
              </div>
            </div>
          </article>

        </div>
      )}
    </section>
  )
}
