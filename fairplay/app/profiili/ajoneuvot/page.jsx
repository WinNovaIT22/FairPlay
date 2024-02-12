import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { FaMotorcycle } from "react-icons/fa6";

const Vehicles = async () => {
    const session = await getServerSession(authOptions)
    const vehicle = session?.user.vehicle

    return (
      <div className="">
        <div>
          <h1>Omat ajoneuvot</h1>
          <div className="w-80 border-2 border-red-950 rounded-md shadow-md overflow-hidden mt-4">
            <FaMotorcycle /> {vehicle}
          </div>
        </div>
      </div>
    );
  }

export default Vehicles;
