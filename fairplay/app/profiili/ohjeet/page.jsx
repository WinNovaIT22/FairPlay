import { MdLiveHelp } from "react-icons/md";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen mt-4">
      <div className="bg-white w-3/6 p-5 content-center shadow-md relative rounded-md">
      
        <div className="py-3 px-1">
          <svg
            className="w-10 h-9"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
        <MdLiveHelp className="text-black"/>
          </svg>
        </div>
        <p className="text-lg font-bold text-black font-sans">Ohjeet fairplay kilpailuun</p>
        <div className="text-sm py-2 text-black font-mono">
          Ohjeita Fairplay
        </div>
        <div className="text-center mt-4">
          <a href="https://www.konepyoraklubi.fi/wp-content/uploads/2023/04/Konepyoraklubi-FairPlay-pistejako-ja-perusteet_2023.pdf" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Ohjeet
          </a>
        </div>
      </div>
    </div>
  );
}
