import { useEffect, useState } from 'react'

export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    let ignore = false
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed. Please try again.')
        }
        return response.json()
      })
      .then((json) => {
        if (!ignore) {
          setData(json)
        }
      })
      .catch((err) => {
        if (!ignore && err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
      controller.abort()
    }
  }, [url])

  return { data, loading, error }
}
