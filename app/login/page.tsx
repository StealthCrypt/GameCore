'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authAPI } from "@/stuff/api"

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const result = await authAPI.login({
        email: formData.email,
        password: formData.password
      })

      // Store user data
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(result.user))
      } else {
        sessionStorage.setItem('user', JSON.stringify(result.user))
      }

      // Success - redirect to home
      alert('Login successful!')
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#202020ff'}}>
    <div className="drop-shadow-[0_0_10px_rgba(0,0,0,1)] shadow-lg shadow-purple-500 mb-3 p-5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg borderwidth-5 justify-content-center w-1/3 mx-auto" style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: '#ffffffff' }}>
      <p className="justify-center text-2xl font-semibold mb-5 text-center drop-shadow-[0_0_14px_rgba(0,0,0,1)]">
        Welcome Back! Please login.
      </p>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <ol>
          <li>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className=" shadow-lg shadow-purple-500 w-full bg-muted border border-border rounded-lg px-40 py-2 pl-10 mb-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 mr-20 focus:border-3 focus:transition-all duration-400 ease-in-out"
            />
          </li>
          <li>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="shadow-lg shadow-purple-500 w-full bg-muted border border-border rounded-lg px-40 py-2 pl-10 mb-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 mr-20 focus:border-3 focus:transition-all duration-400 ease-in-out"
            />
          </li>
        </ol>
        <ol className="side-by-side flex justify-between mb-3 px-10">
          <li>
            <p className="justify-center text-md font-semibold mb-1 text-center">
              Forgot Password?
            </p>
          </li>
          <li>
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="justify-center text-md font-semibold mb-1 text-center" 
            />
            <label htmlFor="remember" className="text-md font-semibold">
              Remember Me
            </label>
          </li>
        </ol>
        <button 
          type="submit"
          disabled={loading}
          className="shadow-lg shadow-purple-500 w-full bg-black transition-all duration-500 ease-in-out hover:bg-purple-800 shadow-lg shadow-purple-200 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    <p className="justify-center text-md font-semibold mb-1 text-center">
      <Link href="/signup" className="justify-center text-sm font-lightbold mt-2 text-center">
        Not registered yet? Sign up here!
      </Link>
    </p>
  </div>
  </main>





  );
}