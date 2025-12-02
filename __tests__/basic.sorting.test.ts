
import { describe, expect, test } from '@jest/globals'

type Game = {
  id: string | number
  title: string
  price: string | number
  imageUrl?: string | null
  platform?: string | null
  category?: string | null
}

function sortGames(
  games: Game[],
  sortBy: 'price-asc' | 'price-desc' | 'name' | ''
): Game[] {
  const sorted = [...games]

  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => Number(a.price) - Number(b.price))
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => Number(b.price) - Number(a.price))
  } else if (sortBy === 'name') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  }

  return sorted
}

describe('sortGames', () => {
  const baseGames: Game[] = [
    { id: 1, title: 'Zelda',      price: '59' },
    { id: 2, title: 'Among Us',   price: '5'  },
    { id: 3, title: 'Elden Ring', price: '50' }
  ]
  //sorts games by ascending
  test('sorts games by price ascending', () => {
    const result = sortGames([...baseGames], 'price-asc')
    const titles = result.map(g => g.title)
    expect(titles).toEqual(['Among Us', 'Elden Ring', 'Zelda'])
  })
  //Sorts games by price descending
  test('sorts games by price descending', () => {
    const result = sortGames([...baseGames], 'price-desc')
    const titles = result.map(g => g.title)
    expect(titles).toEqual(['Zelda', 'Elden Ring', 'Among Us'])
  })
  //Sorts games alphabetically
  test('sorts games alphabetically by name', () => {
    const result = sortGames([...baseGames], 'name')
    const titles = result.map(g => g.title)
    expect(titles).toEqual(['Among Us', 'Elden Ring', 'Zelda'])
  })

})
