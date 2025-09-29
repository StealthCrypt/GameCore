import Image from "next/image";
import Link from "next/link"

export default function Game() {
  return (
    <main className="overflow-hidden flex justify-center items-center bg-black text-white p-5">
      <div className="pb-7 p-5 w-4/5 h-4/5 bg-gray-900 rounded-lg max-h-[1200px] flex flex-col">
        <div className="side-by-side-container flex space-x-5 items-start flex-grow">
          {/* Image box - Left side */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg drop-shadow-[0_0_30px_rgba(0,0,0,1)] w-fit">
            <Image
              className="flex justify-center items-center mx-auto"
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={450}
              height={450}
            />
          </div>


          {/* AVAILABILITY - Right side 
            Should we include difference between windows 10 and 11? or just say windows? etc.
          */}
          <div className="bg-gray-900 rounded-lg p-4 flex-1 drop-shadow-[0_0_4px_rgba(0,0,0,1)]" style={{
            maxHeight: '450px',
            overflowY: 'auto'
          }}>
            <h1 className="text-2xl font-semibold p-2">Availability by system</h1>
            <ol className="side-by-side-container list-inside flex flex-wrap gap-2 bg-gray-900 rounded-lg p-3 drop-shadow-[0_0_4px_rgba(0,0,0,1)]">
              <li className="text-white bg-gradient-to-r from-blue-800 to-blue-600 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/Windows_logo_-_2002%E2%80%932012_%28Black%29.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Windows
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

              <li className="text-white bg-gradient-to-r from-orange-500 to-purple-700 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    color="white"
                    alt="File icon"
                    width={20}
                    height={20}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  MacOS
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

              <li className="text-white bg-yellow-600 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Linux_Logo_in_Linux_Libertine_Font.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Linux
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

              <li className="text-white bg-gradient-to-r from-blue-900 to-blue-700 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  PlayStation
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

              <li className="text-white bg-red-500 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Nintendo_Switch_Logo_%28without_text%29.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Switch
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

              <li className="text-white bg-gradient-to-r from-green-800 to-green-600 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Xbox_Logo.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  XBOX
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

              <li className="text-white bg-gradient-to-r from-orange-500 to-purple-700 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    color="white"
                    alt="File icon"
                    width={20}
                    height={20}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  iOS
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

              <li className="text-white bg-green-600 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg"
                    color="white"
                    alt="File icon"
                    width={20}
                    height={20}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Android
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
        <div className="flex-grow flex flex-col h-[450px] space-y-4">
          <div>
            <h2 className="text-4xl font-semibold pt-3 pb-3 drop-shadow-[0_0_4px_rgba(0,0,0,1)] text-white">CounterStrike : Global Offensive</h2>
            
          </div>
        



        {/* TABLE LINKS*/}

          <div className="bg-gray-900 rounded-lg p-4 flex-1 drop-shadow-[0_0_4px_rgba(0,0,0,1)]" style={{
            maxHeight: '150px',
            overflowY: 'auto',
            minHeight: '150px'
          }}>
            <table  className="w-full table-fixed border-separate border-spacing-y-3">
              <tr>
                <th>Platform</th>
                <th>Versions</th>
                <th>Source</th>
                <th>Price</th>
              </tr>
              
              <tr className="">
                <td className="text-center mx-auto text-white bg-gradient-to-r from-blue-800 to-blue-600 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/Windows_logo_-_2002%E2%80%932012_%28Black%29.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Windows
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
                </td>
                <td className="text-center mx-auto">
                  7,10,11
                </td>
                <td className="text-center mx-auto">
                  <h1>External</h1>
                </td>
                <td>
                  <h1 className="flex items-center justify-center text-center mx-auto text-lg font-semibold text-white rounded-lg drop-shadow-[0_0_4px_rgba(0,0,0,1)] bg-gradient-to-r from-green-900 to-green-700">$39.99</h1>
                </td>
              </tr>
              <tr className="">
                <td className="text-center mx-auto text-white bg-gradient-to-r from-blue-800 to-blue-600 text-black text-lg rounded-lg w-fit text-center drop-shadow-[0_0_4px_rgba(0,0,0,1)] flex items-center justify-center space-x-1 px-1">
                <Link href="https://www.google.com/" target="_blank" className="side-by-side-container flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center pr-1"
                    aria-hidden
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/Windows_logo_-_2002%E2%80%932012_%28Black%29.svg"
                    color="white"
                    alt="File icon"
                    width={24}
                    height={24}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Windows
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
                </td>
                <td className="text-center mx-auto">
                  7,10,11
                </td>
                <td className="text-center mx-auto">
                  <h1>External</h1>
                </td>
                <td>
                  <h1 className="flex items-center justify-center text-center mx-auto text-lg font-semibold text-white rounded-lg drop-shadow-[0_0_4px_rgba(0,0,0,1)] bg-gradient-to-r from-green-900 to-green-700">$39.99</h1>
                </td>
              </tr>
            </table>
          </div>

          
          <div className="mt-15 p-5 bg-gray-800 rounded-lg h-full overflow-y-auto">
            Comment
          </div>
        </div>

        
      </div>
    </main>
  );
}