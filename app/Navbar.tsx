"use client"

import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type User = {
  name?: string
  email?: string
  isAdmin?: boolean
}

function NavbarContent() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '') //search bar

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in by checking localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  //for search bar
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (pathname !== '/') {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`)
    } else {
      const url = new URL(window.location.href)
      url.searchParams.set('search', searchQuery)
      router.push(url.pathname + url.search)
    }
  }

  //for search bar
  const handleSearchInput = (value: string) => {
    setSearchQuery(value)
    if (pathname === '/') {
      const url = new URL(window.location.href)
      if (value) {
        url.searchParams.set('search', value)
      } else {
        url.searchParams.delete('search')
      }
      router.push(url.pathname + url.search)
    }
  }

  const isActive = (path: string) => mounted && pathname === path

  async function handleLogout() {
    try {
      // Call logout API to clear the HttpOnly cookie
      await fetch('/api/auth/logout', { method: 'POST' })
      
      // Clear localStorage
      localStorage.removeItem('user')
      setUser(null)
      
      // Redirect to login
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-lg shadow-white/20 bg-gradient-to-r from-gray-900 to-purple-400">
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className=" flex items-center justify-center">
              <Image
                src="/Logo SVG.svg"
                alt="Game Core Logo"
                width={64}
                height={64}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent ">
                Game Core
              </h1>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:block relative flex-1 max-w-md mx-4">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search games..."
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/profile"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive("/profile") ? "text-purple-500 bg-purple-500/10" : "text-foreground hover:text-purple-500"
              }`}
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive("/settings") ? "text-purple-500 bg-purple-500/10" : "text-foreground hover:text-purple-500"
              }`}
            >
              Settings
            </Link>
            <Link
              href="/request"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive("/request") ? "text-purple-500 bg-purple-500/10" : "text-foreground hover:text-purple-500"
              }`}
            >
              Request
            </Link>
            
            {/* Show user info if logged in, otherwise show login/signup */}
            {user ? (
              <>
                <span className="text-md text-white">
                  {user.name || user.email}
                </span>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="px-3 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive("/login") ? "text-purple-500 bg-purple-500/10" : "text-foreground hover:text-purple-500"
                  }`}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-3 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="md:hidden relative mb-4">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder="Search games..."
                className="w-full bg-muted border border-border rounded-lg px-4 py-2 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>

            {/* Mobile Navigation Links */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-md transition-colors ${
                isActive("/") ? "text-purple-500 bg-purple-500/10" : "text-foreground hover:bg-purple-500/10"
              }`}
            >
              Store
            </Link>
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-md transition-colors ${
                isActive("/profile") ? "text-purple-500 bg-purple-500/10" : "text-foreground hover:bg-purple-500/10"
              }`}
            >
              Profile
            </Link>
            <Link
              href="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-md transition-colors ${
                isActive("/settings") ? "text-purple-500 bg-purple-500/10" : "text-foreground hover:bg-purple-500/10"
              }`}
            >
              Settings
            </Link>
            <Link
              href="/request"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-md transition-colors ${
                isActive("/request") ? "text-purple-500 bg-purple-500/10" : "text-foreground hover:bg-purple-500/10"
              }`}
            >
              Request
            </Link>
            
            {/* Mobile user menu */}
            {user ? (
              <>
                <div className="px-4 py-3 text-white">
                  Welcome, {user.name || user.email}
                </div>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-md bg-purple-600 text-white"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleLogout()
                  }}
                  className="block w-full text-left px-4 py-3 rounded-md bg-red-600 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive("/login") ? "text-purple-500 bg-purple-500/10" : "text-foreground hover:bg-purple-500/10"
                  }`}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-md bg-purple-600 text-white text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

const Navbar = () => {
  return (
    <Suspense fallback={
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-lg shadow-white/20 bg-gradient-to-r from-gray-900 to-purple-400">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-8 bg-purple-600 rounded-lg"></div>
          </div>
        </div>
      </header>
    }>
      <NavbarContent />
    </Suspense>
  )
}

export default Navbar