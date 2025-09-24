import Image from "next/image";

export default function Profile() {
  return (
  <main>
    <div className="flex items-center gap-x-4 bg-gradient-to-r from-purple-600 to-purple-400 drop-shadow-[0_0_30px_rgba(0,0,0,1)] mb-3 p-5 bg-black rounded-lg borderwidth-5 justify-content-center w mt-20 ml-20 mr-20 mb-20 pb-auto">
      <ol>
        <li>
          <svg className="h-50 w-50 drop-shadow-[0_0_10px_rgba(200,200,200,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle r="10" cx="12" cy="12" fill="black" />
            <path opacity="0.4" d="M12 22.01C17.5228 22.01 22 17.5329 22 12.01C22 6.48716 17.5228 2.01001 12 2.01001C6.47715 2.01001 2 6.48716 2 12.01C2 17.5329 6.47715 22.01 12 22.01Z" fill="#e9f3ffff"/>
            <path d="M12 6.93994C9.93 6.93994 8.25 8.61994 8.25 10.6899C8.25 12.7199 9.84 14.3699 11.95 14.4299C11.98 14.4299 12.02 14.4299 12.04 14.4299C12.06 14.4299 12.09 14.4299 12.11 14.4299C12.12 14.4299 12.13 14.4299 12.13 14.4299C14.15 14.3599 15.74 12.7199 15.75 10.6899C15.75 8.61994 14.07 6.93994 12 6.93994Z" fill="#292D32"/>
            <path d="M18.7807 19.36C17.0007 21 14.6207 22.01 12.0007 22.01C9.3807 22.01 7.0007 21 5.2207 19.36C5.4607 18.45 6.1107 17.62 7.0607 16.98C9.7907 15.16 14.2307 15.16 16.9407 16.98C17.9007 17.62 18.5407 18.45 18.7807 19.36Z" fill="#292D32"/>
          </svg>
        </li>
      </ol>
      
      <h1 className="text-5xl font-bold -mt-20 drop-shadow-[0_0_30px_rgba(0,0,0,1)]">Username</h1>
    </div>
    <div className="flex items-center gap-x-4 bg-gray-400 drop-shadow-[0_0_30px_rgba(0,0,0,1)] mb-3 p-5 bg-black rounded-lg borderwidth-5 justify-content-center w mt-20 ml-20 mr-20 mb-20 pb-auto"></div>
    </main>
    





  );
}