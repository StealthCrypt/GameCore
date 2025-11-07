// API utility functions for making requests

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Generic fetch wrapper
async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Something went wrong')
  }

  return response.json()
}

// Games API
export const gamesAPI = {
  getAll: () => fetchAPI('/games'),
  getById: (id: string) => fetchAPI(`/games/${id}`),
  create: (data: { title: string; description?: string; price: number; imageUrl?: string; category?: string; platform?: string }) =>
    fetchAPI('/games', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<{ title: string; description: string; price: number; imageUrl: string; category: string; platform: string }>) =>
    fetchAPI(`/games/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/games/${id}`, { method: 'DELETE' }),
}

// Users API
export const usersAPI = {
  getAll: () => fetchAPI('/users'),
  getById: (id: string) => fetchAPI(`/users/${id}`),
  update: (id: string, data: Partial<{ name: string; email: string; isAdmin: boolean }>) =>
    fetchAPI(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/users/${id}`, { method: 'DELETE' }),
}

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name?: string; isAdmin?: boolean }) =>
    fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
}


