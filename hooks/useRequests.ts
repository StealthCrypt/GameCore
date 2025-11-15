'use client'

import { useEffect, useState } from 'react'
import { requestsAPI } from '@/stuff/api'

type Request = {
  id: string
  userId: string
  gameName: string
  description?: string
  status: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    email: string
    name?: string
  }
}

export function useRequests() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await requestsAPI.getAll()
        setRequests(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch requests')
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const refetch = async () => {
    setLoading(true)
    try {
      const data = await requestsAPI.getAll()
      setRequests(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch requests')
    } finally {
      setLoading(false)
    }
  }

  return { requests, loading, error, refetch }
}
