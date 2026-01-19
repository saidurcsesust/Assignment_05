import { Link } from 'react-router-dom'

export default function TaskCard({ task, onStatusClick }) {
  return (
    <article
      className={`task-card ${task.completed ? 'task-card--done' : ''}`}
    >
      <div>
        <p className="task-card__meta">Task #{task.id}</p>
        <h4>{task.title}</h4>
      </div>
      <div className="task-card__footer">
        {task.completed ? (
          <button
            type="button"
            className="badge badge--button"
            onClick={() => onStatusClick?.(task.id, task.completed)}
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            className="badge badge--pending badge--button"
            onClick={() => onStatusClick?.(task.id, task.completed)}
          >
            Pending
          </button>
        )}
        <Link
          className="task-card__link"
          to={`/tasks/${task.id}`}
          state={{ task }}
        >
          View Details
        </Link>
      </div>
    </article>
  )
}
