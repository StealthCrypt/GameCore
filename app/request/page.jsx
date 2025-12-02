'use client'

import Image from "next/image";
import { useState } from "react";
import { requestsAPI } from "@/stuff/api";
import { PLATFORMS } from "@/stuff/constants";
import { useUser } from "@/hooks/useUser";

const CUSTOM_CHECKBOX = "justify-center text-md font-semibold text-center ml-2 appearance-none checked:bg-purple-500 checked:border-white border-2 unchecked:border-white w-4 h-4 rounded-sm bg-gray-800 transition-all duration-200 ease-in-out";
const INPUT_STYLE = "w-full bg-muted border border-border rounded-lg py-2 pl-2 mb-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-3 focus:transition-all duration-400 ease-in-out";

export default function Request() {
    const [gameName, setGameName] = useState('')
    const [externalLink, setExternalLink] = useState('')
    const [selectedPlatforms, setSelectedPlatforms] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    // useUser hook handles all user fetching logic in one place
    const { user, loading: fetchingUser } = useUser()

    function handlePlatformToggle(platformName) {
        setSelectedPlatforms(prev =>
            prev.includes(platformName)
                ? prev.filter(p => p !== platformName)
                : [...prev, platformName]
        )
    }

    async function handleSubmit() {
        if (!user) {
            setMessage('Please login to submit a request')
            return
        }

        if (!gameName.trim()) {
            setMessage('Please enter a game name')
            return
        }

        setLoading(true)
        setMessage('')

        try {
            const description = `
External Link: ${externalLink || 'Not provided'}
Platforms: ${selectedPlatforms.length > 0 ? selectedPlatforms.join(', ') : 'Not specified'}
            `.trim()

            await requestsAPI.create({
                gameName: gameName.trim(),
                description
            })

            setMessage('Request submitted successfully! The admin will review it.')
            setGameName('')
            setExternalLink('')
            setSelectedPlatforms([])
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Failed to submit request')
        } finally {
            setLoading(false)
        }
    }

    if (fetchingUser) {
        return (
            <main className="overflow-hidden flex justify-center items-center bg-black text-white p-5" style={{ backgroundColor: '#101014ff' }}>
                <p className="text-xl">Loading...</p>
            </main>
        )
    }
    
    return (
        <main className="overflow-hidden flex justify-center items-center bg-black text-white p-5" style={{ backgroundColor: '#101014ff' }}>
            <div className=" p-1 w-4/5 h-4/5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg max-h-[1200px] flex flex-col">
                <div className="bg-black rounded-lg p-6 flex-grow overflow-y-auto" style={{
                    backgroundColor: '#101014ff'
                }}>
                    <h1 className="text-3xl font-bold flex justify-center items-center pb-3">New Game Request</h1>
                    
                    {!user && (
                        <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 p-3 rounded-lg mb-4">
                            You must be logged in to submit a request. <a href="/login" className="underline">Login here</a>
                        </div>
                    )}

                    {message && (
                        <div className={`${message.includes('success') ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-red-500/20 border-red-500 text-red-300'} border p-3 rounded-lg mb-4`}>
                            {message}
                        </div>
                    )}

                    <ol>
                        <h1 className="pb-3 text-xl">Game Name *</h1>
                        <li>
                            <input
                                type="text"
                                placeholder="Enter game title"
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                                className={INPUT_STYLE}
                                disabled={!user || loading}
                            />
                        </li>
                        <h1 className="pb-3 text-xl">Add one external link (optional)</h1>
                        <li>
                            <input
                                type="text"
                                placeholder="e.g. https://www.epicgames.com/store/en-US/p/fortnite"
                                value={externalLink}
                                onChange={(e) => setExternalLink(e.target.value)}
                                className={INPUT_STYLE}
                                disabled={!user || loading}
                            />
                        </li>
                    </ol>

                    <div className="rounded-lg pl-3 pb-3" style={{ backgroundColor: '#19191fff' }}>
                        <h1 className="p-2 text-xl font-semibold">Available on:</h1>
                        <ol className="side-by-side-container list-inside flex flex-wrap gap-2 rounded-lg">
                            {PLATFORMS.map((platform) => (
                                <li
                                    key={platform.name}
                                    className={`text-white text-lg rounded-lg w-fit h-fit text-center flex items-center justify-center space-x-1 px-2 py-1 cursor-pointer transition-all ${
                                        selectedPlatforms.includes(platform.name) ? 'ring-2 ring-white' : ''
                                    } ${!user || loading ? 'opacity-50 cursor-not-allowed' : 'hover:ring-2 hover:ring-gray-400'}`}
                                    style={{ backgroundColor: platform.color }}
                                >
                                    <Image
                                        className="flex justify-center items-center pr-1"
                                        aria-hidden
                                        src={platform.logo}
                                        alt={platform.name}
                                        width={24}
                                        height={24}
                                        style={platform.filter ? { filter: 'brightness(0) invert(1)' } : {}}
                                    />
                                    {platform.name}
                                    <input
                                        type="checkbox"
                                        checked={selectedPlatforms.includes(platform.name)}
                                        onChange={() => handlePlatformToggle(platform.name)}
                                        className={CUSTOM_CHECKBOX}
                                        disabled={!user || loading}
                                    />
                                </li>
                            ))}
                        </ol>
                    </div>
                    <p className="mt-3">Once the request is submitted, the admin will either accept or deny the request.</p>
                    <div className="flex justify-center items-center">
                        <button
                            onClick={handleSubmit}
                            disabled={!user || loading || !gameName.trim()}
                            className="font-bold text-lg bg-gradient-to-r from-purple-600 to-purple-400 p-3 rounded-lg mt-6 hover:border-2 hover:border-white transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting...' : 'Submit Game Request'}
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}
