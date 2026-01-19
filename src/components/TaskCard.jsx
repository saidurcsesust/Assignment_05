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
          <span className="badge">Done</span>
        ) : (
          <button
            type="button"
            className="badge badge--pending badge--button"
            onClick={() => onStatusClick?.(task.id)}
          >
            Pending
          </button>
        )}
        <Link className="task-card__link" to={`/tasks/${task.id}`}>
          View Details
        </Link>
      </div>
    </article>
  )
}
