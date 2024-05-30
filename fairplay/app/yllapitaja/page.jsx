import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import DateTime from "@/components/ui/datetime";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
      />
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
          <Chip className="ml-2" color="success" size="md" variant="flat">
            Ylläpitäjä
          </Chip>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/">
            <Card shadow="sm" isPressable className="hover:scale-95 mt-1">
              <CardBody className="h-[40px] w-[400px] overflow-visible p-3 bg-gradient-to-l from-stone-900 to-green-900 flex flex-row font-semibold justify-center items-center">
                <FaLongArrowAltLeft className="mr-5" size={25} />
                Siirry takaisin etusivulle
              </CardBody>
            </Card>
          </Link>
        </div>
        <div className="flex flex-row justify-center mt-10">
          <Link href="/yllapitaja/kayttajat">
            <Card shadow="sm" isPressable className="hover:scale-95">
              <CardBody className="h-[140px] w-[240px] overflow-visible p-0 bg-gradient-to-b from-blue-400 to-stone-900 flex items-center justify-center">
                <Image alt="Users" width={150} src="/users.png" />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Käyttäjälista</b>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/yllapitaja/suoritukset">
            <Card shadow="sm" isPressable className="ml-5 hover:scale-95">
              <CardBody className="h-[140px] w-[240px] overflow-visible p-0 bg-gradient-to-b from-yellow-400 to-stone-900 flex items-center justify-center">
                <Image alt="Tasks" width={110} src="/task.png" />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Hallitse suorituksia</b>
              </CardFooter>
            </Card>
          </Link>
          <Link href="/yllapitaja/estetyt">
            <Card shadow="sm" isPressable className="ml-5 hover:scale-95">
              <CardBody className="h-[140px] w-[240px] overflow-visible p-0 bg-gradient-to-b from-red-400 to-stone-900 flex items-center justify-center">
                <Image alt="Blocked Users" width={150} src="/bannedusers.png" />
              </CardBody>
              <CardFooter className="text-lg">
                <b className="mx-auto">Kisasta poistetut</b>
              </CardFooter>
            </Card>
          </Link>
        </div>
        <div className="flex flex-col items-center mt-12">
          <p className="mb-2 text-white text-lg font-bold backdrop-blur-2xl px-2">Määritä FairPlay -kilpailun kesto</p>
          <DateTime />
         </div>
      </div>
    </>
  );
};

export default Home;
