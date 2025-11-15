'use client'

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { gamesAPI } from "@/stuff/api"
import { PLATFORM_MAP } from "@/stuff/constants"

interface Game {
  id: string
  title: string
  price: number
  imageUrl: string | null
  category: string | null
  platform: string | null
}

export default function GamePage() {
  const params = useParams()
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchGame() {
      try {
        const data = await gamesAPI.getById(params.id as string)
        setGame(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load game')
      } finally {
        setLoading(false)
      }
    }
    fetchGame()
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-black">
        <p className="text-white text-2xl">Loading...</p>
      </main>
    )
  }

  if (error || !game) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-black">
        <p className="text-red-500 text-2xl">{error || 'Game not found'}</p>
      </main>
    )
  }

  // Parse platforms from the game.platform string
  const platforms = game.platform ? game.platform.split(', ').map(p => p.trim()) : []
  
  return (
    <main className="overflow-hidden flex justify-center items-center bg-black text-white p-5" style={{ backgroundColor: '#101014ff' }}>
      <div className="p-1 w-4/5 h-4/5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg max-h-[1200px] flex flex-col">
        <div className="side-by-side-container flex space-x-5 items-start flex-grow">
          {/* Image box - Left side */}
          <div className="rounded-lg w-full" style={{ backgroundColor: '#101014ff' }}>
            {game.imageUrl ? (
              <img
                className="flex justify-center items-center mx-auto w-full h-[430px] object-cover rounded-lg"
                src={game.imageUrl}
                alt={game.title}
              />
            ) : (
              <Image
                className="flex justify-center items-center mx-auto"
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={430}
                height={430}
              />
            )}
          </div>
        </div>
        {/* Bottom section */}
        <div className="h-[650px] space-y-4 p-5 mt-1 rounded-lg" style={{ backgroundColor: '#141414ff' }}>
          <div className="side-by-side-container list-inside flex flex-wrap gap-3">
            <h2 className="text-5xl font-semibold text-white">{game.title}</h2>
            <ol className="rounded-lg side-by-side-container list-inside flex flex-wrap gap-3 justify-end ml-auto">
              {game.category && (
                <li className="text-white bg-gradient-to-r from-purple-600 to-purple-400 text-black text-lg h-2/3 rounded-lg w-fit text-center flex items-center justify-center space-x-1 px-3">
                  {game.category}
                </li>
              )}
            </ol>
          </div>
          <div className="side-by-side-container list-inside flex flex-wrap gap-3">
            <div className="rounded-lg w-fit px-3 p-2 pr-20 bg-gradient-to-r from-green-800 to-green-700">
              <p className="text-2xl font-bold drop-shadow-[0_0_12px_rgba(0,0,0,0.7)] ml-1">
                {Number(game.price) === 0 ? 'FREE' : `$${Number(game.price).toFixed(2)}`}
              </p>
            </div>
            <ol className="side-by-side-container list-inside flex flex-wrap ml-auto gap-2 rounded-lg mt-2">
              {platforms.map((platformName) => {
                const platformData = PLATFORM_MAP[platformName]
                if (!platformData) return null
                return (
                  <li key={platformName}>
                    <Image
                      className="flex justify-center items-center pr-1"
                      aria-hidden
                      src={platformData.logo}
                      alt={platformName}
                      width={24}
                      height={24}
                      style={platformData.filter ? { filter: 'brightness(0) invert(1)' } : {}}
                    />
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="rounded-lg pl-3 pb-3" style={{ backgroundColor: '#19191fff' }}>
            <h1 className="p-2 text-xl font-semibold">Find it on:</h1>
            <ol className="side-by-side-container list-inside flex flex-wrap gap-2 rounded-lg">
              {platforms.map((platformName) => {
                const platformData = PLATFORM_MAP[platformName]
                if (!platformData) return null
                
                const platformStyles: Record<string, string> = {
                  'Epic Games': 'bg-gray-800',
                  'Steam': 'bg-gradient-to-r from-gray-800 to-blue-700',
                  'EA': 'bg-gray-600',
                  'Riot Games': 'bg-red-500',
                  'Ubisoft': 'bg-blue-500',
                  'Microsoft Store': 'bg-gradient-to-r from-blue-800 to-blue-600',
                  'Rockstar Games': 'bg-orange-400'
                }

                return (
                  <li key={platformName} className={`text-white ${platformStyles[platformName] || 'bg-gray-700'} text-lg rounded-lg w-fit h-fit text-center flex items-center justify-center space-x-1 px-1`}>
                    <Link href="#" className="side-by-side-container flex items-center justify-center">
                      <Image
                        className="flex justify-center items-center pr-1"
                        aria-hidden
                        src={platformData.logo}
                        alt={platformName}
                        width={24}
                        height={24}
                        style={platformData.filter ? { filter: 'brightness(0) invert(1)' } : {}}
                      />
                      {platformName.split(' ')[0]}
                      <Image
                        className="flex justify-center items-center pr-1"
                        aria-hidden
                        src="https://www.svgrepo.com/show/510970/external-link.svg"
                        alt="External link"
                        width={24}
                        height={24}
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="p-3 rounded-lg" style={{ backgroundColor: '#19191fff' }}>
            <div className="rounded-lg mb-2" style={{ backgroundColor: '#19191fff' }}>
              <input
                type="text"
                placeholder="Leave a comment"
                className="pl-3 text-start w-full p-1 mb-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <button className="bg-gray-700 w-fit px-2 rounded-lg">
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
