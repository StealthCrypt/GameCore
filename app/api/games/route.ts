import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all games (sortable)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || undefined
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort')

    const where: any = {}

    if (category) where.category = category
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    // sorting logic
    let orderBy: any = { createdAt: 'desc'} //default

    if (sort === 'price_asc') orderBy = {price: 'asc'}
    else if (sort === 'price_desc') orderBy = { price: 'desc'}
    else if (sort === 'newest') orderBy = {createdAT: 'desc'}
    else if (sort === 'oldest') orderBy = {createdAt: 'asc'}
    else if (sort === 'updated') orderBy = {updatedAt: 'desc'}
    else if (sort === 'popular') {
      // sort manually by popularity(# of purchases)
      const games = await prisma.game.findMany({
        where,
        include: {purchases: true}
      })

      const sorted = games.sort(
        (a, b) => b.purchases.length - a.purchases.length
      )

      return NextResponse.json(sorted)

    }

    const games = await prisma.game.findMany({
      where,
      orderBy,
      include: {
        purchases: {select: {userId: true}},
      },
    })

    return NextResponse.json(games)
  } catch (error) {
    console.error('Error fetching games:', error)
    return NextResponse.json(
      {error: 'Failed to fetch games'},
      {status: 500}
    )
  }
}
//     const games = await prisma.game.findMany({
//       orderBy: { createdAt: 'desc' },
//       include: {
//         purchases: {
//           select: {
//             userId: true
//           }
//         }
//       }
//     })
//     return NextResponse.json(games)
//   } catch (error) {
//     console.error('Error fetching games:', error)
//     return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 })
//   }
// }

// POST new game
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, price, imageUrl, category } = body

    if (!title || !price) {
      return NextResponse.json(
        { error: 'Title and price are required' },
        { status: 400 }
      )
    }

    const game = await prisma.game.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
      }
    })
    
    return NextResponse.json(game, { status: 201 })
  } catch (error) {
    console.error('Error creating game:', error)
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 })
  }
}
