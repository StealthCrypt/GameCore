'use client'

import { useGames } from "@/hooks/useGames"
import { GameCard } from "./components/GameCard"
import { useState, useMemo } from "react"

export default function Home() {
  const { games, loading, error } = useGames()
  
  // Filter states
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [freeOnly, setFreeOnly] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | ''>('')

  // Get unique categories from games
  const categories = useMemo(() => {
    const cats = new Set(games.map(game => game.category).filter(Boolean))
    return Array.from(cats)
  }, [games])

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let filtered = [...games]

    // Filter by free games
    if (freeOnly) {
      filtered = filtered.filter(game => Number(game.price) === 0)
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(game => Number(game.price) >= parseFloat(minPrice))
    }
    if (maxPrice) {
      filtered = filtered.filter(game => Number(game.price) <= parseFloat(maxPrice))
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(game => game.category === selectedCategory)
    }

    // Sort
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price))
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price))
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }, [games, minPrice, maxPrice, freeOnly, selectedCategory, sortBy])

  return (
    <main className="min-h-screen w-full bg-[#202020] flex">
      {/* Sidebar Filters */}
      <aside className="w-64 bg-black/30 p-6 border-r border-gray-700 overflow-y-auto">
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Category</h2>
            <div className="space-y-2">
              <label className="flex items-center text-white cursor-pointer hover:text-purple-400">
                <input
                  type="radio"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="mr-2"
                />
                All Games
              </label>
              {categories.map(cat => (
                <label key={cat} className="flex items-center text-white cursor-pointer hover:text-purple-400">
                  <input
                    type="radio"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat as string)}
                    className="mr-2"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Price</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-white">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <label className="flex items-center text-white cursor-pointer hover:text-green-400">
                <input
                  type="checkbox"
                  checked={freeOnly}
                  onChange={(e) => setFreeOnly(e.target.checked)}
                  className="mr-2"
                />
                Free Games Only
              </label>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Sort By</h2>
            <div className="space-y-2">
              <label className="flex items-center text-white cursor-pointer hover:text-purple-400">
                <input
                  type="radio"
                  checked={sortBy === ''}
                  onChange={() => setSortBy('')}
                  className="mr-2"
                />
                Default
              </label>
              <label className="flex items-center text-white cursor-pointer hover:text-purple-400">
                <input
                  type="radio"
                  checked={sortBy === 'price-asc'}
                  onChange={() => setSortBy('price-asc')}
                  className="mr-2"
                />
                Price: Low to High
              </label>
              <label className="flex items-center text-white cursor-pointer hover:text-purple-400">
                <input
                  type="radio"
                  checked={sortBy === 'price-desc'}
                  onChange={() => setSortBy('price-desc')}
                  className="mr-2"
                />
                Price: High to Low
              </label>
              <label className="flex items-center text-white cursor-pointer hover:text-purple-400">
                <input
                  type="radio"
                  checked={sortBy === 'name'}
                  onChange={() => setSortBy('name')}
                  className="mr-2"
                />
                Name A-Z
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          {(minPrice || maxPrice || freeOnly || selectedCategory || sortBy) && (
            <button
              onClick={() => {
                setMinPrice('')
                setMaxPrice('')
                setFreeOnly(false)
                setSelectedCategory('')
                setSortBy('')
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold text-white mb-2">New Releases</h1>
        <p className="text-gray-400 mb-6">Found {filteredGames.length} games</p>
        
        {loading && (
          <p className="text-center p-10 text-gray-400">Loading games...</p>
        )}
        
        {error && (
          <p className="text-center p-10 text-red-500">Error: {error}</p>
        )}
        
        {!loading && games.length === 0 && (
          <div className="text-center p-10">
            <p className="text-gray-400 text-lg mb-4">
              No games available yet. Add some games to get started!
            </p>
            <a 
              href="/admin" 
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-400 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium"
            >
              Add Games
            </a>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              price={Number(game.price)}
              image={game.imageUrl || undefined}
              rating={4}
              genre={game.category || 'Action'}
            />
          ))}
        </div>
      </div>
    </main>
  )
}