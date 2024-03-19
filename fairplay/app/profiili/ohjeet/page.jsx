import { MdLiveHelp } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Navigointinappi yläkulmaan */}
      <div className="navigation-card">
        <a href="http://localhost:3000/" className="tab">
          <svg
            className="svgIcon"
            viewBox="0 0 50 50"  // Pienennetty näkymälaajuus
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '40px', height: '40px' }}  // Lisätty tyylit pienentämiseksi
          >
            <path
              d="M48 20.25V48H30V34V32H28H20H18V32V48H2V20.25L26 2.375L48 20.25Z"
              stroke="grey"
              strokeWidth="5"  // Pienennetty viivan paksuutta
            ></path>
          </svg>
        </a>
      </div>

      {/* Sisältö keskitettynä */}
      <div className="flex flex-grow items-center justify-center mt-4">
        <div className="bg-white w-3/6 p-5 content-center shadow-md relative rounded-md">
          <div className="text-center mt-4">
            <MdLiveHelp size={30} className="text-black mb-2" />
            <p className="text-xl font-bold text-black font-sans mb-4">Ohjeet fairplay kilpailuun saat esille nappia painamalla</p>
            <a href="https://www.konepyoraklubi.fi/wp-content/uploads/2023/04/Konepyoraklubi-FairPlay-pistejako-ja-perusteet_2023.pdf" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Tutustu sääntöihin täältä
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
