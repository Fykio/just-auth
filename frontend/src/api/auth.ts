import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    withCredentials: true   // send cookies
})

export interface User {
    id: number
    email: string
    created_at: string
}

export async function signup(email: string, password: string): Promise<User> {
    const res = await api.post('/signup', { email, password })
    return res.data
}

export async function signin(email: string, password: string): Promise<void> {
    await api.post('/signin', { email, password })
}

export async function signout(): Promise<void> {
    await api.post('/signout')
}

export async function getMe(): Promise<User> {
    const res = await api.get('/me')
    return res.data
}