import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[minmax(0,13vw)_1fr] h-screen w-screen overflow-hidden">
      <div className="bg-black pr-5 drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
      </div>
      <div className="flex-grow w-full h-full p-5 overflow-y-auto">
        <div className="bg-black rounded-lg max-w-7xl mx-auto" style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#ffffffff'
        }}>
          
          <h1 className="text-center text-4xl font-semibold pt-3">New Releases</h1>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-2 ml-2 mr-2">

            {[...Array(3)].map((_, index) => (
              <Link href="/game/GAME_ID">
              <li
                key={index}
                className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg drop-shadow-[0_0_30px_rgba(0,0,0,1)]"

              >
                <Image
                  className="flex justify-center items-center mx-auto"
                  aria-hidden
                  src="/file.svg"
                  alt="File icon"
                  width={150}
                  height={150}
                />
                <div className="p-2 mx-auto mt-5 bg-gray-900 rounded-lg ">
                  <h2 className="text-2xl font-semibold drop-shadow-[0_0_4px_rgba(0,0,0,1)]">Game name</h2>
                  <h1 className="inline-block pr-1 pl-1 text-lg text-muted-foreground rounded-lg drop-shadow-[0_0_4px_rgba(0,0,0,1)] bg-gradient-to-r from-green-900 to-green-700">$39.99</h1>
                  
                </div>
              </li>
              </Link>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}