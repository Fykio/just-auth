import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import type { AuthPage } from '../App'

interface SignInProps {
    onNavigate: (page: AuthPage) => void
}

export default function SignIn({ onNavigate }: SignInProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password)
        } catch (err: any) {
            setError(err.response?.data?.error || 'Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-bg">
            <div className="auth-card">
                {/* Brand */}
                <div className="auth-logo">
                    <div className="auth-logo-icon">🔐</div>
                    <span className="auth-logo-name">JustAuth</span>
                    <span className="auth-logo-tagline">Secure authentication, simplified</span>
                </div>

                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-subtitle">Sign in to your account to continue</p>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {error && (
                        <div className="auth-error" role="alert">
                            <span>⚠</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="signin-email">Email address</label>
                        <input
                            id="signin-email"
                            className="form-input"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="signin-password">Password</label>
                        <input
                            id="signin-password"
                            className="form-input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        id="signin-submit"
                        className="btn-primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{' '}
                    <button
                        id="goto-signup"
                        className="auth-link"
                        onClick={() => onNavigate('signup')}
                    >
                        Create one
                    </button>
                </p>
            </div>
        </div>
    )
}