'use client'

import { useEffect, useState } from 'react'
import { gamesAPI } from '@/lib/api'

type Game = {
  id: string
  title: string
  description?: string
  price: string
  imageUrl?: string
  category?: string
  createdAt: string
  updatedAt: string
}

export function useGames() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGames() {
      try {
        const data = await gamesAPI.getAll()
        setGames(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch games')
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  return { games, loading, error, refetch: () => setLoading(true) }
}

export function useGame(id: string) {
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGame() {
      try {
        const data = await gamesAPI.getById(id)
        setGame(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch game')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchGame()
    }
  }, [id])

  return { game, loading, error }
}
