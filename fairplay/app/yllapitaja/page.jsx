import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import Link from "next/link";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div
        className="flex flex-col h-screen"
        style={{
          backgroundImage: "url(/backgrounds/adminbg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="shadow-lg backdrop-blur-2xl text-xl p-4 font-black rounded-lg flex justify-center">
          Hallintasivu - {session?.user.firstname}
          <Chip className="ml-2" color="success" size="md" variant="flat">
            Ylläpitäjä
          </Chip>
        </div>
        <div className="flex flex-row justify-center mt-6">
          <Link href="/yllapitaja/kayttajat">
            <Card shadow="sm" isPressable className="hover:scale-95">
              <CardBody className="h-[140px] w-[240px] overflow-visible p-0 bg-gradient-to-b from-blue-400 to-stone-900 flex items-center justify-center">
                <Image alt="Users" width={200} src="/users.png" />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Käyttäjälista</b>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/yllapitaja/suoritukset">
            <Card shadow="sm" isPressable className="ml-5 hover:scale-95">
              <CardBody className="h-[140px] w-[240px] overflow-visible p-0 bg-gradient-to-b from-yellow-400 to-stone-900 flex items-center justify-center">
                <Image alt="Tasks" width={140} src="/task.png" />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Hallitse suorituksia</b>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/yllapitaja/estetyt">
            <Card shadow="sm" isPressable className="ml-5 hover:scale-95">
              <CardBody className="h-[140px] w-[240px] overflow-visible p-0 bg-gradient-to-b from-red-400 to-stone-900 flex items-center justify-center">
                <Image alt="Blocked Users" width={200} src="/bannedusers.png" />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Estetyt käyttäjät</b>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/yllapitaja/vuosikoosteet">
            <Card shadow="sm" isPressable className="ml-5 hover:scale-95">
              <CardBody className="h-[140px] w-[240px] overflow-visible p-0 bg-gradient-to-b from-green-400 to-stone-900 flex items-center justify-center">
                <Image alt="Year Replays" width={200} src="/users.png" />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Vuosikoosteet</b>
              </CardFooter>
            </Card>
          </Link>
        </div>
        <div className="flex flex-row justify-center mt-6 text-lg font-bold">
          Aseta FairPlay kisan aloitus ja lopetus
        </div>
      </div>
    </>
  );
};

export default Home;
