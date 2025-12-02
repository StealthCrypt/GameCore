'use client'

import { useState, useEffect } from 'react'

// Define the User type that can be used across the app
export type User = {
  id: string
  username?: string
  name?: string
  email?: string
  isAdmin?: boolean
}

/**
 * Custom hook to fetch and manage user authentication state.
 * This centralizes user fetching logic so it doesn't need to be repeated in every component.
 * 
 * @returns {Object} - { user, loading, refetch, logout }
 *   - user: The current user object or null if not logged in
 *   - loading: Boolean indicating if user data is being fetched
 *   - refetch: Function to manually refresh user data from the API
 *   - logout: Function to log out the user
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user data from localStorage and optionally refresh from API
  async function fetchUserData() {
    setLoading(true)
    const storedUser = localStorage.getItem('user')
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        
        // Fetch fresh user data from API to get current status (like isAdmin)
        const response = await fetch(`/api/users/${parsedUser.id}`)
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          // Update localStorage with fresh data
          localStorage.setItem('user', JSON.stringify(userData))
        } else {
          // If API call fails, use the stored data
          setUser(parsedUser)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        // Fallback to stored user if API fails
        try {
          setUser(JSON.parse(storedUser))
        } catch {
          setUser(null)
        }
      }
    } else {
      setUser(null)
    }
    
    setLoading(false)
  }

  // Logout function - clears user data and calls logout API
  async function logout() {
    try {
      // Call logout API to clear the HttpOnly cookie
      await fetch('/api/auth/logout', { method: 'POST' })
      
      // Clear localStorage
      localStorage.removeItem('user')
      setUser(null)
      
      // Redirect to login
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Fetch user data on initial mount
  useEffect(() => {
    fetchUserData()
  }, [])

  return {
    user,
    loading,
    refetch: fetchUserData,
    logout
  }
}
