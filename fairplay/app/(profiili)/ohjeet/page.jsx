import { MdLiveHelp } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import "@/styles/globals.css";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Navigation button in the top-left corner */}
      <div className="absolute top-0 left-0 m-4">
        <a href="http://localhost:3000/" className="navigation-card">
          <FaHome size={24} color="black" /> {/* Lisää FaHome-kuvake */}
        </a>
      </div>
      
      {/* Otsikko */}
      <div className="flex-grow-0 pt-20">
        <h1 className="text-5xl font-bold text-center">🏍Fairplay kilpailu ohjeet🏍</h1>
      </div>

      {/* Main content centered */}
      <div className="flex flex-grow items-center justify-center mt-4">
        <div className="flex justify-center space-x-4"> {/* Säädä tätä osiota vierekkäisten laatikoiden sijoitteluun */}
          {/* Ensimmäinen laatikko */}
          <div className="bg-white w-1/4 p-5 content-center shadow-md relative rounded-md">
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

          {/* Toinen laatikko (esimerkiksi yleistietoa kilpailusta) */}
          <div className="bg-white w-1/4 p-5 content-center shadow-md relative rounded-md">
            <div className="text-center mt-4">
              <MdLiveHelp size={30} className="text-black mb-2" />
              <p className="text-xl font-bold text-black font-sans mb-4">
                Yleistä tietoa kilpailusta
              </p>
              <p className="mb-4">
                Tässä voit tarjota yleistä tietoa kilpailun luonteesta, historiasta tai muusta kiinnostavasta.
              </p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="custom-button">Lisätietoa</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
