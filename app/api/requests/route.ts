import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/stuff/prisma'
import { authenticateRequest } from '@/app/api/auth/middleware'

// GET all requests (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = authenticateRequest(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can see all requests
    if (!user.isAdmin) {
      // Regular users can only see their own requests
      const requests = await prisma.request.findMany({
        where: { userId: user.userId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(requests)
    }

    // Admin sees all requests
    const requests = await prisma.request.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
  }
}

// POST new request (logged in users only)
export async function POST(request: NextRequest) {
  try {
    console.log('Cookies:', request.cookies.getAll())
    const user = authenticateRequest(request)
    console.log('Authenticated user:', user)
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized - Please login' }, { status: 401 })
    }

    const body = await request.json()
    const { gameName, description } = body

    if (!gameName) {
      return NextResponse.json(
        { error: 'Game name is required' },
        { status: 400 }
      )
    }

    const newRequest = await prisma.request.create({
      data: {
        userId: user.userId,
        gameName,
        description: description || null,
        status: 'pending'
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    })
    
    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 })
  }
}
