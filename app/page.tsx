import Link from "next/link"

export default function GameStorePage() {
  const featuredGames = [
    {
      id: 1,
      title: "Cyber Nexus 2077",
      price: "$59.99",
      originalPrice: "$79.99",
      discount: "-25%",
      rating: 4.8,
      image: "/api/placeholder/384/192",
      tags: ["Action", "RPG", "Cyberpunk"],
    },
    {
      id: 2,
      title: "Mystic Realms",
      price: "$39.99",
      originalPrice: "$49.99",
      discount: "-20%",
      rating: 4.6,
      image: "/api/placeholder/384/192",
      tags: ["Adventure", "Fantasy", "Open World"],
    },
    {
      id: 3,
      title: "Stellar Warfare",
      price: "$29.99",
      originalPrice: null,
      discount: null,
      rating: 4.9,
      image: "/api/placeholder/384/192",
      tags: ["Strategy", "Sci-Fi", "Multiplayer"],
    },
  ]

  const categories = [
    { name: "Action", count: 1247, color: "from-red-500 to-orange-500" },
    { name: "Adventure", count: 892, color: "from-green-500 to-teal-500" },
    { name: "RPG", count: 634, color: "from-purple-500 to-pink-500" },
    { name: "Strategy", count: 445, color: "from-blue-500 to-cyan-500" },
    { name: "Simulation", count: 321, color: "from-yellow-500 to-orange-500" },
    { name: "Sports", count: 298, color: "from-indigo-500 to-purple-500" },
  ]

  const specialOffers = [
    {
      id: 1,
      title: "Weekend Sale",
      description: "Up to 75% off selected titles",
      timeLeft: "2 days left",
      image: "/api/placeholder/400/200",
    },
    {
      id: 2,
      title: "Indie Spotlight",
      description: "Discover amazing indie games",
      timeLeft: "5 days left",
      image: "/api/placeholder/400/200",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Browse</h3>
                <div className="space-y-1">
                  <Link href="/" className="flex items-center gap-3 px-3 py-2 text-primary bg-purple-500/10 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Featured
                  </Link>
                  <Link
                    href="/new-releases"
                    className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    New Releases
                  </Link>
                  <Link
                    href="/top-sellers"
                    className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    Top Sellers
                  </Link>
                  <Link
                    href="/offers"
                    className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Special Offers
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.slice(0, 4).map((category) => (
                    <Link
                      key={category.name}
                      href={`/category/${category.name.toLowerCase()}`}
                      className="flex items-center justify-between px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      <span>{category.name}</span>
                      <span className="text-xs text-muted-foreground">{category.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8">
          {/* Featured Games */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Featured Games</h2>
              <button className="px-4 py-2 text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white rounded-lg transition-colors">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGames.map((game) => (
                <div
                  key={game.id}
                  className="group overflow-hidden bg-card border border-border hover:border-purple-500 rounded-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-muted group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                      <span className="text-muted-foreground">Game Image</span>
                    </div>
                    {game.discount && (
                      <span className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded text-sm font-semibold">
                        {game.discount}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{game.title}</h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm text-muted-foreground">{game.rating}</span>
                      </div>
                      <div className="flex gap-1">
                        {game.tags.map((tag) => (
                          <span key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-purple-500">{game.price}</span>
                        {game.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">{game.originalPrice}</span>
                        )}
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm flex items-center gap-2 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                          />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Special Offers */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Special Offers</h2>
              <button className="px-4 py-2 text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white rounded-lg transition-colors">
                View All Deals
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specialOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="relative overflow-hidden bg-card border border-border hover:border-purple-500 rounded-lg transition-all duration-300 group"
                >
                  <div className="w-full h-32 bg-muted group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                    <span className="text-muted-foreground">Offer Banner</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                    <p className="text-gray-300 mb-3">{offer.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-semibold">
                        {offer.timeLeft}
                      </span>
                      <button className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition-colors">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Game Categories */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Browse by Category</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link key={category.name} href={`/category/${category.name.toLowerCase()}`} className="group cursor-pointer">
                  <div
                    className={`bg-gradient-to-br ${category.color} p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300`}
                  >
                    <h3 className="text-white font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.count} games</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
