import Navbar from "@/components/ui/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Button } from "@nextui-org/react";
import { MdAdminPanelSettings } from "react-icons/md";
import Image from "next/image";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === "admin";

  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour >= 0 && currentHour < 12) {
    greeting = "Hyvää huomenta";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Hyvää päivää";
  } else {
    greeting = "Hyvää iltaa";
  }

  return (
    <>
      <div className="flex justify-around bg-zinc-700 p-4 rounded-lg">
        <div><Navbar /></div>
        <div className="flex text-center text-xl">{greeting}, {session?.user.firstname} {session?.user.lastname}</div>
        {isAdmin && <div><Button variant="bordered" size="lg"><MdAdminPanelSettings size={25}/>Admin</Button></div>}
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="absolute top-4 left-4">
          <Image src="/kuva.jpg" alt="Kuva" width={50} height={50} />
        </div>
        <div className="flex flex-col items-center" >
          <h1 className="text-4xl font-bold">Fairplay</h1>
          <p className="text-lg">2024</p>
        </div>
      </div>
    </>
  );
}

export default Home;
