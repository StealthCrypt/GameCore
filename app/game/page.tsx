import Image from "next/image";
import Link from "next/link"

export default function Game() {
  return (
    <main className="overflow-hidden flex justify-center items-center bg-black text-white p-5">
      <div className="drop-shadow-[0_0_80px_rgba(161,65,248,1)] pb-7 p-5 w-4/5 h-4/5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg max-h-[1200px] flex flex-col">
        <div>
          <h2 className="text-5xl font-semibold pb-5 drop-shadow-[0_0_50px_rgba(255,255,255,1)] text-black">Game Name</h2>
        </div>
        <div className="side-by-side-container flex space-x-5 items-start flex-grow">
          {/* Image box - Left side */}
          <div className="bg-gray-900 rounded-lg drop-shadow-[0_0_4px_rgba(0,0,0,1)] w-fit">
            <Image
              className="flex justify-center items-center mx-auto"
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={450}
              height={450}
            />
          </div>


          {/* AVAILABILITY - Right side */}
          <div className="bg-gray-900 rounded-lg p-4 flex-1 drop-shadow-[0_0_4px_rgba(0,0,0,1)]" style={{
            maxHeight: '450px',
            overflowY: 'auto'
          }}>
            <h1 className="text-2xl font-semibold p-2">Availability by Platform</h1>
            <ol className="side-by-side-container list-inside flex flex-wrap gap-2 bg-gray-900 rounded-lg p-3 drop-shadow-[0_0_4px_rgba(0,0,0,1)]">
              <li className="text-white bg-gray-800 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
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
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://www.svgrepo.com/show/510970/external-link.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Link>
              </li>

              <li className="text-white bg-gradient-to-r from-gray-800 to-blue-700 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
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
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://www.svgrepo.com/show/510970/external-link.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Link>
              </li>

              <li className="text-white bg-gray-600 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
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
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://www.svgrepo.com/show/510970/external-link.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Link>
              </li>

              <li className=" bg-red-500 text-white text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
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
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://www.svgrepo.com/show/510970/external-link.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Link>
              </li>

              <li className="text-white bg-blue-500 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
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
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://www.svgrepo.com/show/510970/external-link.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Link>
              </li>

              <li className="text-white bg-gradient-to-r from-blue-800 to-blue-600 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
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
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://www.svgrepo.com/show/510970/external-link.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Link>
              </li>

              <li className="text-white bg-orange-400 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
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
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://www.svgrepo.com/show/510970/external-link.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </Link>
              </li>
            </ol>

            <h1 className="text-2xl font-semibold text-center p-5">About the game</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
          </div>
        </div>




        {/* Bottom section */}
        <div className="flex-grow flex flex-col h-[450px] space-y-4 bg-gray-900 p-5 mt-5 rounded-lg">
          <ol className="side-by-side-container list-inside flex flex-wrap gap-3 drop-shadow-[0_0_4px_rgba(0,0,0,1)] p-5">
              <h1 className="text-lg">Tags</h1>
              <li className="text-white bg-gradient-to-r from-purple-600 to-purple-400 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-3">
                FPS
              </li>
              <li className="text-white bg-gradient-to-r from-purple-600 to-purple-400 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                Multiplayer
              </li>
          </ol>

          <div className="mt-15 p-5 bg-gray-800 rounded-lg h-full overflow-y-auto">
            Comment
          </div>
        </div>


      </div>
    </main>
  );
}