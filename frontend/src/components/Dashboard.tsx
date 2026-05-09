import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
    const { user, logout } = useAuth()

    const memberSince = user?.created_at
        ? new Date(user.created_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
          })
        : '—'

    return (
        <div className="dashboard-bg">
            {/* Navbar */}
            <nav className="dashboard-nav">
                <div className="dashboard-brand">
                    <div className="dashboard-brand-icon">🔐</div>
                    <span className="dashboard-brand-name">JustAuth</span>
                </div>
                <button id="signout-btn" className="btn-signout" onClick={logout}>
                    Sign Out
                </button>
            </nav>

            {/* Main */}
            <main className="dashboard-main">
                <div className="dashboard-card">
                    <p className="dashboard-welcome">Welcome back</p>
                    <h1 className="dashboard-username">
                        {user?.email?.split('@')[0] ?? 'User'}
                    </h1>
                    <p className="dashboard-email">{user?.email}</p>

                    <div className="dashboard-stats">
                        <div className="stat-card">
                            <p className="stat-label">Status</p>
                            <p className="stat-value">
                                <span className="status-dot" />
                                Active
                            </p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Member Since</p>
                            <p className="stat-value">{memberSince}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}