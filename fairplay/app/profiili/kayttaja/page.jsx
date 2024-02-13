import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { Input } from '@nextui-org/react';
import PasswordModal from '@/components/ui/passwordmodal'
import DeleteModal from '@/components/ui/deletemodal'

const Vehicles = async () => {
    const session = await getServerSession(authOptions)
    const firstname = session?.user.firstname
    const lastname = session?.user.lastname
    const email = session?.user.email

    return (
      <div className="flex items-center justify-center">
        <div>
          <div className="mt-3 text-center text-2xl">Käyttäjätiedot</div>
          <div className="mt-10">
            <div className="flex items-center space-x-4 mb-4">
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
                type="text"
                label="Sähköposti"
                defaultValue={email}
              />
            <div className="flex flex-col justify-center mt-14">
              <PasswordModal />
              <DeleteModal />
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Vehicles;