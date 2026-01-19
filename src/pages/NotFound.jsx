import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>That page wandered off. Let’s get you back to safer ground.</p>
      <Link className="button button--primary" to="/">
        Return Home
      </Link>
    </section>
  )
}
