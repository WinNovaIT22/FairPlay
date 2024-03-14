import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import Link from 'next/link'; 

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="flex justify-center bg-zinc-700 p-4 text-lg">
        {session?.user.firstname}<Chip className="ml-2" color="success" size="md" variant="flat">Admin</Chip>
      </div>
      <div className="flex flex-row justify-center mt-6">
        <Link href="/admin/kayttajat"> 
          <Card shadow="sm" isPressable className="hover:scale-95">
            <CardBody className="overflow-visible p-0">
              <iframe
                style={{ pointerEvents: "none", overflow: "hidden" }}
                src="/admin/kayttajat"
                className="shadow-md opacity-65"
                scrolling="no"
              />
            </CardBody>
            <CardFooter className="text-lg">
              <b className="mx-auto">Käyttäjät</b>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/admin/suoritukset"> 
          <Card shadow="sm" isPressable className="ml-5 hover:scale-95">
            <CardBody className="overflow-visible p-0">
              <iframe
                style={{ pointerEvents: "none", overflow: "hidden" }}
                src="/admin/suoritukset"
                className="shadow-md opacity-65"
                scrolling="no"
              />
            </CardBody>
            <CardFooter className="text-lg">
              <b className="mx-auto">Suoritukset</b>
            </CardFooter>
          </Card>
        </Link>
        <Link href="/admin/estetyt"> 
          <Card shadow="sm" isPressable className="ml-5 hover:scale-95">
            <CardBody className="overflow-visible p-0">
              <iframe
                style={{ pointerEvents: "none", overflow: "hidden" }}
                src="/admin/estetyt"
                className="shadow-md opacity-65"
                scrolling="no"
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
    </div>
  );
};

export default Home;