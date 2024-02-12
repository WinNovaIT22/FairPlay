import Navbar from "../components/ui/navbar"
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";

const Home = async () => {
  const session = await getServerSession(authOptions)
  const userRole = session?.user.role

  return (
    <div className="">
      <div>
        Tervetuloa {session?.user.firstname} {session?.user.lastname}
        <Navbar />
        {userRole === 'admin' && (
          <button onClick={() => router.push('/admin')}>Admin Page</button>
        )}
      </div>
    </div>
  );
}

export default Home;