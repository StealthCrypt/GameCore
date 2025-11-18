'use client'

import { useGames } from "@/hooks/useGames"
import { GameCard } from "./components/GameCard"
import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const { games, loading, error } = useGames()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  
  // Filter states
  const [platforms] = useState<string[]>([])//array of strings
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [freeOnly, setFreeOnly] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | ''>('')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories from games
  const categories = useMemo(() => {
    const cats = new Set(games.map(game => game.category).filter(Boolean))
    return Array.from(cats)
  }, [games])

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let filtered = [...games]
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filter by game platform
    if (platforms.length > 0) {
      filtered = filtered.filter(game => 
        game.platform && platforms.some(platform => game.platform?.includes(platform))
      )
    }


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
  }, [games, minPrice, maxPrice, freeOnly, selectedCategory, sortBy, platforms, searchQuery])

  return (
    <main className="min-h-screen w-full bg-[#202020] flex relative">
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden fixed top-20 left-4 z-40 bg-purple-600 text-white p-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>

      {/* Sidebar Filters */}
      <aside className={`
        fixed lg:static
        top-0 left-0 h-full
        w-64 bg-black/95 lg:bg-black/30
        p-6 border-r border-gray-700
        overflow-y-auto
        z-40
        transition-transform duration-300
        ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <button
          onClick={() => setShowFilters(false)}
          className="lg:hidden absolute top-24 right-4 text-white hover:text-red-500"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-6 mt-20 lg:mt-0">
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

      {/* Overlay for mobile */}
      {showFilters && (
        <div
          onClick={() => setShowFilters(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 mt-16 lg:mt-0">New Releases</h1>
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              price={Number(game.price)}
              image={game.imageUrl || undefined}
              platform={game.platform}
              genre={game.category || 'Action'}
            />
          ))}
        </div>
      </div>
    </main>
  )
}