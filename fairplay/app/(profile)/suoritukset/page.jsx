"use client"

import { FaHome } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import UserTaskTable from "@/components/ui/userTaskTable";
import { useState, useEffect } from "react";

export default function Tasks() {
  const [userVehicles, setUserVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/getTasks");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUserVehicles(data.vehicles);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const isAnyVehicleInspected = userVehicles.some(vehicle => vehicle.inspected);
  const hasNoVehicles = userVehicles.length < 0;

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
        {!isLoading && (isAnyVehicleInspected || hasNoVehicles) ? (
          <div>
            <UserTaskTable />
          </div>
        ) : null}
        {!isLoading && !isAnyVehicleInspected && !hasNoVehicles && (
          <div className="text-center text-red-500 font-bold text-lg mt-5">
            Sinulta puuttuu ajoneuvo tai ajoneuvoasi ei ole katsastettu
          </div>
        )}
      </div>
    </>
  );
}
