import { NextResponse } from 'next/server'
import { prisma } from '@/stuff/prisma'
import bcrypt from 'bcrypt'

// POST - Register new user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, isAdmin } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        isAdmin: isAdmin || false, // Optional, defaults to false
      },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        createdAt: true,
        // Don't return password!
      }
    })

    return NextResponse.json(
      { message: 'User registered successfully', user },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    )
  }
}
