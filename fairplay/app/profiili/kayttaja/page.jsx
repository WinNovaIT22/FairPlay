import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

const Vehicles = async () => {
    const session = await getServerSession(authOptions)
    const firstname = session?.user.firstname
    const lastname = session?.user.lastname
    const email = session?.user.email

    return (
      <div className="">
        <div>
          <h1>Käyttäjätiedot</h1>
          <div className="w-80 border-2 border-red-950 rounded-md shadow-md overflow-hidden mt-4">
          </div>
        </div>
      </div>
    );
  }

export default Vehicles;