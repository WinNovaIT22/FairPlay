import { getServerSession } from "next-auth";
import { authOptions } from "../../../utils/auth";

const Navbar = async () => {
    const session = await getServerSession(authOptions)
    const vehicle = session?.user.vehicle

    return (
      <div className="flex justify-center h-screen">
        <div>
          <h1>Omat ajoneuvot</h1>
          <p>Your vehicle: {vehicle}</p>
        </div>
      </div>
    );
  }

export default Navbar;
