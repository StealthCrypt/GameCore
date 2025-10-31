"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (path: string) => mounted && pathname === path

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-lg shadow-white/20 bg-gradient-to-r from-gray-900 to-purple-400">
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Game Core
              </h1>
              <p className="text-xs text-muted-foreground">by Vision Labs</p>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:block relative flex-1 max-w-md mx-4">
            <input 
              type="text"
              placeholder="Search games..."
              className="w-full bg-muted border border-border rounded-lg px-4 py-2 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Link href="/search">
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
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive("/") ? "text-purple-500 bg-purple-500/10" : "text-foreground hover:text-purple-500"
              }`}
            >
              Store
            </Link>
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
            <div className="md:hidden relative mb-4">
              <input 
                type="text"
                placeholder="Search games..."
                className="w-full bg-muted border border-border rounded-lg px-4 py-2 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Link href="/search">
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
              </Link>
            </div>

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
          </div>
        )}
      </div>
    </header>
  );
}
export default Navbar