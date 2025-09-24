import Link from "next/link"

export default function Signup() {
  return (

    <div className="shadow-lg shadow-purple-500 mb-3 p-5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg borderwidth-5 justify-content-center ml-125 mr-125 mt-30" style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: '#ffffffff' }}>
      <p className="drop-shadow-[0_0_10px_rgba(0,0,0,1)] justify-center text-2xl font-semibold mb-5 text-center">
        Welcome!
      </p>

      <ol>
        <li>
          <input
            type="text"
            placeholder="Username"
            className=" shadow-lg shadow-purple-500 w-full bg-muted border border-border rounded-lg px-40 py-2 pl-10 mb-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 mr-20 focus:border-3 focus:transition-all duration-400 ease-in-out"
          />
        </li>
        <li>
          <input
            type="text"
            placeholder="Email"
            className="shadow-lg shadow-purple-500 w-full bg-muted border border-border rounded-lg px-40 py-2 pl-10 mb-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 mr-20 focus:border-3 focus:transition-all duration-400 ease-in-out"
          />
        </li>
        <li>
          <input
            type="password"
            placeholder="Password"
            className="shadow-lg shadow-purple-500 w-full bg-muted border border-border rounded-lg px-40 py-2 pl-10 mb-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 mr-20 focus:border-3 focus:transition-all duration-400 ease-in-out"
          />
        </li>
        <li>
          <input
            type="password"
            placeholder="Confirm Password"
            className="shadow-lg shadow-purple-500 w-full bg-muted border border-border rounded-lg px-40 py-2 pl-10 mb-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 mr-20 focus:border-3 focus:transition-all duration-400 ease-in-out"
          />
        </li>
      </ol>

      <button className="shadow-lg mt-5 shadow-purple-500 w-full bg-black transition-all duration-500 ease-in-out hover:bg-purple-800 shadow-lg shadow-purple-200 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
        Sign Up
      </button>
      <p className="justify-center text-md font-semibold mt-4 text-center">
        <Link href="/login" className="justify-center text-sm font-lightbold text-center">
          Already have an account? Log in here!
        </Link>
      </p>
    </div>





  );
}