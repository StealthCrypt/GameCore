'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authAPI } from "@/lib/api"

export default function Signup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await authAPI.register({
        email: formData.email,
        password: formData.password,
        name: formData.name
      })

      // Success - redirect to login
      alert('Account created successfully! Please login.')
      router.push('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#202020ff'}}>
    <div className="shadow-lg shadow-purple-500 mb-3 p-5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg borderwidth-5 justify-content-center w-1/3 mx-auto" style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: '#ffffffff' }}>
      <p className="drop-shadow-[0_0_10px_rgba(0,0,0,1)] justify-center text-2xl font-semibold mb-5 text-center">
        Welcome!
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
              type="text"
              placeholder="Username"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className=" shadow-lg shadow-purple-500 w-full bg-muted border border-border rounded-lg px-40 py-2 pl-10 mb-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 mr-20 focus:border-3 focus:transition-all duration-400 ease-in-out"
            />
          </li>
          <li>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="shadow-lg shadow-purple-500 w-full bg-muted border border-border rounded-lg px-40 py-2 pl-10 mb-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 mr-20 focus:border-3 focus:transition-all duration-400 ease-in-out"
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
          <li>
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="shadow-lg shadow-purple-500 w-full bg-muted border border-border rounded-lg px-40 py-2 pl-10 mb-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 mr-20 focus:border-3 focus:transition-all duration-400 ease-in-out"
            />
          </li>
        </ol>

        <button 
          type="submit"
          disabled={loading}
          className="shadow-lg mt-5 shadow-purple-500 w-full bg-black transition-all duration-500 ease-in-out hover:bg-purple-800 shadow-lg shadow-purple-200 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      <p className="justify-center text-md font-semibold mt-4 text-center">
        <Link href="/login" className="justify-center text-sm font-lightbold text-center">
          Already have an account? Log in here!
        </Link>
      </p>
    </div>
</main>




  );
}