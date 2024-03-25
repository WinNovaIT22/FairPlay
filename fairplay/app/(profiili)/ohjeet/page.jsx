import { MdLiveHelp } from "react-icons/md";
import "@/styles/globals.css";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Sisältö keskitettynä */}
      <div className="flex flex-grow items-center justify-center mt-4">
        <div className="bg-white w-3/6 p-5 content-center shadow-md relative rounded-md">
          <div className="text-center mt-4">
            <MdLiveHelp size={30} className="text-black mb-2" />
            <p className="text-xl font-bold text-black font-sans mb-4">
              Ohjeet fairplay kilpailuun saat esille nappia painamalla
            </p>
            <a
              href="https://www.konepyoraklubi.fi/wp-content/uploads/2023/04/Konepyoraklubi-FairPlay-pistejako-ja-perusteet_2023.pdf"
              target="_blank"
              rel="noopener noreferrer"
             
            >
              <button className="custom-button">Tutustu sääntöihin täältä</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}