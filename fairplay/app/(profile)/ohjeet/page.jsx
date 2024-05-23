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
        <div className="flex flex-grow items-center justify-center mt-4">
          <div className="flex justify-center space-x-4">
            <div className="bg-gradient-to-t from-red-900 to-neutral-900 w-1/4 p-5 content-center shadow-md relative rounded-md h-96 flex flex-col">
              <div className="text-center mt-4 flex-grow overflow-y-auto">
                <MdLiveHelp size={30} className="text-white mb-2" />
                <p className="text-xl font-bold text-white font-sans mb-4">
                  Ohjeet fairplay kilpailuun saat esille nappia painamalla
                </p>
                <a
                  href="https://www.konepyoraklubi.fi/wp-content/uploads/2023/04/Konepyoraklubi-FairPlay-pistejako-ja-perusteet_2023.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="custom-button">
                    Tutustu sääntöihin täältä
                  </button>
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-t from-red-900 to-neutral-900 w-1/4 p-5 content-center shadow-md relative rounded-md h-96 flex flex-col">
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
                  <button className="custom-button">Lisätietoa</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
