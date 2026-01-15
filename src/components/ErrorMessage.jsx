export default function ErrorMessage({ message }) {
  return (
    <div className="error">
      <strong>Something went wrong.</strong>
      <span>{message}</span>
    </div>
  )
}
