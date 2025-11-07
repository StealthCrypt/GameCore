'use client'

import { useEffect, useState } from 'react'
import { usersAPI } from '@/stuff/api'

type Purchase = {
  id: string
  gameId: string
  createdAt: string
  game: {
    id: string
    title: string
    price: string
  }
}

type User = {
  id: string
  email: string
  name?: string
  isAdmin: boolean
  createdAt: string
  updatedAt: string
  purchases?: Purchase[]
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await usersAPI.getAll()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, loading, error, refetch: () => setLoading(true) }
}

export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await usersAPI.getById(id)
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchUser()
    }
  }, [id])

  return { user, loading, error }
}
