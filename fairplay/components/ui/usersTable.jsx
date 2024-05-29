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
  MdLockOutline,
} from "react-icons/md";
import { roleColorMap } from "@/utils/rolecolormap.js";
import { FaMotorcycle, FaRegStar } from "react-icons/fa6";
import PasswordModal from "@/components/modals/changeUserPasswordAdmin";
import { MdOutlineTask } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import AdminRejectTask from "@/components/modals/adminRecjectTask";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ModalComponent = ({ isOpen, onClose, modalData, onUpdateUserRole }) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userVehicles, setUserVehicles] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [isRejectTaskOpen, setIsRejectTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(modalData ? modalData.role : "");

  const openRejectModal = (task) => {
    setSelectedTask(task);
    setIsRejectTaskOpen(true);
  };

  const handleTaskRejection = (taskId) => {
    setUserTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const openPasswordModal = useCallback((userData) => {
    setSelectedUser(userData);
    setIsPasswordModalOpen(true);
  }, []);

  const uncheckedTasks = userTasks.filter((task) => !task.checked);
  const checkedTasks = userTasks.filter((task) => task.checked);

  uncheckedTasks.sort((a, b) => a.tasktitle.localeCompare(b.tasktitle));
  const orderedTasks = [...uncheckedTasks, ...checkedTasks];


  const updateTaskInspection = async (taskId) => {
    try {
      const response = await fetch("/api/admin/completeTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId }),
      });
  
      if (response.ok) {
        const updatedTask = await response.json();
        console.log("Task inspection status updated successfully");
  
        setUserTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, checked: updatedTask.checked } : task
          )
        );
      } else {
        console.error("Failed to update task inspection status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating task inspection status:", error);
    }
  };

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
        console.error("Error fetching user tasks:", error);
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
        onUpdateUserRole(modalData.id, newRole);
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

  const currentYear = new Date().getFullYear();
  const formatDateHelsinki = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" });
  };

  return (
    <Modal
      size={"full"}
      placement={"center"}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        user={selectedUser}
      />
      <ModalContent>
        <ModalHeader>Profiili</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <p>Lataa...</p>
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
                            <div>
                              {vehicle.vehicle} -{" "}
                              {vehicle.inspected ? (
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
                              Käyttäjän lähettämä kuva,{" "}
                              {formatDateHelsinki(vehicle.createdAt)}:
                            </p>
                            <Zoom key={index}>
                              <Image
                                alt="InspectedTrue"
                                width={300}
                                src={vehicle.inspectedImage}
                                className="my-3"
                              />
                            </Zoom>
                            <Button
                              variant="flat"
                              color="danger"
                              className="w-full"
                              onClick={() =>
                                updateTaskInspection(vehicle.id, false)
                              }
                            >
                              Hylkää katsastus
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="flat"
                            color="success"
                            className="w-full"
                            onClick={() =>
                              updateTaskInspection(vehicle.id, true)
                            }
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
              <div className="text-center text-xl mt-5">
                Suoritetut suoritukset
                {Array.isArray(userTasks) && userTasks.length > 0 ? (
                  <Accordion className="mx-auto max-w-lg">
                    {orderedTasks.map((task, index) => (
                      <AccordionItem
                        key={index}
                        title={
                          <div className="flex items-center text-sm">
                            <MdOutlineTask size={18} className="mr-3" />
                            <div>
                              {task.tasktitle} -{" "}
                              {task.checked ? (
                                <span className="text-green-500">
                                  Tarkistettu
                                </span>
                              ) : (
                                <span className="text-yellow-500">
                                  Tarkistamatta
                                </span>
                              )}
                            </div>
                          </div>
                        }
                      >
                        <div className="flex justify-center items-center flex-col">
                          {task.textInput && (
                            <>
                              <p className="text-sm">
                                Käyttäjän lähettämä teksti:
                              </p>
                              <p className="text-sm mb-3">{task.textInput}</p>
                            </>
                          )}
                          {task.imageFile && (
                            <div>
                              <p className="text-sm">
                                Käyttäjän lähettämä kuva:
                              </p>
                              <Zoom key={index}>
                                <Image
                                  alt="TaskImage"
                                  width={300}
                                  src={task.imageFile}
                                  className="my-3"
                                />
                              </Zoom>
                            </div>
                          )}
                          {task.checked ? (
                            <Button
                              variant="flat"
                              color="danger"
                              className="w-full"
                              onClick={() => openRejectModal(task)}
                            >
                              Hylkää suoritus
                            </Button>
                          ) : (
                            <div className="flex flex-col w-full space-y-2">
                              <Button
                                variant="flat"
                                color="success"
                                onClick={() =>
                                  updateTaskInspection(task.id, true)
                                }
                              >
                                Merkitse tarkistetuksi
                              </Button>
                              <Button
                                variant="flat"
                                color="danger"
                                onClick={() => openRejectModal(task)}
                              >
                                Hylkää suoritus
                              </Button>
                            </div>
                          )}
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p>Käyttäjä ei ole suorittanut yhtäkään suoritusta</p>
                )}
              </div>
            </>
          )}
          <div className="text-center mt-20 flex justify-center">
            <div className="flex flex-wrap justify-center space-x-3">
              <Dropdown placement="bottom-left">
                <DropdownTrigger>
                  <Button
                   color="success"
                   variant="flat"
                  >
                    <MdOutlineAdminPanelSettings size={20} />
                    Muuta rooli
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                  <DropdownSection title="Valitse käyttäjän rooli">
                    {["ylläpitäjä", "kilpailija", "valvoja"].map((role) => (
                      <DropdownItem
                        key={role}
                        color={roleColorMap[role]}
                        startContent={<MdOutlineAdminPanelSettings size={18} />}
                        onClick={() => updateUserRole(role)}
                      >
                        {role}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
              <Button
                color="danger"
                variant="flat"
                className="flex items-center mx-auto"
                onClick={blockUser}
              >
                <MdBlock size={20} />
                Poista kisasta
              </Button>
              <Button
                color="warning"
                variant="flat"
                className="flex items-center mx-auto"
                onClick={() => openPasswordModal(modalData)}
              >
                <MdLockOutline size={20} />
                Vaihda salasana
              </Button>
              <Button
                color="secondary"
                variant="flat"
                className="flex items-center mx-auto"
                onClick={() => openPasswordModal(modalData)}
              >
                <FaRegStar size={20} />
                Muuta pisteitä
              </Button>
              <Button
                variant="flat"
                color="primary"
                className="flex items-center mx-auto"
                onClick={() => openPasswordModal(modalData)}
              >
                <FaRegFileAlt size={20} />
                Lataa PDF
              </Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Sulje
          </Button>
        </ModalFooter>
      </ModalContent>
      {isRejectTaskOpen && (
        <AdminRejectTask
          isOpen={isRejectTaskOpen}
          onClose={() => setIsRejectTaskOpen(false)}
          modalData={selectedTask}
          onTaskRejected={handleTaskRejection}
        />
      )}
    </Modal>
  );
};

export default ModalComponent;
