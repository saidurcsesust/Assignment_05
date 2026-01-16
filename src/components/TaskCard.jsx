import { Link } from 'react-router-dom'

export default function TaskCard({ task }) {
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
          <span className="badge badge--pending">Pending</span>
        )}
        <Link className="task-card__link" to={`/tasks/${task.id}`}>
          View Details
        </Link>
      </div>
    </article>
  )
}
