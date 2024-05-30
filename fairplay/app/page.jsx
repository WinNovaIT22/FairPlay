import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
} from "@nextui-org/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import Logout from "@/components/ui/logout";
import Temperature from "@/components/ui/temperature";
import ProgressBar from "@/components/ui/progessbar";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === "ylläpitäjä";
  const isSupervisor = session?.user.role === "valvoja";

  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour >= 6 && currentHour < 10) {
    greeting = "🌝 Hyvää huomenta";
  } else if (currentHour >= 10 && currentHour < 17) {
    greeting = "🌞 Hyvää päivää";
  } else if (currentHour >= 17 && currentHour < 23) {
    greeting = "🌚 Hyvää iltaa";
  } else {
    greeting = "🌚 Hyvää yötä";
  }

  return (
    <>
      <div
        className="flex flex-col h-screen"
        style={{
          backgroundImage: "url(/backgrounds/userbg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative shadow-lg backdrop-blur-2xl p-4 rounded-lg flex items-center justify-center">
          <div className="absolute left-2 hidden md:block">
            <Image alt="Logo" width={120} src="/konepyoraklubi.png" />
          </div>
          <div className="text-center text-2xl font-black">
            {greeting}, {session?.user.firstname} {session?.user.lastname}
          </div>
          <div className="absolute right-2 font-black text-lg mr-3">
            <Temperature />
          </div>
        </div>
        <div className="flex justify-center items-center mt-2">
          {isAdmin && (
            <Link href="/yllapitaja/">
              <Card shadow="sm" isPressable className="hover:scale-95 mt-1">
                <CardBody className="h-[40px] w-[350px] md:h-[40px] md:w-[400px] overflow-visible p-3 bg-gradient-to-l from-green-900 to-stone-900 flex flex-row font-semibold justify-center items-center">
                  Olet
                  <Chip
                    className="mx-1"
                    color="success"
                    size="md"
                    variant="flat"
                  >
                    Ylläpitäjä
                  </Chip>
                  , siirry hallintasivulle
                  <FaLongArrowAltRight className="ml-5" size={25} />
                </CardBody>
              </Card>
            </Link>
          )}
          {isSupervisor && (
            <Link href="/valvoja/">
              <Card shadow="sm" isPressable className="hover:scale-95 mt-1">
                <CardBody className="overflow-visible p-3 bg-gradient-to-l from-blue-900 to-stone-900 flex flex-row font-semibold justify-center items-center">
                  Olet
                  <Chip
                    className="mx-1"
                    color="primary"
                    size="md"
                    variant="flat"
                  >
                    Valvoja
                  </Chip>
                  , siirry valvontasivulle
                  <FaLongArrowAltRight className="ml-5" size={25} />
                </CardBody>
              </Card>
            </Link>
          )}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/suoritukset">
            <Card shadow="sm" isPressable className="hover:scale-95">
              <CardBody className="h-[200px] w-[350px] md:h-[200px] md:w-[500px] overflow-visible p-0 bg-gradient-to-b from-green-700 to-neutral-900 flex items-center justify-center">
                <Image alt="Tasks" width={120} src="/task.png" />
                <ProgressBar />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Suorituksesi</b>
              </CardFooter>
            </Card>
          </Link>
        </div>
        <div className="flex flex-row gap-2 md:gap-4 justify-center mt-10">
          <Link href="/ajoneuvot">
            <Card shadow="sm" isPressable className="hover:scale-95">
              <CardBody className="h-[120px] w-[120px] md:w-[180px] overflow-visible p-0 bg-gradient-to-b from-red-900 to-neutral-900 flex items-center justify-center">
                <Image alt="Vehicles" width={100} src="/moottoripyörä.png" />
              </CardBody>
              <CardFooter className="text-sm md:text-lg">
                <b className="mx-auto font-bold">Ajoneuvosi</b>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/kayttaja">
            <Card shadow="sm" isPressable className="hover:scale-95">
              <CardBody className="h-[120px] w-[120px] md:w-[180px] overflow-visible p-0 bg-gradient-to-b from-red-900 to-neutral-900 flex items-center justify-center">
                <Image alt="Users" width={80} src="/user.png" />
              </CardBody>
              <CardFooter className="text-sm md:text-lg">
                <b className="mx-auto">Käyttäjätietosi</b>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/ohjeet">
            <Card shadow="sm" isPressable className="hover:scale-95">
              <CardBody className="h-[120px] w-[120px] md:w-[180px] overflow-visible p-0 bg-gradient-to-b from-red-900 to-neutral-900 flex items-center justify-center">
                <Image alt="Help" width={60} src="/kysymys.png" />
              </CardBody>
              <CardFooter className="text-sm md:text-lg">
                <b className="mx-auto">Käyttöohjeet</b>
              </CardFooter>
            </Card>
          </Link>
        </div>
        <div className="flex justify-center mt-10">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default Home;
