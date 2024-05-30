import { MdLiveHelp } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function Info() {
  return (
    <>
      <div
        className="flex flex-col h-screen"
        style={{
          backgroundImage: "url(/backgrounds/infobg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="shadow-lg backdrop-blur-2xl text-black text-2xl p-4 font-black rounded-lg flex justify-center items-center relative">
          <div className="absolute left-2">
            <a href="/" className="navigation-card">
              <FaHome size={24} color="black" />
            </a>
          </div>
          <IoInformationCircleOutline size={33} className="mr-2" />
          Käyttöohjeet
        </div>
        <div className="flex flex-grow items-center justify-center mt-4 px-2 md:px-0">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 w-full">
            <div className="border-5 border-red-800 bg-gradient-to-t from-red-900 to-neutral-900 w-full md:w-1/4 p-5 content-center shadow-md relative rounded-md h-96 flex flex-col">
              <div className="text-center mt-4 flex-grow overflow-y-auto">
                <MdLiveHelp size={30} className="text-white mb-2" />
                <p className="text-xl font-bold text-white font-sans mb-4">
                  Ohjeet fairplay kilpailuun saat esille nappia painamalla
                </p>
                <p className="mb-4 text-white">
                  Tähän voit halutessasi kirjoittaa kuvauksen.
                </p>
                <a
                  href="https://www.konepyoraklubi.fi/wp-content/uploads/2024/04/Konepyoraklubi-Farplay-pistejako-ja-perusteet-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="custom-button px-2 py-1 text-sm md:text-base">
                    Tutustu sääntöihin täältä
                  </button>
                </a>
              </div>
            </div>
            <div className="border-5 border-red-800 bg-gradient-to-t from-red-900 to-neutral-900 w-full md:w-1/4 p-5 content-center shadow-md relative rounded-md h-96 flex flex-col">
              <div className="text-center mt-4 flex-grow overflow-y-auto">
                <MdLiveHelp size={30} className="text-white mb-2" />
                <p className="text-xl font-bold text-white font-sans mb-4">
                  Ohjeet nettisivun käyttöön
                </p>
                <p className="mb-4 text-white">
                  Tässä voit tarjota yleistä tietoa kilpailun luonteesta,
                  historiasta tai muusta kiinnostavasta.
                </p>
                <a href="/ohjeet/lisatieto" target="_blank" rel="noopener noreferrer">
                  <button className="custom-button px-2 py-1 text-sm md:text-base">Lisätietoa</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
