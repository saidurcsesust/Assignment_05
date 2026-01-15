import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="home">
      <div className="home__content">
        <p className="home__eyebrow">Task Management Application</p>
        <h1>Organize tasks, track progress, stay in flow.</h1>
        <p className="home__lead">
          TaskPulse fetches real-time todos from JSONPlaceholder and keeps
          everything fast, clean, and easy to scan.
        </p>
        
      </div>
      <div className="home__card">
        <h2>What you can do</h2>
        <ul>
          <li>Browse the latest 20 tasks from the API.</li>
          <li>Open a task for full details.</li>
          <li>Filter by title to find what matters.</li>
          <li>Spot completed items at a glance.</li>
        </ul>
      </div>
    </section>
  )
}
