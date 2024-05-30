"use client";

import { FaHome } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import UserTaskTable from "@/components/ui/userTaskTable";
import { useState, useEffect } from "react";
import { parseZonedDateTime } from "@internationalized/date";

export default function Tasks() {
  const [userVehicles, setUserVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWithinDateRange, setIsWithinDateRange] = useState(false);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    const fetchDatesAndData = async () => {
      try {
        const dateResponse = await fetch("/api/admin/datetime");
        if (!dateResponse.ok) {
          throw new Error("Failed to fetch date range");
        }
        const dateData = await dateResponse.json();
        const { start, end } = dateData.event;

        const currentDate = new Date();
        const parsedStartDate = parseZonedDateTime(start);
        const endDate = parseZonedDateTime(end);

        setStartDate(parsedStartDate); 

        if (currentDate >= parsedStartDate.toDate() && currentDate <= endDate.toDate()) {
          setIsWithinDateRange(true);
        } else {
          setIsWithinDateRange(false);
        }

        const vehicleResponse = await fetch("/api/user/getTasks");
        if (!vehicleResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        const vehicleData = await vehicleResponse.json();
        setUserVehicles(vehicleData.vehicles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatesAndData();
  }, []);

  const isAnyVehicleInspected = userVehicles.some(vehicle => vehicle.inspected);
  const hasNoVehicles = userVehicles.length === 0;

  return (
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
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          Lataa...
        </div>
      ) : !isWithinDateRange ? (
        <div className="flex justify-center items-center h-full text-center text-red-500 font-bold text-lg mt-5">
          Kisa alkaa {startDate.toLocaleString()}
        </div>
      ) : (
        <>
          {(isAnyVehicleInspected || hasNoVehicles) ? (
            <div>
              <UserTaskTable />
            </div>
          ) : (
            <div className="text-center text-red-500 font-bold text-lg mt-5">
              Sinulta puuttuu ajoneuvo tai ajoneuvoasi ei ole katsastettu
            </div>
          )}
        </>
      )}
    </div>
  );
}