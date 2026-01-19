import { useEffect, useState } from 'react'

export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const minimumLoadingMs = 1000

  useEffect(() => {
    if (!url) {
      setLoading(false)
      setError(null)
      return
    }
    let ignore = false
    let timeoutId
    const controller = new AbortController()
    const startedAt = Date.now()

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
          const elapsed = Date.now() - startedAt
          const remaining = Math.max(0, minimumLoadingMs - elapsed)
          if (remaining === 0) {
            setLoading(false)
          } else {
            timeoutId = setTimeout(() => {
              if (!ignore) {
                setLoading(false)
              }
            }, remaining)
          }
        }
      })

    return () => {
      ignore = true
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      controller.abort()
    }
  }, [url])

  return { data, loading, error }
}
