export type Game = {
  title: string
  price: number
  category?: string
  createdAt?: Date
  updatedAt?: Date
  purchases?: any[]
}

export function sortGames(games: Game[], sort: string): Game[] {
  switch (sort) {
    case 'price_asc':
      return games.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return games.sort((a, b) => b.price - a.price)
    case 'newest':
      return games.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
    case 'oldest':
      return games.sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0))
    case 'updated':
      return games.sort((a, b) => (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0))
    case 'popular':
      return games.sort((a, b) => (b.purchases?.length || 0) - (a.purchases?.length || 0))
    default:
      return games
  }
}