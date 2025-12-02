'use client'

import { useUser } from '@/hooks/useUser'

export default function Profile() {
  // useUser hook handles all the user fetching logic in one place
  const { user, loading } = useUser()

  if (loading) {
    return (
      <main className="overflow-hidden flex justify-center items-center bg-black text-white p-5 min-h-screen">
        <p className="text-xl">Loading...</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="overflow-hidden flex justify-center items-center bg-black text-white p-5 min-h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">Please log in to view your profile</p>
          <a href="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
            Go to Login
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="overflow-hidden flex justify-center items-center bg-black text-white p-5">
      <div className=" p-1 w-4/5 h-4/5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg max-h-[1200px] flex flex-col">

        <div className="rounded-lg w-full p-5" style={{ backgroundColor: '#101014ff' }}>
          <ol className="side-by-side-container list-inside flex items-center space-x-5">
            <li>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Profile Icon (GameCore).svg" alt="Profile" className="h-20 w-20 drop-shadow-[0_0_10px_rgba(200,200,200,1)]" />
            </li>
            <li>
              <h1 className="lg:text-5xl md:text-3xl font-bold drop-shadow-[0_0_30px_rgba(0,0,0,1)]">{user.name || user.email}</h1>
            </li>

          </ol>

        </div>
        
      </div>
    </main>





  );
}
