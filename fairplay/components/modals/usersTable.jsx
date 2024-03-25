"use client"

import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Accordion, AccordionItem } from "@nextui-org/react";
import { MdBlock, MdOutlineAdminPanelSettings, MdOutlineRemoveCircleOutline, MdLockOutline } from "react-icons/md";
import { roleColorMap } from "@/app/yllapitaja/kayttajat/page"; 
import { FaMotorcycle } from "react-icons/fa6";
import PasswordModal from "@/components/modals/changeUserPasswordAdmin";
import Image from 'next/image';

const ModalComponent = ({ isOpen, onClose, modalData }) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userVehicles, setUserVehicles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserVehicles = async () => {
      try {
        const response = await fetch("/api/admin/getVehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: modalData.id }),
        });
        
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
  }, [isOpen, modalData]);

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

  const currentYear = new Date().getFullYear();

  return (
    <Modal size={"full"} placement={"center"} isOpen={isOpen} onClose={onClose}>
     <PasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} user={selectedUser} />
     <ModalContent>
       <ModalHeader>Profiili</ModalHeader>
       <ModalBody>
         {isLoading ? ( 
           <p>Loading...</p>
         ) : (
           <>
             <div>{modalData.firstname} {modalData.lastname} <Chip color={roleColorMap[modalData.role]} size="sm" variant="flat">{modalData.role}</Chip><br></br>{modalData.email}</div>
             <div className='text-center text-xl'>Ajoneuvot: 
             {Array.isArray(userVehicles) && userVehicles.length > 0 ? (
               <Accordion>
                 {userVehicles.map((vehicle, index) => (
                  <AccordionItem key={index} title={<div className="flex items-center text-sm">{<FaMotorcycle size={18} className='mr-3'/>} {vehicle.vehicle} - {vehicle.inspected ? `Katsastettu kaudelle ${currentYear}` : 'Ei katsastettu'}</div>}>
                  <div>
                    asd
                    {!vehicle.inspected && vehicle.inspectedImage && (
                      <Image
                        alt="Users"
                        className="h-[140px] w-[240px] object-cover"
                        src={vehicle.inspectedImage}
                      />
                    )}
                  </div>
                  </AccordionItem>
                 ))}
               </Accordion>
             ) : (
               <p>Käyttäjällä ei ole yhtäkään ajoneuvoa</p>
             )}
             </div>
           </>
         )}
        <div className='mt-5 text-center text-xl'>Suoritukset</div>
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