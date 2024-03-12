import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="flex justify-around bg-zinc-700 p-4 rounded-lg mb-4">
        tervetuloa
      </div>
      <div className=" flex flex-col items-center">
        <Card shadow="sm" isPressable className="hover:scale-95">
          <CardBody className="overflow-visible p-0">
            <iframe
              style={{ pointerEvents: "none", overflow: "hidden" }}
              src="/admin/kayttajat"
              className="gray-300 shadow-md opacity-65"
              scrolling="no"
            />
          </CardBody>
          <CardFooter className="text-lg">
            <b className="mx-auto">Käyttäjät</b>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
