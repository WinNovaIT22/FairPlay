import Navbar from "../components/ui/navbar"
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";

const Home = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div>Tervetuloa {session?.user.firstname}
      <Navbar />
    </div>
  );
}

export default Home;
