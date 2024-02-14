import Navbar from "@/components/ui/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Button } from "@nextui-org/react";
import { MdAdminPanelSettings } from "react-icons/md";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-around bg-zinc-700 p-4 rounded-lg">
        tervetuloa
    </div>
  );
}

export default Home;
