'use client'

import { useRequests } from '@/hooks/useRequests'
import { requestsAPI, gamesAPI } from '@/stuff/api'
import { useState } from 'react'
import { useUser } from '@/hooks/useUser'

export default function AdminRequestsPage() {
  const { requests, loading, error, refetch } = useRequests()
  const [message, setMessage] = useState('')
  // useUser hook handles all user fetching logic in one place
  const { user } = useUser()

  async function handleStatusUpdate(requestId: string, status: 'approved' | 'rejected') {
    try {
      // If approving, create a game from the request
      if (status === 'approved') {
        const request = requests.find(r => r.id === requestId)
        if (request) {
          // Parse description to extract external link and platforms
          let externalLink = ''
          let platforms = ''

          
          //this part used AI
          if (request.description) {
            const linkMatch = request.description.match(/External Link:\s*(.+?)(?:\n|$)/)
            const platformMatch = request.description.match(/Platforms:\s*(.+?)(?:\n|$)/)
            
            if (linkMatch) externalLink = linkMatch[1].trim()
            if (platformMatch) platforms = platformMatch[1].trim()
          }

          // Create the game with extracted info
          await gamesAPI.create({
            title: request.gameName,
            description: externalLink ? `External Link: ${externalLink}` : 'Requested by user',
            price: 0, // Default to free, admin can edit later
            category: 'User Request',
            platform: platforms || 'Unknown'
          })
        }
      }

      // Update request status
      await requestsAPI.updateStatus(requestId, status)
      setMessage(status === 'approved' 
        ? 'Request approved and game added successfully!' 
        : 'Request rejected successfully!')
      refetch()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to update request')
    }
  }

  async function handleDelete(requestId: string) {
    if (!confirm('Are you sure you want to delete this request?')) return
    
    try {
      await requestsAPI.delete(requestId)
      setMessage('Request deleted successfully!')
      refetch()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to delete request')
    }
  }

  if (!user || !user.isAdmin) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
            Access Denied. Admin privileges required.
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Game Requests</h1>

        {message && (
          <div className={`${message.includes('success') || message.includes('approved') || message.includes('rejected') ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-red-500/20 border-red-500 text-red-300'} border p-3 rounded-lg mb-6`}>
            {message}
          </div>
        )}

        {loading && <p className="text-center text-muted-foreground">Loading requests...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Pending Requests */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Pending Requests ({requests.filter(r => r.status === 'pending').length})</h2>
          <div className="space-y-4">
            {requests.filter(r => r.status === 'pending').length === 0 ? (
              <p className="text-muted-foreground">No pending requests</p>
            ) : (
              requests
                .filter(r => r.status === 'pending')
                .map((request) => (
                  <div
                    key={request.id}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{request.gameName}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          Requested by: {request.user.name || request.user.email}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {new Date(request.createdAt).toLocaleString()}
                        </p>
                        {request.description && (
                          <div className="bg-muted p-3 rounded text-sm whitespace-pre-wrap mb-4">
                            {request.description}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                         Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'rejected')}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Approved Requests */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Approved Requests ({requests.filter(r => r.status === 'approved').length})</h2>
          <div className="space-y-4">
            {requests.filter(r => r.status === 'approved').length === 0 ? (
              <p className="text-muted-foreground">No approved requests</p>
            ) : (
              requests
                .filter(r => r.status === 'approved')
                .map((request) => (
                  <div
                    key={request.id}
                    className="bg-card border border-green-600/30 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">{request.gameName}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {request.user.name || request.user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Rejected Requests */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-red-400">Rejected Requests ({requests.filter(r => r.status === 'rejected').length})</h2>
          <div className="space-y-4">
            {requests.filter(r => r.status === 'rejected').length === 0 ? (
              <p className="text-muted-foreground">No rejected requests</p>
            ) : (
              requests
                .filter(r => r.status === 'rejected')
                .map((request) => (
                  <div
                    key={request.id}
                    className="bg-card border border-red-600/30 rounded-lg p-4 opacity-60"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">{request.gameName}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {request.user.name || request.user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
