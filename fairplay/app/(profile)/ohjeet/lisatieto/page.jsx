import { FaHome } from 'react-icons/fa';
import { GrHelpBook } from "react-icons/gr";

export default function MoreInfo() {
  return (
    <div
      className="flex flex-col h-screen"
      style={{
        backgroundImage: 'url(/backgrounds/infobg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="shadow-lg backdrop-blur-2xl text-2xl p-4 text-white font-black rounded-lg flex justify-center items-center">
          <div className="absolute left-2">
            <a href="/" className="navigation-card">
              <FaHome size={24} color="black" />
            </a>
          </div>
          <GrHelpBook size={35} className="mr-2"/>
          Nettisivun Käyttöohjeet
        </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="flex justify-center">
          <div className="border-8 border-red-950 w-1/2 h-[600px] p-4 border border-gray-300 backdrop-blur-2xl rounded-lg  bg-opacity-80 overflow-auto text-white mr-4">
            <p>
              
              Tehtävät/Suoritukset Sivu. Tehtävät sekä suorituksesi löydät alkuvalikon suoritukset näppäintä painamalla. Siellä voit kirjata ylös kaikki tehtävät jotka olet saanut valmiiksi ja kuinka paljon sinulla on vielä suoritettavana.
              <br /><br />
              Ajoneuvot Sivu.
              Ajoneuvo sivulle pääset etusivulta painamalla ajoneuvosi näppäintä, sieltä voit helposti sekä nopeasti lisätä oman ajoneuvosi se löytää melkein jokaisen tieliikenne kelpoisen ajoneuvon yli 14000 valikoima. jos sinulla vaihtuu ajoneuvo kesken kauden sen saa helposti lisättyä vanhan tilalle. Sivu myös näkee että onko ajoneuvosi katsastettu vai ei.
              <br /><br />
              Käyttäjätideot Sivu. Käyttäjätiedot sivulla voit tarkastella omia tietoja joilla olet sivulle kirjautunut, sieltä voit myös vaihtaa salasanan jos se on tarpellista. Pystyt myös luomaan täysin uuden profiilin itsellesi helposti painamalla poista itsesi nappia, ja kun tiedot on poistettu niin voit luoda heti uuden tilin itsellesi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
