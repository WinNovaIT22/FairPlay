"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Accordion,
  AccordionItem,
  Image,
} from "@nextui-org/react";
import {
  MdBlock,
  MdOutlineAdminPanelSettings,
  MdOutlineRemoveCircleOutline,
  MdLockOutline,
} from "react-icons/md";
import { roleColorMap } from "@/utils/rolecolormap.js";
import { FaMotorcycle } from "react-icons/fa6";
import PasswordModal from "@/components/modals/changeUserPasswordAdmin";
import { MdOutlineTask } from "react-icons/md";

const ModalComponent = ({ isOpen, onClose, modalData }) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userVehicles, setUserVehicles] = useState(null);
  const [userTasks, setUserTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(modalData ? modalData.role : "");

  const openPasswordModal = useCallback((userData) => {
    setSelectedUser(userData);
    setIsPasswordModalOpen(true);
  }, []);

  useEffect(() => {
    if (modalData && modalData.role !== userRole) {
      setUserRole(modalData.role);
    }
  }, [modalData]);

  useEffect(() => {
    if (!isOpen || !modalData || !modalData.id) {
      setUserVehicles([]);
      return;
    }

    const fetchUserVehicles = async () => {
      setIsLoading(true);
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
        } else {
          console.error("Failed to fetch user vehicles:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserVehicles();
  }, [isOpen, modalData]);

  useEffect(() => {
    if (!isOpen || !modalData || !modalData.id) {
      setUserTasks([]);
      return;
    }

    const fetchUserTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin/getUserTasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: modalData.id }),
        });

        if (response.ok) {
          const data = await response.json();
          setUserTasks(data);
        } else {
          console.error("Failed to fetch user tasks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTasks();
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
        setUserRole(newRole);
      } else {
        console.error("Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };
  
  const updateUserVehicleInspection = async (vehicleId, inspected) => {
    try {
      const response = await fetch("/api/user/updateVehicleInspection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicleId, inspected }),
      });

      if (response.ok) {
        console.log("Vehicle inspection status updated successfully");
        // Update local state to reflect the change
        setUserVehicles(prevVehicles =>
          prevVehicles.map(vehicle =>
            vehicle.id === vehicleId ? { ...vehicle, inspected } : vehicle
          )
        );
      } else {
        console.error("Failed to update vehicle inspection status");
      }
    } catch (error) {
      console.error("Error updating vehicle inspection status:", error);
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

  const currentYear = new Date().getFullYear();
  const formatDateHelsinki = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' });
  };
  
  return (
    <Modal size={"full"} placement={"center"} isOpen={isOpen} onClose={onClose}>
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        user={selectedUser}
      />
      <ModalContent>
        <ModalHeader>Profiili</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div>
                {modalData.firstname} {modalData.lastname}
                <Chip
                  color={roleColorMap[userRole]}
                  size="sm"
                  variant="flat"
                  className="ml-2"
                >
                  {modalData.role}
                </Chip>
                <br />
                {modalData.email}
              </div>
              <div className="text-center text-xl">
                Ajoneuvot
                {Array.isArray(userVehicles) && userVehicles.length > 0 ? (
                  <Accordion className="mx-auto max-w-lg">
                    {userVehicles.map((vehicle, index) => (
                      <AccordionItem
                        key={index}
                        title={
                          <div className="flex items-center text-sm">
                            <FaMotorcycle size={18} className="mr-3" />
                            <div>{vehicle.vehicle} - {vehicle.inspected ? (
                              <span className="text-green-500">
                                Katsastettu kaudelle {currentYear}
                              </span>
                            ) : (
                              <span className="text-red-500">
                                Ei katsastettu
                              </span>
                            )}
                            </div>
                          </div>
                        }
                      >
                        {vehicle.inspected && vehicle.inspectedImage ? (
                          <div className="flex justify-center items-center flex-col">
                            <p className="text-sm">
                              Käyttäjän lähettämä kuva, {formatDateHelsinki(vehicle.createdAt)}:
                            </p>
                            <Image
                              alt="InspectedTrue"
                              width={300}
                              src={vehicle.inspectedImage}
                              className="my-3"
                            />
                             <Button
                              variant="flat"
                              color="danger"
                              onClick={() => updateUserVehicleInspection(vehicle.id, false)}
                            >
                              Hylkää katsastus
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="flat"
                            color="success"
                            className="w-full"
                            onClick={() => updateUserVehicleInspection(vehicle.id, true)}
                          >
                            Merkitse katsastetuksi
                          </Button>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p>Käyttäjällä ei ole yhtäkään ajoneuvoa</p>
                )}
              </div>
              <div className="text-center text-xl">
                Suoritetut suoritukset
                {Array.isArray(userTasks) && userTasks.length > 0 ? (
                  <Accordion className="mx-auto max-w-lg">
                    {userTasks.map((task, index) => (
                      <AccordionItem
                        key={index}
                        title={
                          <div className="flex items-center text-sm">
                            <MdOutlineTask size={18} className="mr-3" />
                            <div>{task.tasktitle} - <span className="text-green-500">Suoritettu</span></div>
                          </div>
                        }
                      >
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p>Käyttäjällä ei ole yhtäkään ajoneuvoa</p>
                )}
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>Sulje</Button>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat">Toiminnot</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions">
              <DropdownSection title="Roolit" showDivider>
                {modalData.role !== "ylläpitäjä" && (
                  <DropdownItem
                    key="admin"
                    className="text-success"
                    description="Kaikki oikeudet"
                    color="success"
                    onClick={() => updateUserRole("ylläpitäjä")}
                    startContent={<MdOutlineAdminPanelSettings />}
                  >
                    Anna ylläpito-oikeudet
                  </DropdownItem>
                )}
                {modalData.role !== "valvoja" && (
                  <DropdownItem
                    key="supervisor"
                    className="text-primary"
                    description="Näkee tehtävät ja tarkistaa niitä"
                    color="primary"
                    onClick={() => updateUserRole("valvoja")}
                    startContent={<MdOutlineAdminPanelSettings />}
                  >
                    Anna valvoja-oikeudet
                  </DropdownItem>
                )}
                {(modalData.role === "valvoja" ||
                  modalData.role === "ylläpitäjä") && (
                  <DropdownItem
                    key="remove"
                    className="text-danger"
                    description="Antaa käyttäjälle kilpailija-roolin"
                    color="danger"
                    onClick={() => updateUserRole("kilpailija")}
                    startContent={<MdOutlineRemoveCircleOutline />}
                  >
                    Nollaa oikeudet
                  </DropdownItem>
                )}
              </DropdownSection>
              <DropdownItem
                key="change-password"
                className="text-warning"
                color="warning"
                onClick={() => openPasswordModal(modalData)}
                startContent={<MdLockOutline />}
              >
                Vaihda salasana
              </DropdownItem>
              <DropdownItem
                key="block"
                className="text-danger"
                color="danger"
                onClick={blockUser}
                startContent={<MdBlock />}
              >
                Poista kisasta
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
