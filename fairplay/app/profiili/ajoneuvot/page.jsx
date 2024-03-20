"use client"

import React, { useState, useEffect } from "react";
import { FaMotorcycle } from "react-icons/fa6";
import { HiOutlinePlus } from "react-icons/hi2";
import InspectVehicle from "@/components/modals/inspectVehicle";
import AddVehicle from "@/components/modals/addNewVehicle";
import Loading from "@/app/loading";

const Vehicles = () => {
  const [userVehicles, setUserVehicles] = useState([]);
  const [islInspectOpen, setIslInspectOpen] = useState(false);
  const [isNewVehicleOpen, setIsNewVehicleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchUserVehicles = async () => {
      try {
        const response = await fetch("/api/user/getVehicles");
        if (response.ok) {
          const data = await response.json();
          setUserVehicles(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error("Failed to fetch user vehicles:", response.statusText);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching user vehicles:", error);
      }
    };

    fetchUserVehicles();
  }, []);

  const openInspect = (vehicleName) => {
    setSelectedVehicle(vehicleName);
    setIslInspectOpen(true);
  };
  const closeInspect = () => {
    setIslInspectOpen(false);
  };
  const openNewVehicle = () => {
    setIsNewVehicleOpen(true);
  };
  const closeNewVehicle = () => {
    setIsNewVehicleOpen(false);
  };


  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-center text-xl mt-5">Omat ajoneuvot</h1>
        <div className="flex justify-center items-center">
          <div className="w-2/6 mt-8">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {Array.isArray(userVehicles) && userVehicles.length > 0 ? (
                  userVehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="border-3 border-red-950 rounded-md shadow-md mb-4"
                    >
                      <div className="flex justify-center py-4">
                        <div className="flex items-center">
                          <FaMotorcycle size={22} />
                          <p className="ml-2">{vehicle.vehicle}</p>
                        </div>
                      </div>
                      <div className="mr-2">
                        {vehicle.inspected ? (
                          <p className="text-green-600 text-sm text-end">
                            Katsastettu kaudelle {currentYear}
                          </p>
                        ) : (
                          <p
                            className="text-red-600 text-sm text-end cursor-pointer underline hover:text-red-600/70"
                            onClick={() => openInspect(vehicle.vehicle)}
                          >
                            Katsasta tästä
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Et omista yhtäkään ajoneuvoa</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-7">
          <button onClick={() => openNewVehicle()} className="flex items-center justify-center w-2/6 py-2 bg-red-950 rounded-md shadow-md font-semibold">
            <HiOutlinePlus size={23} className="mr-2" />
            Lisää uusi ajoneuvo
          </button>
        </div>
        {islInspectOpen && (
          <InspectVehicle
            isOpen={islInspectOpen}
            onClose={closeInspect}
            vehicleName={selectedVehicle}
          />
        )}
         {isNewVehicleOpen && (
          <AddVehicle
            isOpen={isNewVehicleOpen}
            onClose={closeNewVehicle}
            vehicleName={selectedVehicle}
          />
        )}
      </div>
    </>
  );
};

export default Vehicles;