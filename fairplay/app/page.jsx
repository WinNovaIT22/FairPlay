import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Card, CardBody, CardFooter, Chip, Button } from "@nextui-org/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import MotorBike from "@/public/moottoripyörä.png";
import User from "@/public/user.png";
import question from "@/public/kysymyss.png"
import Tasks from "@/public/task.svg";
import Logout from "@/components/ui/logout";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === "ylläpitäjä";
  const isSupervisor = session?.user.role === "valvoja";

  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour >= 0 && currentHour < 12) {
    greeting = "Hyvää huomenta🌝";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Hyvää päivää🌞    ";
  } else {
    greeting = "Hyvää iltaa🌚    ";
  }

  return (
    <>
      <div className="background-image">
        <div className="bg-zinc-700 p-4 rounded-lg">
          <div className="text-center text-xl font-black">
            {greeting}, {session?.user.firstname} {session?.user.lastname}
          </div>
        </div>
        <div className="flex justify-center items-center w-6/6">
          {isAdmin && (
            <Link href="/yllapitaja/">
              <Card shadow="sm" isPressable className="hover:scale-95 mt-4">
                <CardBody className="overflow-visible p-4 bg-zinc-700 flex flex-row font-semibold justify-center items-center">
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
              <Card shadow="sm" isPressable className="hover:scale-95 mt-4">
                <CardBody className="overflow-visible p-4 bg-zinc-700 flex flex-row font-semibold justify-center items-center">
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
          <Link href="">
            <Card shadow="sm" isPressable className="hover:scale-95">
              <CardBody className="overflow-visible p-0 bg-gradient-to-b from-green-600 to-emerald-900">
                <Image
                  alt="Users"
                  className="h-[200px] w-[500px]"
                  src={Tasks}
                />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Suorituksesi</b>
              </CardFooter>
            </Card>
          </Link>
        </div>
        <div className="flex flex-row gap-8 justify-center mt-10">
          <Link href="/ajoneuvot">
            <Card shadow="sm" isPressable className="hover:scale-95">
              <CardBody className="overflow-visible p-0 bg-gradient-to-b from-stone-900 to-red-900">
                <Image
                  alt="Users"
                  className="h-[140px] w-[240px] object-cover"
                  src={MotorBike}
                />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Ajoneuvosi</b>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/kayttaja">
            <Card shadow="sm" isPressable className="hover:scale-95">
              <CardBody className="overflow-visible p-0 bg-gradient-to-b from-stone-900 to-red-900">
                <Image
                  alt="Users"
                  className="h-[140px] w-[240px] object-cover"
                  src={User}
                />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Käyttäjätietosi</b>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/ohjeet">
            <Card shadow="sm" isPressable className="hover:scale-95">
              <CardBody className="overflow-visible p-0 bg-gradient-to-b from-stone-900 to-red-900">
                <Image
                  alt="Users"
                  className="h-[140px] w-[240px]"
                  src={question}
                />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Ohjeita</b>
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
