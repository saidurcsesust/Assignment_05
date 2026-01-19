export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="loader-overlay" role="status" aria-live="polite">
      <div className="loader">
        <span className="loader__spinner" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  )
}
