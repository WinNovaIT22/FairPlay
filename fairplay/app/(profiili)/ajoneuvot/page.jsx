"use client"

import React, { useState, useEffect } from "react";
import { FaMotorcycle } from "react-icons/fa6";
import { HiOutlinePlus } from "react-icons/hi2";
import InspectVehicle from "@/components/modals/inspectVehicle";
import AddVehicle from "@/components/modals/addNewVehicle";
import Loading from "@/app/loading";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

const Vehicles = () => {
  const [userVehicles, setUserVehicles] = useState([]);
  const [islInspectOpen, setIslInspectOpen] = useState(false);
  const [isNewVehicleOpen, setIsNewVehicleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

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

  const openInspect = (vehicleName, vehicleId) => {
    setSelectedVehicle(vehicleName);
    setSelectedVehicleId(vehicleId)
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
          <div className="absolute top-0 left-0 m-4">
        <a href="http://localhost:3000/" className="navigation-card">
          <FaHome size={24} color="black" /> {/* Lisää FaHome-kuvake */}
        </a>
      </div>
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
                      className="border-3 border-red-950 bg-zinc-700 rounded-md shadow-lg mb-4 flex items-center p-4"
                    >
                      <FaMotorcycle size={35} />
                      <div className="flex flex-col text-center items-center justify-center flex-grow">
                        <div className="font-black text-xl tracking-wider">
                          <p className="ml-2">{vehicle.vehicle}</p>
                        </div>
                        <div>
                          
                          {vehicle.inspected ? (
                            <p className="text-green-600 text-sm text-end">
                              Katsastettu kaudelle {currentYear}
                            </p>
                          ) : (
                            <p
                              className="text-red-600 text-sm text-end cursor-pointer underline hover:text-red-600/70"
                              onClick={() => openInspect(vehicle.vehicle, vehicle.id)}
                            >
                              Ei katsastettu - katsasta
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="cursor-pointer">
                        <RiDeleteBinLine color="red" size={20} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">Et omista vielä yhtäkään ajoneuvoa</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-7">
          <button onClick={() => openNewVehicle()} className="flex items-center justify-center w-2/6 py-2 bg-red-950 rounded-md shadow-lg font-semibold">
            <HiOutlinePlus size={23} className="mr-2" />
            Lisää uusi ajoneuvo
          </button>
        </div>
        {islInspectOpen && (
          <InspectVehicle
            isOpen={islInspectOpen}
            onClose={closeInspect}
            vehicleName={selectedVehicle}
            vehicleId={selectedVehicleId}
          />
        )}
         {isNewVehicleOpen && (
          <AddVehicle
            isOpen={isNewVehicleOpen}
            onClose={closeNewVehicle}
          />
        )}
      </div>
    </>
  );
};

export default Vehicles;