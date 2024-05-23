import { FaHome } from 'react-icons/fa';

export default function MoreInfo() {
  return (
    <div
      className="h-screen flex flex-col items-center relative"
      style={{
        backgroundImage: 'url(/backgrounds/infobg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <a href="/" className="navigation-card absolute top-4 left-4">
        <FaHome size={24} color="black" />
      </a>
      <h1 className="text-4xl mt-8 text-black">Ohjeet Nettisivun Käyttöön</h1>
      <div className="flex-grow flex items-center justify-center">
        <div className="flex">
          <div className="w-1/2 h-[600px] p-4 border border-gray-300 rounded-lg bg-white bg-opacity-80 overflow-auto text-black mr-4">
            <p>
              Tämä on esimerkki ohjetekstistä. Voit lisätä tähän ohjeita, joita käyttäjät voivat lukea mutta eivät muokata.
              <br /><br />
              Ohje 1: Muista täyttää kaikki kentät huolellisesti.
              <br /><br />
              Ohje 2: Tarkista tietosi ennen lähettämistä.
              <br /><br />
              Ohje 3: Jos sinulla on kysyttävää, ota yhteyttä asiakaspalveluun.
            </p>
          </div>
          <div className="w-1/2 h-[600px] p-4 border border-gray-300 rounded-lg bg-white bg-opacity-80 overflow-auto text-black">
            <p>
              Toinen kirjoituslaatikko.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
