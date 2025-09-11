export default function Navbar() {
  return (
    <nav className="w-full h-10 bg-green-900 text-green flex items-center px-4">
      <div className="flex-1">
        <h1 className="text-lg font-bold">GameCore</h1>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Contact</a>
      </div>
    </nav>
  );
}