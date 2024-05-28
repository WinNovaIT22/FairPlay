import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Input } from "@nextui-org/react";
import PasswordModal from "@/components/modals/changeUserPassword";
import DeleteModal from "@/components/modals/deleteUser";
import { FaUserAlt, FaHome } from "react-icons/fa";

const UserData = async () => {
  const session = await getServerSession(authOptions);
  const firstname = session?.user.firstname;
  const lastname = session?.user.lastname;
  const email = session?.user.email;

  return (
    <>
      <div
        className="flex flex-col h-screen"
        style={{
          backgroundImage: "url(/backgrounds/userinfobg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="shadow-lg backdrop-blur-2xl text-xl md:text-2xl p-4 font-black rounded-lg flex justify-center items-center">
          <div className="absolute left-2">
            <a href="/" className="navigation-card">
              <FaHome size={24} color="black" />
            </a>
          </div>
          <FaUserAlt size={28} className="mr-2" />
          Käyttäjätiedot
        </div>
        <div className="flex justify-center w-full mt-8">
          <div className="flex flex-col justify-center w-4/5 md:w-2/6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Input
                  isReadOnly
                  type="text"
                  label="Etunimi"
                  defaultValue={firstname}
                />
                <Input
                  isReadOnly
                  type="text"
                  label="Sukunimi"
                  defaultValue={lastname}
                />
              </div>
              <Input
                isReadOnly
                type="text"
                label="Sähköposti"
                defaultValue={email}
              />
            </div>
            <div className="flex flex-col justify-center mt-8">
              <PasswordModal />
              <DeleteModal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserData;
