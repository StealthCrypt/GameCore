import { NextRequest } from 'next/server'
//the middleware uses the JWT file to generate and verify tokens
import { verifyToken, TokenPayload } from './JWT'

export function getTokenFromRequest(request: NextRequest): string | null {
  const token = request.cookies.get('token')?.value
  return token || null
}

export function authenticateRequest(request: NextRequest): TokenPayload | null {
  const token = getTokenFromRequest(request)
  if (!token) return null
  
  return verifyToken(token)
}
//testing purposes
export function requireAuth(request: NextRequest): TokenPayload {
  const user = authenticateRequest(request)
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export function requireAdmin(request: NextRequest): TokenPayload {
  const user = requireAuth(request)
  if (!user.isAdmin) {
    throw new Error('Admin required')
  }
  return user
}