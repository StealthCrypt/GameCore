import { NextResponse } from 'next/server'
import { prisma } from '../../../../stuff/prisma'
import { prisma } from '@/stuff/prisma'
//uses the genereate token function from token ts file
import { generateToken } from '../JWT'
import bcrypt from 'bcrypt'

// POST - Login user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    })

    // Create response with user data
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
      }
    })

    // Set HttpOnly cookie
    console.log('Setting token cookie:', token.substring(0, 20) + '...')
    response.cookies.set('token', token, {
      httpOnly: true,           // Cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict',       // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days= 60 sec * 60 min * 24 hr * 7 days
      path: '/'
    })
    
    console.log('Cookie header:', response.cookies.getAll())
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}