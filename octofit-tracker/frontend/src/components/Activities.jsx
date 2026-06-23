import { useEffect, useState } from 'react'

const CODESPACES_API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
const LOCAL_API_URL = 'http://localhost:8000/api/activities/'
const API_URL = import.meta.env.VITE_CODESPACE_NAME ? CODESPACES_API_URL : LOCAL_API_URL

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`Failed to fetch activities: ${response.status}`)
        }

        const data = await response.json()
        setItems(normalizeItems(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown activities error')
      } finally {
        setLoading(false)
      }
    }

    void loadActivities()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      <p className="text-body-secondary small">Endpoint: {API_URL}</p>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration (min)</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id || `${activity.type}-${activity.occurredAt}`}>
                  <td>{activity.type || '-'}</td>
                  <td>{activity?.user?.name || '-'}</td>
                  <td>{activity.durationMinutes ?? '-'}</td>
                  <td>{activity.pointsEarned ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
