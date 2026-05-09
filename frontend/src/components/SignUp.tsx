import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import type { AuthPage } from '../App'

interface SignUpProps {
    onNavigate: (page: AuthPage) => void
}

export default function SignUp({ onNavigate }: SignUpProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)
        try {
            await register(email, password)
            setSuccess('Account created! Signing you in…')
        } catch (err: any) {
            setError(err.response?.data?.error || 'Could not create account')
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

                <h1 className="auth-title">Create an account</h1>
                <p className="auth-subtitle">Join today — it only takes a moment</p>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {error && (
                        <div className="auth-error" role="alert">
                            <span>⚠</span>
                            <span>{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="auth-success" role="status">
                            <span>✓</span>
                            <span>{success}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="signup-email">Email address</label>
                        <input
                            id="signup-email"
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
                        <label className="form-label" htmlFor="signup-password">Password</label>
                        <input
                            id="signup-password"
                            className="form-input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <button
                        id="signup-submit"
                        className="btn-primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating account…' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{' '}
                    <button
                        id="goto-signin"
                        className="auth-link"
                        onClick={() => onNavigate('signin')}
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    )
}