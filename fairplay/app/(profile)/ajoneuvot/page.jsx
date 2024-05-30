"use client";

import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FaMotorcycle } from "react-icons/fa6";
import { HiOutlinePlus } from "react-icons/hi2";
import InspectVehicle from "@/components/modals/inspectVehicle";
import AddVehicle from "@/components/modals/addNewVehicle";
import Loading from "@/app/loading";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { PiGarage } from "react-icons/pi";

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

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      const response = await fetch(`/api/user/deleteVehicle`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicleId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete vehicle");
      }

      const result = await response.json();
      console.log(result.message);

      setUserVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id !== vehicleId)
      );
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const openInspect = (vehicleName, vehicleId) => {
    setSelectedVehicle(vehicleName);
    setSelectedVehicleId(vehicleId);
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

  const handleVehicleAdded = (newVehicle) => {
    setUserVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  };

  const handleVehicleInspected = (vehicleId) => {
    setUserVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id === vehicleId ? { ...vehicle, inspected: true } : vehicle
      )
    );
    setIslInspectOpen(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div
        className="flex flex-col h-screen"
        style={{
          backgroundImage: "url(/backgrounds/vehiclesbg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="shadow-lg backdrop-blur-2xl text-xl md:text-2xl p-4 font-black rounded-lg flex justify-center items-center">
          <div className="absolute left-2">
            <a href="/" className="navigation-card">
              <FaHome size={24} color="black" />
            </a>
          </div>
          <PiGarage size={35} className="mr-2" />
          Moottoripyörätalli
        </div>
        <div className="flex justify-center items-center">
          <div className="w-6/7 md:w-2/6 mt-8">
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
                              onClick={() =>
                                openInspect(vehicle.vehicle, vehicle.id)
                              }
                            >
                              Ei katsastettu - katsasta
                            </p>
                          )}
                        </div>
                      </div>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly color="danger" variant="light" aria-label="Delete">
                            <RiDeleteBinLine size={20}/>
                          </Button>   
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Delete option"
                          onAction={() => handleDeleteVehicle(vehicle.id)}
                        >
                          <DropdownItem key="delete" className="text-danger" color="danger">
                            <div className="flex items-center">
                              <RiDeleteBinLine className="mr-2" />
                              Vahvista poisto
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-black">
                    Et omista vielä yhtäkään ajoneuvoa
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-7">
          <button
            onClick={() => openNewVehicle()}
            className="flex items-center justify-center w-2/3 md:w-2/6 py-2 bg-red-950 rounded-md shadow-lg font-semibold"
          >
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
            onVehicleInspected={handleVehicleInspected}
          />
        )}
        {isNewVehicleOpen && (
          <AddVehicle
            isOpen={isNewVehicleOpen}
            onClose={closeNewVehicle}
            onVehicleAdded={handleVehicleAdded}
          />
        )}
      </div>
    </>
  );
};

export default Vehicles;
