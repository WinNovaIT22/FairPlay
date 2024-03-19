"use client"

import React, { useState, useEffect } from "react";
import { FaMotorcycle } from "react-icons/fa6";

const Vehicles = () => {
  const [userVehicles, setUserVehicles] = useState([]);

  useEffect(() => {
    const fetchUserVehicles = async () => {
      try {
        const response = await fetch("/api/user/getVehicles");
        if (response.ok) {
          const data = await response.json();
          setUserVehicles(data);
        } else {
          console.error("Failed to fetch user vehicles");
        }
      } catch (error) {
        console.error("Error fetching user vehicles:", error);
      }
    };

    fetchUserVehicles();
  }, []); 
  

  return (
    <div className="">
      <div>
      <div className="flex flex-col h-screen">
      {/* Navigointinappi yläkulmaan */}
      <div className="navigation-card">
        <a href="http://localhost:3000/" className="tab">
          <svg
            className="svgIcon"
            viewBox="0 0 50 50"  // Pienennetty näkymälaajuus
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '40px', height: '40px' }}  // Lisätty tyylit pienentämiseksi
          >
            <path
              d="M48 20.25V48H30V34V32H28H20H18V32V48H2V20.25L26 2.375L48 20.25Z"
              stroke="grey"
              strokeWidth="5"  // Pienennetty viivan paksuutta
            ></path>
          </svg>
        </a>
      </div>
        <h1>Omat ajoneuvot</h1>
        <div className="w-80 border-2 border-red-950 rounded-md shadow-md overflow-hidden mt-4">
          {/* Check if userVehicles is an array before mapping */}
          {Array.isArray(userVehicles) && userVehicles.length > 0 ? (
            userVehicles.map((vehicle) => (
              <div key={vehicle.id}>
                {/* Render vehicle details, adjust as per your data structure */}
                <FaMotorcycle />
                <span>{vehicle.merkkiSelvakielinen}</span>
                <span>{vehicle.kaupallinenNimi}</span>
              </div>
            ))
          ) : (
            <p>No vehicles found</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Vehicles;
