import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Chip } from "@nextui-org/react";
import AdminCover from "@/public/admincover.png";
import SupervisorUsers from "@/components/ui/supervisorUserTable"

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
        <Chip className="ml-2" color="primary" size="md" variant="flat">
          Valvoja
        </Chip>
      </div>
      <SupervisorUsers />
    </>
  );
};

export default Home;
