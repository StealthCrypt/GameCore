import { NextResponse } from 'next/server'
import { prisma } from '@/stuff/prisma'

// GET all games
export async function GET() {
  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        purchases: {
          select: {
            userId: true
          }
        }
      }
    })
    return NextResponse.json(games)
  } catch (error) {
    console.error('Error fetching games:', error)
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 })
  }
}

// POST new game
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, price, imageUrl, category, platform } = body

    if (!title || price === undefined || price === null) {
      return NextResponse.json(
        { error: 'Title and price are required' },
        { status: 400 }
      )
    }

    const game = await prisma.game.create({
      data: {
        title,
        description: description || null,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
        category: category || null,
        platform: platform || null
      }
    })
    
    return NextResponse.json(game, { status: 201 })
  } catch (error) {
    console.error('Error creating game:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create game'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
