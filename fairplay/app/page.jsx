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
    <div
      className="flex justify-around bg-zinc-700 p-4 rounded-lg"
      style={{
        backgroundImage: `url('https://bwhip62.files.wordpress.com/2023/10/dji_0759-1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div><Navbar /></div>
      <div className="flex items-center text-center text-xl">{greeting}, {session?.user.firstname} {session?.user.lastname}</div>
      {isAdmin && <div><Button variant="bordered" size="lg"><MdAdminPanelSettings size={25}/>Admin</Button></div>}
    </div>
  );
}

export default Home;
