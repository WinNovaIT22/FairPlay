import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Chip } from "@nextui-org/react";
import AdminCover from "@/public/admincover.png";
import SupervisorUsers from "@/components/ui/supervisorUserTable"

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
          <Chip className="ml-2" color="primary" size="md" variant="flat">
            Valvoja
          </Chip>
        </div>
      <SupervisorUsers />
      </div>
    </>
  );
};

export default Home;
