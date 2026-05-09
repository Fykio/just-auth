import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import LoadingSpinner from './components/LoadingSpinner'

export type AuthPage = 'signin' | 'signup'

export default function App() {
    const { user, loading } = useAuth()
    const [page, setPage] = useState<AuthPage>('signin')

    if (loading) return <LoadingSpinner />
    if (user) return <Dashboard />

    if (page === 'signup') {
        return <SignUp onNavigate={setPage} />
    }

    return <SignIn onNavigate={setPage} />
}