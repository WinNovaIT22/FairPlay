import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Input } from '@nextui-org/react';
import PasswordModal from '@/components/modals/changeUserPassword'
import DeleteModal from '@/components/modals/deleteUser'

const UserData = async () => {
  const session = await getServerSession(authOptions);
  const firstname = session?.user.firstname;
  const lastname = session?.user.lastname;
  const email = session?.user.email;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center text-2xl mb-6">Käyttäjätiedot</div>
        <div className="mt-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <Input
                isDisabled
                type="text"
                label="Etunimi"
                defaultValue={firstname}
              />
              <Input
                isDisabled
                type="text"
                label="Sukunimi"
                defaultValue={lastname}
              />
            </div>
            <Input
              isDisabled
              type="text"
              label="Sähköposti"
              defaultValue={email}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center mt-8 space-y-4">
          <PasswordModal />
          <DeleteModal />
        </div>
      </div>
    </div>
  );
};

export default UserData;