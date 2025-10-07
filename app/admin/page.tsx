'use client'

import { useState } from 'react'
import { gamesAPI } from '@/lib/api'
import { useGames } from '@/hooks/useGames'

export default function AdminPage() {
  const { games, loading, error } = useGames()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    imageUrl: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      await gamesAPI.create({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        imageUrl: formData.imageUrl
      })
      
      setMessage('Game added successfully!')
      setFormData({ title: '', description: '', price: '', category: '', imageUrl: '' })
      
      // Refresh the page after 1 second
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to add game')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this game?')) return

    try {
      await gamesAPI.delete(id)
      setMessage('Game deleted successfully!')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to delete game')
    }
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin - Manage Games</h1>

        {/* Add Game Form */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Game</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground"
                placeholder="Game Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground"
                placeholder="Game description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price * ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground"
                  placeholder="59.99"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground"
                  placeholder="RPG, Action, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add Game'}
            </button>

            {message && (
              <p className={`text-center ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Games List */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">All Games ({games.length})</h2>
          
          {loading && <p className="text-muted-foreground">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          
          <div className="space-y-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="flex items-center justify-between bg-muted p-4 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{game.title}</h3>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-green-500 font-semibold">${Number(game.price).toFixed(2)}</span>
                    {game.category && (
                      <span className="text-purple-400">{game.category}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
