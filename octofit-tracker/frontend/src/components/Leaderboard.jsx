import { useEffect, useState } from 'react'

const CODESPACES_API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
const LOCAL_API_URL = 'http://localhost:8000/api/leaderboard/'
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

function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.status}`)
        }

        const data = await response.json()
        setItems(normalizeItems(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown leaderboard error')
      } finally {
        setLoading(false)
      }
    }

    void loadLeaderboard()
  }, [])

  const period = items[0]?.period || 'Current period'
  const entries = items[0]?.entries || []

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <p className="text-body-secondary small mb-1">Endpoint: {API_URL}</p>
      <p className="text-body-secondary small">Period: {period}</p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={`${entry.rank}-${entry?.user?._id || entry.points}`}>
                  <td>{entry.rank ?? '-'}</td>
                  <td>{entry?.user?.name || '-'}</td>
                  <td>{entry.points ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
