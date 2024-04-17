import { FaHome } from "react-icons/fa";
import { GrTask } from "react-icons/gr";

export default function Tasks() {
  return (
    <>
      <div
        className="flex flex-col h-screen"
        style={{
          backgroundImage: "url(/backgrounds/taskbg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="shadow-lg backdrop-blur-2xl text-2xl p-4 font-black rounded-lg flex justify-center items-center">
          <div className="absolute left-2">
            <a href="/" className="navigation-card">
              <FaHome size={24} color="black" />
            </a>
          </div>
          <GrTask size={30} className="mr-3" />
            Suoritukset
        </div>
        <div>
          moi
        </div>
      </div>
    </>
  );
}
