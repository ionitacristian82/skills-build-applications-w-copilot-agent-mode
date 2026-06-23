import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

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

function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/workouts/`)

        if (!response.ok) {
          throw new Error(`Failed to fetch workouts: ${response.status}`)
        }

        const data = await response.json()
        setItems(normalizeItems(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown workouts error')
      } finally {
        setLoading(false)
      }
    }

    void loadWorkouts()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      <p className="text-body-secondary small">Endpoint: {`${API_BASE_URL}/api/workouts/`}</p>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {items.map((workout) => (
            <div className="col-12 col-lg-4" key={workout._id || workout.title}>
              <article className="card shadow-sm h-100">
                <div className="card-body">
                  <h3 className="h6 card-title">{workout.title || '-'}</h3>
                  <p className="mb-2 text-body-secondary">Difficulty: {workout.difficulty || '-'}</p>
                  <p className="mb-1">Duration: {workout.durationMinutes ?? '-'} min</p>
                  <p className="mb-0">Est. Calories: {workout.estimatedCalories ?? '-'}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
