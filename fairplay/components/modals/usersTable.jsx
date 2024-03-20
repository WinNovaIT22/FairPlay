"use client"

import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import { MdBlock, MdOutlineAdminPanelSettings, MdOutlineRemoveCircleOutline, MdLockOutline } from "react-icons/md";
import { roleColorMap } from "@/app/admin/kayttajat/page"; 
import PasswordModal from "@/components/modals/changeUserPasswordAdmin";

const ModalComponent = ({ isOpen, onClose, modalData }) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userVehicles, setUserVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!modalData) {
    return null;
  }

  const updateUserRole = async (newRole) => {
    try {
      const response = await fetch("/api/user/updateRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: modalData.id, newRole }),
      });

      if (response.ok) {
        console.log("User role updated successfully");
        window.location.reload(true);
      } else {
        console.error("Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const fetchUserVehicles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/getVehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: modalData.id }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserVehicles(data);
      } else {
        console.error("Failed to fetch user vehicles:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user vehicles:", error);
    }
    setIsLoading(false); 
  };

  useEffect(() => {
    if (isOpen && modalData) {
      fetchUserVehicles();
    }
  }, [isOpen, modalData]);

  const blockUser = async () => {
    try {
      const response = await fetch("/api/user/block/blockUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: modalData.id }),
      });
  
      if (response.ok) {
        console.log("User blocked successfully");
        window.location.reload(true);
      } else {
        console.error("Failed to block user");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };
  
  const openPasswordModal = (userData) => {
    setSelectedUser(userData);
    setIsPasswordModalOpen(true);
  };

  return (
    <Modal size={"lg"} placement={"center"} isOpen={isOpen} onClose={onClose}>
      <PasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} user={selectedUser} />
      <ModalContent>
        <ModalHeader>Profiili</ModalHeader>
        <ModalBody>
          {modalData && (
                <>
                  <div>{modalData.firstname} {modalData.lastname} <Chip color={roleColorMap[modalData.role]} size="sm" variant="flat">{modalData.role}</Chip><br></br>{modalData.email}</div>
                  <div>Ajoneuvo(t): 
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
                            onClick={() => openModal(vehicle.vehicle)}
                          >
                            Katsasta tästä
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Käyttäjällä ei ole yhtäkään ajoneuvoa</p>
                )}
                  </div>
              </>
          )}
        </ModalBody>
        <ModalFooter>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat">Toiminnot</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions">
              <DropdownSection title="Roolit" showDivider>  
                {modalData.role !== "ylläpitäjä" && (
                  <DropdownItem key="admin" className="text-success" description="Kaikki oikeudet" color="success" onClick={() => updateUserRole("ylläpitäjä")} startContent={<MdOutlineAdminPanelSettings />}>Anna ylläpito-oikeudet</DropdownItem>
                )}
                {modalData.role !== "valvoja" && (
                  <DropdownItem key="supervisor" className="text-primary" description="Näkee tehtävät ja tarkistaa niitä" color="primary" onClick={() => updateUserRole("valvoja")} startContent={<MdOutlineAdminPanelSettings />}>Anna valvoja-oikeudet</DropdownItem>
                )}
                {(modalData.role === "valvoja" || modalData.role === "ylläpitäjä") && (
                  <DropdownItem key="remove" className="text-danger" description="Antaa käyttäjälle kilpailija-roolin" color="danger" onClick={() => updateUserRole("kilpailija")} startContent={<MdOutlineRemoveCircleOutline />}>Nollaa oikeudet</DropdownItem>
                )}
              </DropdownSection>
              <DropdownItem key="change-password" className="text-warning" color="warning" onClick={() => openPasswordModal(modalData)} startContent={<MdLockOutline />}>Vaihda salasana</DropdownItem>
              <DropdownItem key="block" className="text-danger" color="danger" onClick={blockUser} startContent={<MdBlock />}>Anna porttikielto</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;