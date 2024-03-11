import Navbar from "@/components/ui/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Button } from "@nextui-org/react";
import { MdAdminPanelSettings } from "react-icons/md";

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
    <div className="flex">
<<<<<<< HEAD
      <div className="flex flex-grow justify-center">
        <div className="flex justify-around bg-zinc-700 p-4 rounded-lg">
          <div><Navbar /></div>
          <div className="flex items-center text-center text-xl">{greeting}, {session?.user.firstname} {session?.user.lastname}</div>
          {isAdmin && <div><Button variant="bordered" size="lg"><MdAdminPanelSettings size={25}/>Admin</Button></div>}
        </div>
      </div>
=======
      <Navbar />
    <div className="flex justify-around bg-zinc-700 p-4 rounded-lg">
      <div><Navbar /></div>
      <div className="flex items-center text-center text-xl">{greeting}, {session?.user.firstname} {session?.user.lastname}</div>
      {isAdmin && <div><Button variant="bordered" size="lg"><MdAdminPanelSettings size={25}/>Admin</Button></div>}

    </div>
>>>>>>> 29973abd6c657d2e8617c18b93a59ccbe0e3ff3b
    </div>
  );
}

export default Home;