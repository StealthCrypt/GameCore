import Image from "next/image";
import Link from "next/link"
export default function Search() {
  return (

    <main className="grid grid-cols-1 md:grid-cols-[250px_1fr] h-screen w-screen overflow-hidden text-white font-sans">
      <div className="bg-black pr-5 drop-shadow-[0_0_5px_rgba(255,255,255,1)] overflow-y-auto">
        <div className="z-20 fixed top-5 left-5 font-semibold">
          <h1 className="text-2xl">Platform</h1>
          <ol>
            <li className="mb-1 text-white bg-gray-800 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                  />
                  Epic Games
                  <input type="checkbox" id="remember" className="justify-center text-md font-semibold text-center ml-1" />
              </li>

              <li className="mb-1 text-white bg-gradient-to-r from-gray-800 to-blue-700 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                  />
                  Steam
                  <input type="checkbox" id="remember" className="justify-center text-md font-semibold text-center ml-1" />
              </li>

              <li className="mb-1 text-white bg-gray-600 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Electronic-Arts-Logo.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  EA
                  <input type="checkbox" id="remember" className="justify-center text-md font-semibold text-center ml-1" />
              </li>

              <li className="mb-1 bg-red-500 text-white text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://static.wikia.nocookie.net/logopedia/images/6/65/Riot_Games_2022_(Symbol).svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Riot Games
                  <input type="checkbox" id="remember" className="justify-center text-md font-semibold text-center ml-1" />
              </li>

              <li className="mb-1 text-white bg-blue-500 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://companieslogo.com/img/orig/UBI.PA-84c96b09.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Ubisoft
                  <input type="checkbox" id="remember" className="justify-center text-md font-semibold text-center ml-1" />
              </li>

              <li className="mb-1 text-white bg-gradient-to-r from-blue-800 to-blue-600 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Microsoft_Store.svg"
                    color="white"
                    alt="File icon"
                    width={22}
                    height={22}
                  />
                  Microsoft Store
                  <input type="checkbox" id="remember" className="justify-center text-md font-semibold text-center ml-1" />
              </li>

              <li className="mb-1 text-white bg-orange-400 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Rockstar_Games.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Rockstar Games
                  <input type="checkbox" id="remember" className="justify-center text-md font-semibold text-center ml-1" />
              </li>
          </ol>

          <h1 className="text-2xl mb-2 mt-5">Price</h1>
          <div className="flex mr-5">

            <ol className="items-center flex">
              <li>
                <input
                  type="text"
                  placeholder="min"
                  className="text-center w-full p-1 mb-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </li>
              <li>
                <p className="ml-2 mr-2">to</p>
              </li>
              <li>
                <input
                  type="text"
                  placeholder="max"
                  className="text-center w-full p-1 mb-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </li>
            </ol>
          </div>
          <div>
            <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
            <label htmlFor="remember" className="p-2 text-md font-semibold">
              Free games only
            </label>
          </div>
          <h1 className="text-2xl mb-2 mt-5">Sort by</h1>
        </div>
      </div>

      <div className="flex-grow w-full h-full p-5 overflow-x-hidden">
        <div className="bg-black rounded-lg max-w-7xl mx-auto">
          <h1 className="text-center text-xl font-semibold pt-3">found x results</h1>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-2 ml-2 mr-2">
            {[...Array(7)].map((_, index) => (
              <Link href="/game">
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