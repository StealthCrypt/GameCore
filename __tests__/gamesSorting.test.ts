import { sortGames, Game } from '@/utils/sortGames'

describe('Game sorting helper', () => {
  const fakeGames: Game[] = [
    { title: 'Cheap Game', price: 5, createdAt: new Date('2025-01-01') },
    { title: 'Expensive Game', price: 60, createdAt: new Date('2025-03-01') },
    { title: 'Medium Game', price: 25, createdAt: new Date('2025-02-01') },
  ]

  test('sorts by price ascending', () => {
    const sorted = sortGames([...fakeGames], 'price_asc')
    expect(sorted.map(g => g.price)).toEqual([5, 25, 60])
  })

  test('sorts by price descending', () => {
    const sorted = sortGames([...fakeGames], 'price_desc')
    expect(sorted.map(g => g.price)).toEqual([60, 25, 5])
  })
})