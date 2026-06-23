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

function Teams() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/teams/`)

        if (!response.ok) {
          throw new Error(`Failed to fetch teams: ${response.status}`)
        }

        const data = await response.json()
        setItems(normalizeItems(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown teams error')
      } finally {
        setLoading(false)
      }
    }

    void loadTeams()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      <p className="text-body-secondary small">Endpoint: {`${API_BASE_URL}/api/teams/`}</p>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {items.map((team) => (
            <div className="col-12 col-md-6" key={team._id || team.name}>
              <article className="card shadow-sm h-100">
                <div className="card-body">
                  <h3 className="h6 card-title mb-1">{team.name || '-'}</h3>
                  <p className="text-body-secondary mb-2">{team.city || '-'}</p>
                  <p className="mb-2">{team.motto || '-'}</p>
                  <p className="mb-0">
                    <strong>Total points:</strong> {team.totalPoints ?? 0}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
