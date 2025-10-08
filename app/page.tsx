'use client'

import Image from "next/image"
import Link from "next/link"
import { useGames } from "@/hooks/useGames"

export default function Home() {
  const { games, loading, error } = useGames()

  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(0,13vw)_1fr] h-screen w-screen overflow-hidden" style={{backgroundColor: '#202020ff'}}>
      <div className="pr-5 drop-shadow-[0_0_5px_rgba(255,255,255,1)]"  style={{backgroundColor: '#202020ff'}}>
      </div>
      <div className="flex-grow w-full h-full p-5 overflow-y-auto">
        <div className="bg-black rounded-lg max-w-7xl mx-auto" style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#ffffffff'
        }}>
          
          <h1 className="text-center text-4xl font-semibold pt-3">New Releases</h1>
          
          {loading && (
            <p className="text-center p-10 text-muted-foreground">Loading games...</p>
          )}
          
          {error && (
            <p className="text-center p-10 text-red-500">Error: {error}</p>
          )}
          
          {!loading && games.length === 0 && (
            <p className="text-center p-10 text-muted-foreground">
              No games available. Add some games to get started!
            </p>
          )}
          
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-2 ml-2 mr-2">
            {games.map((game) => (
              <Link key={game.id} href={`/game/${game.id}`}>
                <li className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg drop-shadow-[0_0_30px_rgba(0,0,0,1)] hover:scale-105 transition-transform">
                  {game.imageUrl ? (
                    <Image
                      className="flex justify-center items-center mx-auto rounded-t-lg"
                      src={game.imageUrl}
                      alt={game.title}
                      width={150}
                      height={150}
                    />
                  ) : (
                    <Image
                      className="flex justify-center items-center mx-auto"
                      aria-hidden
                      src="/file.svg"
                      alt="Game icon"
                      width={150}
                      height={150}
                    />
                  )}
                  <div className="p-2 mx-auto mt-5 bg-gray-900 rounded-lg">
                    <h2 className="text-2xl font-semibold drop-shadow-[0_0_4px_rgba(0,0,0,1)] truncate">
                      {game.title}
                    </h2>
                    {game.category && (
                      <p className="text-sm text-purple-300 mb-2">{game.category}</p>
                    )}
                    <h3 className="inline-block pr-1 pl-1 text-lg text-muted-foreground rounded-lg drop-shadow-[0_0_4px_rgba(0,0,0,1)] bg-gradient-to-r from-green-900 to-green-700">
                      ${Number(game.price).toFixed(2)}
                    </h3>
                  </div>
                </li>
              </Link>
            ))}
          </ol>
        </div>
      </div>
    </main>
  )
}