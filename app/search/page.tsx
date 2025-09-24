import Image from "next/image";

export default function Search() {
  return (
  
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start p-8">
        <div className="fixed top-0 left-0 h-full w-50 z-30 bg-black pr-5 drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
          
          <div className="z-20 fixed top-25 left-5 font-semibold">
            <h1 className="text-2xl">Platform</h1>
            <ol>
              <li>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold accent-color-red-400">
                    PC
                </label>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    Android
                </label>
              </li>
              <li>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    XBOX
                </label>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    iOS
                </label>
              </li>
              <li>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    PS4
                </label>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    PS5
                </label>
              </li>
              <li>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    MacOS
                </label>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    Linux
                </label>
              </li>
              <li>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    Switch
                </label>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    item
                </label>
              </li>
              <li>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    Switch 2
                </label>
                <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
                  <label htmlFor="remember" className="p-2 text-md font-semibold">
                    item
                </label>
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
         
        <div className="ml-50">
          <div className="pb-10 pt-5">
            <h1>Showing X results</h1>
          </div>
          <ol className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <li className="mb-3 p-5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg borderwidth-5" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#ffffffff' }}>
              <Image 
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={200}
                height={200}
              />
              <div className="pb-9 mt-5 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-semibold">Game name</h2>
                <h1 className="text-lg text-muted-foreground">
                  $39.99
                </h1>
              </div>
            </li>
          </ol>
        </div>
      </main>





  );
}