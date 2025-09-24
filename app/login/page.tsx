import Link from "next/link"

export default function Login() {
  return (
  
  <div className="drop-shadow-[0_0_10px_rgba(0,0,0,1)] shadow-lg shadow-purple-500 mb-3 p-5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg borderwidth-5 justify-content-center ml-125 mr-125 mt-40" style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: '#ffffffff' }}>
    <p className="justify-center text-2xl font-semibold mb-5 text-center drop-shadow-[0_0_14px_rgba(0,0,0,1)]">
      Welcome Back! Please login.
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
          type="password"
          placeholder="Password"
          className="shadow-lg shadow-purple-500 w-full bg-muted border border-border rounded-lg px-40 py-2 pl-10 mb-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 mr-20 focus:border-3 focus:transition-all duration-400 ease-in-out"
        />
      </li>
    </ol>
    <ol className="side-by-side flex justify-between mb-3 px-10">
      <li>
        <p className="justify-center text-md font-semibold mb-1 text-center">
          Forgot Password?
        </p>
      </li>
      <li>
        <input type="checkbox" id="remember" className="justify-center text-md font-semibold mb-1 text-center" />
        <label htmlFor="remember" className="text-md font-semibold">
          Remember Me
        </label>
      </li>
    </ol>
    <button className="shadow-lg shadow-purple-500 w-full bg-black transition-all duration-500 ease-in-out hover:bg-purple-800 shadow-lg shadow-purple-200 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
      Log in
    </button>
    <p className="justify-center text-md font-semibold mb-1 text-center">
      <Link href="/signup" className="justify-center text-sm font-lightbold mt-2 text-center">
        Not registered yet? Sign up here!
      </Link>
    </p>
  </div>





  );
}