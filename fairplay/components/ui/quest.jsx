"use client"

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const Quests = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-row cursor-pointer text-white text-opacity-70" onClick={goBack}>
      <IoIosArrowBack size={40} />
      <span className="mt-2">Takaisin</span>
    </div>
  );
};

export default Quests;