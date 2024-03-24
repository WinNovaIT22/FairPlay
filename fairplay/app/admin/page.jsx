import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import Link from "next/link";
import Users from "@/public/users.png";
import BannedUsers from "@/public/bannedusers.png";
import Tasks from "@/public/task.svg";
import AdminCover from "@/public/admincover.png";
import Image from "next/image";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex justify-center p-4 text-xl font-black bg-zinc-700 relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${AdminCover.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            opacity: "20%",
            backgroundSize: "8%",
          }}
        ></div>
        {session?.user.firstname}
        <Chip className="ml-2" color="success" size="md" variant="flat">
          Ylläpitäjä
        </Chip>
      </div>
      <div className="flex flex-row justify-center mt-6">
        <Link href="/admin/kayttajat">
          <Card shadow="sm" isPressable className="hover:scale-95">
            <CardBody className="overflow-visible p-0 bg-blue-100">
              <Image alt="Users" className="h-[140px] w-[240px]" src={Users} />
            </CardBody>
            <CardFooter className="text-lg">
              <b className="mx-auto">Käyttäjälista</b>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/admin/suoritukset">
          <Card shadow="sm" isPressable className="ml-5 hover:scale-95">
            <CardBody className="overflow-visible p-0 bg-yellow-100">
              <Image alt="Users" className=" h-[140px] w-[240px]" src={Tasks} />
            </CardBody>
            <CardFooter className="text-lg">
              <b className="mx-auto">Suoritukset</b>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/admin/estetyt">
          <Card shadow="sm" isPressable className="ml-5 hover:scale-95">
            <CardBody className="overflow-visible p-0 bg-red-100">
              <Image
                alt="Users"
                className="h-[140px] w-[240px]"
                src={BannedUsers}
              />
            </CardBody>
            <CardFooter className="text-lg">
              <b className="mx-auto">Estetyt käyttäjät</b>
            </CardFooter>
          </Card>
        </Link>
      </div>
      <div className="flex flex-row justify-center mt-6">
        Fairplay kisan aloitus ja lopetus
      </div>
    </>
  );
};

export default Home;
