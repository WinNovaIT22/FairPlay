import Navbar from "../components/ui/navbar"
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";

const Home = async () => {
  const session = await getServerSession(authOptions)
  const userRole = session?.user.role

    const currentHour = new Date().getHours();
    let greeting = "";
  
    if (currentHour >= 0 && currentHour < 12) {
      greeting = "Hyvää huomenta";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Hyvää päivää";
    } else {
      greeting = "Hyvää iltaa";
    }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div>
        {greeting}, {session?.user.firstname} {session?.user.lastname}
        {userRole === 'admin' && (
          <button onClick={() => router.push('/admin')}>Admin Page</button>
        )}
      </div>
    </div>
  );
}

export default Home;