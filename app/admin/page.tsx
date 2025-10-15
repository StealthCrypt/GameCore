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
    imageUrl: '',
    isFree: false
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  function handleImageChange(e: { target: { files: FileList | null } }) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      let finalImageUrl = formData.imageUrl

      // Upload image if file is selected
      if (imageFile) {
        const imageFormData = new FormData()
        imageFormData.append('file', imageFile)

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        })

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image')
        }

        const uploadData = await uploadResponse.json()
        finalImageUrl = uploadData.url
      }

      await gamesAPI.create({
        title: formData.title,
        description: formData.description,
        price: formData.isFree ? 0 : (formData.price ? parseFloat(formData.price) : 0),
        category: formData.category,
        imageUrl: finalImageUrl
      })
      
      setMessage('Game added successfully!')
      setFormData({ title: '', description: '', price: '', category: '', imageUrl: '', isFree: false })
      setImageFile(null)
      setImagePreview('')
      
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

  async function handleDelete(id: string) {
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
                <label className="block text-sm font-medium mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  disabled={formData.isFree}
                  value={formData.isFree ? '0' : formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={formData.isFree ? "Free" : "59.99"}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="isFree"
                    checked={formData.isFree}
                    onChange={(e) => setFormData({ ...formData, isFree: e.target.checked, price: e.target.checked ? '0' : formData.price })}
                    className="w-4 h-4 text-purple-600 bg-muted border-border rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <label htmlFor="isFree" className="ml-2 text-sm font-medium text-green-400 cursor-pointer">
                    🎁 Free Game
                  </label>
                </div>
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
              <label className="block text-sm font-medium mb-2">Game Image</label>
              
              {/* File Upload */}
              <div className="mb-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Preview:</p>
                  <div className="relative w-full h-48 bg-black rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview('')
                      }}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* OR Divider */}
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-border"></div>
                <span className="px-4 text-sm text-gray-500">OR</span>
                <div className="flex-1 border-t border-border"></div>
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Image URL (Optional)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground"
                  placeholder="https://example.com/image.jpg"
                  disabled={!!imageFile}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a file above or paste an image URL here
                </p>
              </div>
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
                    {Number(game.price) === 0 ? (
                      <span className="text-green-500 font-semibold bg-green-500/20 px-2 py-1 rounded">FREE</span>
                    ) : (
                      <span className="text-green-500 font-semibold">${Number(game.price).toFixed(2)}</span>
                    )}
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
