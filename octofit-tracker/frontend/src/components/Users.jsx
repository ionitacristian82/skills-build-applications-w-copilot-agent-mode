import { useEffect, useState } from 'react'

const CODESPACES_API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
const LOCAL_API_URL = 'http://localhost:8000/api/users/'
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

function Users() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`)
        }

        const data = await response.json()
        setItems(normalizeItems(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown users error')
      } finally {
        setLoading(false)
      }
    }

    void loadUsers()
  }, [])

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      <p className="text-body-secondary small">Endpoint: {API_URL}</p>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id || user.email}>
                  <td>{user.name || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.fitnessLevel || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
