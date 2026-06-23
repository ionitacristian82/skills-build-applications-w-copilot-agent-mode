import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-2">OctoFit Tracker</h1>
        <p className="text-body-secondary mb-3">React 19 presentation tier for the OctoFit multi-tier app.</p>
        <div className="alert alert-info mb-3" role="alert">
          Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces API calls.
          The app falls back to <strong>http://localhost:8000</strong> when unset.
        </div>
        <p className="small mb-0">
          Current VITE_CODESPACE_NAME: <strong>{codespaceName || '(not set)'}</strong>
        </p>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : 'text-bg-light border border-secondary-subtle'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
